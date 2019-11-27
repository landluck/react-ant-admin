import React, { memo } from 'react';

function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
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
