import React, { memo } from 'react';

function PageWrap({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        padding: '20px',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}

export default memo(PageWrap);
