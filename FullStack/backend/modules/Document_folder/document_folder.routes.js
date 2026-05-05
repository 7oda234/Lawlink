import express from "express";
import multer from "multer";
import * as documentsController from "./document_folder.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.array('document_file', 10), documentsController.handleUploadDocument);
router.get("/case/:caseId", documentsController.handleGetCaseDocuments);
router.put("/:id", upload.single('document_file'), documentsController.handleUpdateDocument);
router.delete("/:id", documentsController.handleDeleteDocument);

export default router;