import React from 'react';

export const Filter = ({ filter, handleInputChange }) => {
  return <input type="text" value={filter} onChange={handleInputChange} />;
};
