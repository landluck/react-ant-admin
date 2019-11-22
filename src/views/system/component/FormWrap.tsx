import React, { memo } from 'react';

interface FormWrapProps {
  children: React.ReactNode;
  className?: string;
}

function FormWrap({ children, className }: FormWrapProps) {
  return (
    <div
      className={className}
      style={{
        width: '300px',
        margin: '80px auto 0',
      }}
    >
      {children}
    </div>
  );
}

export default memo(FormWrap);
