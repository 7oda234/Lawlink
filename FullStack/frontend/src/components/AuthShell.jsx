import React from 'react';
import PageControls from './PageControls';

const AuthShell = ({ children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <PageControls />
    {children}
  </div>
);

export default AuthShell;
