import express from "express";
import * as installmentController from "./installment.controller.js";

const router = express.Router();

// Get all installments for a given case
router.get("/case/:caseId", installmentController.getInstallmentsByCase);

// Pay an installment by installment id
router.post("/:id/pay", installmentController.payInstallment);

export default router;

