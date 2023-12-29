import { BottomSvg1, BottomSvg2 } from '@/components/Svg';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="flex-1">{children}</div>
      <BottomSvg1 />
      <BottomSvg2 />
    </div>
  );
};

export default Layout;
