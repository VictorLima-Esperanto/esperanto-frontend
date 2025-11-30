import LanguageBadge from '@/components/LanguageBadge/LanguageBadge';
import { Layout } from 'antd';

const { Header } = Layout;

export default function Topbar() {
  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        padding: '0',
        height: 64,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 18 }}>Esperanto Idiomas</h2>

      <LanguageBadge />
    </Header>
  );
}
