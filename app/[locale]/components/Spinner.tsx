import React from 'react';

const LoaderSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
    <div className="spinner-border animate-spin w-8 h-8 border-4 rounded-full border-t-transparent border-[#00BFFF]"></div>
  </div>
  
  );
};

export default LoaderSpinner;
