# BlackboxAI TODO

## Admin pages data failures
- [x] Fix Installment API URL prefix mismatch between frontend and backend
  - [x] Update `frontend/src/services/DataService.js` installment endpoints to use `/api/installments/...` (or the correct backend mount)

- [x] Verify and fix admin API prefix mismatch (`/admin/...` vs `/api/admin/...`) across `DataService.js`

- [ ] Re-test Admin Dashboard: `/admin/full-dashboard`
- [ ] Re-test Admin Invoices: `/admin/financial-logs`
- [ ] Re-test Installments: list / create plan / pay installment
- [ ] Fix any remaining payload-shape mismatches causing “no data” in admin pages
- [ ] Run frontend lint/build and quick backend route smoke test (if needed)

