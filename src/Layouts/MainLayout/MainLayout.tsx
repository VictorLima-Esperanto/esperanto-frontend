// src/layouts/MainLayout.tsx
import { Layout } from 'antd';
import { useState } from 'react';
import Sidebar from '@/components/Navigation/Sidebar/Sidebar';
import './MainLayout.css';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="main-layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout
        className="main-content"
        style={{
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Content className="content-area">{children}</Content>
      </Layout>
    </Layout>
  );
}
