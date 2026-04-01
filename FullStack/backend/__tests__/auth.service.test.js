import { normalizeEmail, sanitizeUser } from '../modules/auth/auth.service.js';

describe('auth.service helpers', () => {
  test('normalizeEmail should trim and lowercase', () => {
    expect(normalizeEmail('  ExAmPlE@TeSt.COM ')).toBe('example@test.com');
  });

  test('normalizeEmail should handle empty values', () => {
    expect(normalizeEmail(null)).toBe('');
    expect(normalizeEmail(undefined)).toBe('');
  });

  test('sanitizeUser should return null for invalid row', () => {
    expect(sanitizeUser(null)).toBeNull();
    expect(sanitizeUser(undefined)).toBeNull();
  });

  test('sanitizeUser should convert row to safe object', () => {
    const row = {
      id: 1,
      full_name: 'Ahmed',
      email: 'ahmed@test.com',
      phone: '0123456789',
      is_active: 1,
      created_at: '2026-04-01T12:00:00Z',
    };

    expect(sanitizeUser(row)).toEqual({
      id: 1,
      fullName: 'Ahmed',
      email: 'ahmed@test.com',
      phone: '0123456789',
      isActive: true,
      createdAt: '2026-04-01T12:00:00Z',
    });
  });
});
