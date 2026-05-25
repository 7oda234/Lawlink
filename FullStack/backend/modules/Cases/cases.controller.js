import * as casesService from "./cases.service.js";
import * as documentService from "../Document_folder/document_folder.service.js"; 
import { createNotification } from "../Notification/notification.controller.js"; 

// ➕ دالة إنشاء القضية الجديدة
export const handleCreateCase = async (req, res) => {
  try {
    // --- 🔍 أسطر تتبع (Logs) لمعرفة ما يصل للسيرفر بالضبط ---
    console.log("=== 🚀 بداية طلب إنشاء قضية جديدة ===");
    console.log("📦 البيانات النصية (req.body):", req.body);
    console.log("📁 الملفات المرفوعة (req.files):", req.files ? req.files.length + " ملفات" : "لا يوجد ملفات");

    // استخراج البيانات النصية من الـ req.body
    const { title, category, description, client_id, status } = req.body;

    // 🚨 صمام أمان (Validation): التحقق من أن البيانات الأساسية ليست فارغة
    // تمت إضافة فحص 'null' كـ string احتياطياً لمنع تسجيل صفوف فارغة
    if (!title || !client_id || client_id === 'undefined' || client_id === 'null') {
      console.log("❌ فشل التحقق: البيانات الأساسية مفقودة أو client_id غير صالح.");
      return res.status(400).json({ 
        ok: false, 
        message: "فشل الحفظ: لم تصل بيانات القضية أو معرف المستخدم بشكل سليم إلى السيرفر.",
        receivedData: req.body // نرسل ما وصل للسيرفر للفرونت إند لمساعدتك في اكتشاف الخطأ
      });
    }

    console.log("✅ التحقق نجح. جاري إدخال القضية في قاعدة البيانات...");

    // 1. إنشاء القضية الأساسية في جدول cases
    const result = await casesService.createCase({
      title,
      category,
      description,
      client_id: parseInt(client_id), // تحويل الـ ID إلى رقم
      status: status || 'Pending'
    });
    
    console.log("✅ تم حفظ القضية في الداتا بيز بنجاح! النتيجة:", result);

    // استخراج الـ ID الجديد الذي تم إنشاؤه في الداتا بيز
    const newCaseId = result.caseId; 
    console.log("🆔 رقم القضية الجديد (caseId):", newCaseId);

    // 2. معالجة المستندات المرفوعة (إن وجدت)
    if (req.files && req.files.length > 0) {
      console.log(`📂 جاري حفظ مسارات عدد ${req.files.length} ملفات...`);
      for (const file of req.files) {
        const filePath = `/uploads/${file.filename}`; 
        console.log(`📝 حفظ الملف: ${filePath}`);
        // تسجيل مسار كل ملف في جدول المستندات وربطه برقم القضية والعميل
        await documentService.addDocument(filePath, parseInt(client_id), newCaseId); 
      }
      console.log("✅ تم حفظ جميع المستندات بنجاح.");
    }

    // 3. إرسال إشعار للعميل يؤكد نجاح العملية
    console.log("🔔 جاري إرسال إشعار للعميل...");
    await createNotification(parseInt(client_id), "تم إنشاء قضيتك ورفع الملفات بنجاح 📁");
    console.log("✅ تم إرسال الإشعار بنجاح.");

    console.log("🎉 اكتملت العملية بالكامل! جاري الرد على الفرونت إند.");
    // الرد على الفرونت إند بالنجاح (Status 201 تعني أنه تم الإنشاء)
    res.status(201).json({ 
        ok: true, 
        caseId: newCaseId, 
        message: "تم إنشاء القضية ورفع الملفات بنجاح 📁" 
    });
  } catch (err) {
    // طباعة الخطأ في الكونسول بكامل تفاصيله (مسار الخطأ ونوعه)
    console.error("🔥 Error creating case (حدث خطأ أثناء الإنشاء):", err);
    // إرجاع خطأ 500 (مشكلة في السيرفر) للفرونت إند مع دمج تفاصيل الخطأ في الرد
    res.status(500).json({ ok: false, message: err.message, errorDetails: err.stack });
  }
};

