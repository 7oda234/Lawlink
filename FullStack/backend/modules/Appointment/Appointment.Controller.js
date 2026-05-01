import * as appService from "./appointment.service.js";

// حجز ميعاد مع التحقق من التبعية للقضية
export const bookAppointment = async (req, res) => {
  try {
    const { appointmentDate, clientId, lawyerId, caseId } = req.body;
    const isAssigned = await appService.verifyLawyerCaseLink(caseId, lawyerId);

    if (!isAssigned) {
      return res.status(403).json({ 
        ok: false, 
        message: "عذراً، لا يمكنك حجز ميعاد إلا مع المحامي المسؤول عن قضيتك فقط ⛔" 
      });
    }

    const appointmentId = await appService.createAppointment(appointmentDate, clientId, lawyerId, caseId);
    res.status(201).json({ ok: true, message: "تم حجز الميعاد بنجاح ✅", appointmentId });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

// عرض المواعيد[cite: 1]
export const listAppointments = async (req, res) => {
  try {
    const { userId, role } = req.query; 
    const appointments = await appService.getAppointmentsByUser(userId, role);
    res.status(200).json({ ok: true, data: appointments });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

// تحديث ميعاد[cite: 1]
export const modifyAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { appointmentDate, status } = req.body;
    const isSuccess = await appService.updateAppointment(appointmentId, appointmentDate, status);
    if (!isSuccess) return res.status(404).json({ ok: false, message: "الميعاد غير موجود" });
    res.status(200).json({ ok: true, message: "تم تحديث الميعاد بنجاح ✏️" });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};

// حذف ميعاد[cite: 1]
export const removeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const isSuccess = await appService.deleteAppointment(appointmentId);
    if (!isSuccess) return res.status(404).json({ ok: false, message: "الميعاد غير موجود" });
    res.status(200).json({ ok: true, message: "تم حذف الميعاد بنجاح 🗑️" });
  } catch (err) { res.status(500).json({ ok: false, message: err.message }); }
};