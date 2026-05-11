# TODO

## Payment / Installments / Invoices Integration

- [x] Create TODO tracker file (initial setup)
- [ ] Create missing backend Installment module files (controller/service/routes) and implement endpoints:
  - [ ] `GET /api/installments/case/:caseId`
  - [ ] `POST /api/installments/:id/pay`
- [ ] Create missing backend Invoice module files (controller/service/routes) or integrate invoice download in Payment module.
- [ ] Extend backend Payment module to add endpoints expected by frontend:
  - [ ] `GET /api/payments/history`
  - [ ] `GET /api/payments/invoice/:paymentId` return real PDF/binary or adjust frontend contract
- [ ] Fix frontend DataService finance endpoints contract:
  - [ ] `downloadInvoice` must use `responseType: 'arraybuffer'` if backend returns PDF binary
- [ ] Wire installment/invoice routes in `backend/controllers/app.controller.js` (mount `/api/installments` and `/api/invoices` if used)
- [ ] Ensure invoice status is updated after payments/installments.
- [ ] Basic manual test steps after implementation.


