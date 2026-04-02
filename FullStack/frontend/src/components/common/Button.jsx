import React from 'react';

const Button = ({ children, type = 'button', className = '', onClick }) => (
  <button
    type={type}
    onClick={onClick}
    className={`rounded-lg px-4 py-2 font-semibold transition ${className}`}
  >
    {children}
  </button>
);

export default Button;
