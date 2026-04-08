// ═══════════════════════════════════════════════════════════════════════════════════
// 🧪 إعداد Jest - Jest Configuration File
// ═══════════════════════════════════════════════════════════════════════════════════
// ده ملف إعدادات Jest لاختبار مكونات React داخل بيئة jsdom
// This is the Jest setup file for running React tests in a jsdom environment
// ───────────────────────────────────────────────────────────────────────────────────
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // Ensure Jest looks inside your new src structure
  roots: ['<rootDir>/src'], 
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  // Updated to specifically find tests within the src directory
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx}'
  ],
  // Ignore these paths for coverage reports
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/public/',
    '/.vscode/',
    '/coverage/'
  ],
  // Standard module name mapping for CSS/Assets if needed later
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};
