import express from "express";
import multer from "multer";
import * as documentsController from "./document_folder.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    
    // ✅ إصلاح مشكلة اللغة العربية في أسماء الملفات
    // تحويل اسم الملف من ترميز latin1 إلى utf8 عشان يقرأ العربي صح
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    
    cb(null, uniqueSuffix + '-' + originalName);
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.array('document_file', 10), documentsController.handleUploadDocument);
router.get("/case/:caseId", documentsController.handleGetCaseDocuments);
router.put("/:id", upload.single('document_file'), documentsController.handleUpdateDocument);
router.delete("/:id", documentsController.handleDeleteDocument);

export default router;