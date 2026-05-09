# TODO - Appointment integration fix

- [x] Update backend `modifyAppointment` to validate/normalize update payload (force status to `Rescheduled` and require `appointmentDate`).

- [ ] (Optional) Add backend guard to ensure user can only update their own appointment (if auth/userId exists); otherwise skip to avoid breaking current setup.
- [ ] Update frontend client & lawyer pages to only send `appointmentDate` when editing (remove `status` field).
- [ ] Verify UI create flow works for both client and lawyer pages.
- [ ] Verify edit flow updates appointment datetime correctly and refreshes list.
- [ ] Run frontend lint/build or quick smoke test.

