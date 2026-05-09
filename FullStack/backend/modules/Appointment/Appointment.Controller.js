import * as appService from "./appointment.service.js";
//import * as notificationService from "../Notification/notification.service.js"; 

// 🛠️ دالة مساعدة لتظبيط صيغة التاريخ عشان تقبلها الـ MySQL
const formatDateTime = (dateString) => {
  if (!dateString) return null;
  let formatted = dateString.replace("T", " ");
  if (formatted.length === 16) {
    formatted += ":00"; // إضافة الثواني لو مش مبعوتة
  }
  return formatted;
};

// حجز ميعاد مع التحقق من التبعية للقضية
export const bookAppointment = async (req, res) => {
  try {
    const { appointmentDate, clientId, lawyerId, caseId } = req.body;

    if (!appointmentDate || !clientId || !lawyerId || !caseId) {
      return res.status(400).json({ ok: false, message: "جميع البيانات مطلوبة" });
    }

    const finalDate = formatDateTime(appointmentDate);
    const isAssigned = await appService.verifyLawyerCaseLink(caseId, lawyerId);

    if (!isAssigned) {
      return res.status(403).json({ 
        ok: false, 
        message: "عذراً، لا يمكنك حجز ميعاد إلا مع المحامي/العميل المرتبط بقضيتك فقط ⛔" 
      });
    }

    const appointmentId = await appService.createAppointment(finalDate, clientId, lawyerId, caseId);
    
    // 🔔 الإشعارات جوه Try/Catch عشان لو فشلت متوقعش الحجز كله
    // try {
    //   const msg = `تم حجز موعد جديد يوم ${finalDate} 📅`;
    //   await notificationService.createNotification(lawyerId, msg);
    //   await notificationService.createNotification(clientId, msg);
    // } catch (notifErr) {
    //   console.error("⚠️ Notification Error (Booking):", notifErr.message);
    // }

    res.status(201).json({ ok: true, message: "تم حجز الميعاد بنجاح ✅", appointmentId });
  } catch (err) { 
      console.error("❌ Booking Error:", err);
      res.status(500).json({ ok: false, message: "حدث خطأ في الخادم: " + err.message }); 
  }
};

// عرض المواعيد
export const listAppointments = async (req, res) => {
  try {
    const { userId, role } = req.query; 
    
    if (!userId || !role) {
       return res.status(400).json({ ok: false, message: "userId and role are required" });
    }

    const appointments = await appService.getAppointmentsByUser(userId, role);
    res.status(200).json({ ok: true, data: appointments });
  } catch (err) { 
      console.error("❌ List Appointments Error:", err);
      res.status(500).json({ ok: false, message: err.message }); 
  }
};

// تحديث ميعاد
export const modifyAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { appointmentDate } = req.body;

    if (!appointmentDate) {
      return res.status(400).json({ ok: false, message: "appointmentDate is required" });
    }

    const finalDate = formatDateTime(appointmentDate);
    const status = "Rescheduled";
    const isSuccess = await appService.updateAppointment(appointmentId, finalDate, status);

    if (!isSuccess) return res.status(404).json({ ok: false, message: "الميعاد غير موجود" });

    // // 🔔 الإشعارات
    // const appointmentDetails = await appService.getAppointmentById(appointmentId);
    // if (appointmentDetails) {
    //     const { client_id, lawyer_id } = appointmentDetails;
    //     const msg = `تم تعديل موعد المقابلة إلى ${finalDate} 🔄`;
    //     try {
    //         await notificationService.createNotification(client_id, msg);
    //         await notificationService.createNotification(lawyer_id, msg);
    //     } catch(notifErr) {
    //         console.error("⚠️ Notification Error (Update):", notifErr.message);
    //     }
    // }

    res.status(200).json({ ok: true, message: "تم تحديث الميعاد بنجاح ✏️" });
  } catch (err) { 
      console.error("❌ Update Error:", err);
      res.status(500).json({ ok: false, message: err.message }); 
  }
};

// حذف ميعاد
export const removeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const isSuccess = await appService.deleteAppointment(appointmentId);
    if (!isSuccess) return res.status(404).json({ ok: false, message: "الميعاد غير موجود" });
    res.status(200).json({ ok: true, message: "تم حذف الميعاد بنجاح 🗑️" });
  } catch (err) { 
      console.error("❌ Delete Error:", err);
      res.status(500).json({ ok: false, message: err.message }); 
  }
};