// 📖 دالة جلب كل القضايا
export const handleGetCases = async (req, res) => {
  try {
    const cases = await casesService.getCases();
    res.status(200).json({ ok: true, cases });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 📩 دالة إرسال عرض من العميل للمحامي
export const handleSendOffer = async (req, res) => {
  try {
    const { caseId, lawyerId } = req.body;
    const result = await casesService.sendOffer(caseId, lawyerId);
    // إشعار المحامي
    if (lawyerId) {
        await createNotification(lawyerId, "لديك طلب قضية جديد في انتظار المراجعة 📩");
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👨‍⚖️ دالة معالجة رد المحامي على القضية
export const handleLawyerResponse = async (req, res) => {
  try {
    const { caseId, lawyerId, response, upfrontFee, successPercentage } = req.body;
    const result = await casesService.lawyerRespondToOffer(caseId, lawyerId, response, upfrontFee, successPercentage);
    
    // إشعار العميل بناءً على رد المحامي (قبول أو رفض)
    try {
        const caseDetails = await casesService.getCaseById(caseId);
        if (caseDetails && caseDetails.client_id) {
            if (response.toLowerCase() === 'accept') {
                await createNotification(caseDetails.client_id, "وافق المحامي على قضيتك وأرسل لك عرض الأتعاب لمراجعته ⚖️");
            } else {
                await createNotification(caseDetails.client_id, "نعتذر، المحامي رفض استلام القضية في الوقت الحالي ❌");
            }
        }
    } catch (notifErr) { console.error("Notification Error:", notifErr); }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 👤 دالة معالجة رد العميل على تسعير المحامي
export const handleClientResponse = async (req, res) => {
  try {
    const { caseId, response } = req.body;
    const result = await casesService.clientRespondToFees(caseId, response);
    
    // إشعار المحامي بقرار العميل
    try {
        const caseDetails = await casesService.getCaseById(caseId);
        if (caseDetails && caseDetails.lawyer_id) {
            if (response.toLowerCase() === 'accept') {
                await createNotification(caseDetails.lawyer_id, "وافق العميل على عرض الأتعاب الخاص بك، القضية في انتظار إتمام الدفع ⏳");
            } else {
                await createNotification(caseDetails.lawyer_id, "رفض العميل عرض الأتعاب الخاص بك وتمت إعادة القضية للبحث 🔄");
            }
        }
    } catch (notifErr) { console.error("Notification Error:", notifErr); }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🗑️ دالة مسح القضية
export const handleDeleteCase = async (req, res) => {
  try {
    const { id } = req.params; 
    const result = await casesService.deleteCase(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🔍 دالة جلب تفاصيل قضية برقمها
export const handleGetCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const caseData = await casesService.getCaseById(id);
    if (!caseData) {
      return res.status(404).json({ ok: false, message: 'القضية غير موجودة.' });
    }
    res.status(200).json({ ok: true, data: caseData });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 🔄 دالة تحديث بيانات القضية
export const handleUpdateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await casesService.updateCase(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

// 💳 دالة تأكيد الدفع وتحويل القضية إلى "جارية"
export const handlePaymentConfirmation = async (req, res) => {
  try {
    const { caseId } = req.body;
    const result = await casesService.confirmPayment(caseId);
    
    // إشعار المحامي بأن الدفع تم
    try {
        const caseDetails = await casesService.getCaseById(caseId);
        if (caseDetails && caseDetails.lawyer_id) {
            await createNotification(caseDetails.lawyer_id, `تم تأكيد الدفع من قبل العميل لقضية رقم #${caseId}. يمكنك البدء في العمل الآن 💳`);
        }
    } catch (notifErr) { console.error("Notification Error:", notifErr); }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};