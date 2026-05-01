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
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// 1️⃣ رفع مستند جديد
router.post("/", upload.single('document_file'), documentsController.handleUploadDocument);

// 2️⃣ جلب ملفات قضية محددة
router.get("/case/:caseId", documentsController.handleGetCaseDocuments);

// 3️⃣ تعديل مستند 
router.put("/:id", upload.single('document_file'), documentsController.handleUpdateDocument);

// 4️⃣ مسح مستند
router.delete("/:id", documentsController.handleDeleteDocument);

export default router;