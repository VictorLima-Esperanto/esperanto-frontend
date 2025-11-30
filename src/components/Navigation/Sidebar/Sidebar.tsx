import { Menu, Layout, Typography, Avatar, Dropdown, Space } from 'antd';
import {
  HomeOutlined,
  VideoCameraOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined,
  AppstoreAddOutlined,
  FileTextOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/Auth/AuthContext';
import './Sidebar.css';
import type { SidebarProps } from '@/types/components/SidebarTypes';

const { Sider } = Layout;
const { Text } = Typography;
const { SubMenu } = Menu;

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate('/profile')}>
        Perfil
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate('/settings')}>
        Configurações
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={250}
      collapsedWidth={80}
    >
      <div className="sidebar-user">
        <Dropdown overlay={profileMenu} trigger={['click']}>
          <Space>
            <Avatar
              style={{ backgroundColor: '#1677ff' }}
              icon={<UserOutlined />}
            />
            {!collapsed && <Text style={{ color: '#fff' }}>{user?.name}</Text>}
            {!collapsed && <DownOutlined style={{ color: '#fff' }} />}
          </Space>
        </Dropdown>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/student/home']}
        onClick={({ key }) => handleMenuClick(key)}
      >
        {(user?.role === 'Admin' || user?.role === 'Student') && (
          <SubMenu key="aluno" icon={<HomeOutlined />} title="Portal Aluno">
            <Menu.Item key="/student/home">Home</Menu.Item>
            <Menu.Item key="/courses">Meus Cursos</Menu.Item>
            <Menu.Item key="/modules">Módulos</Menu.Item>
          </SubMenu>
        )}

        {(user?.role === 'Admin' || user?.role === 'Teacher') && (
          <SubMenu
            key="professor"
            icon={<VideoCameraOutlined />}
            title="Portal Professor"
          >
            <Menu.Item key="/teacher/home">Home</Menu.Item>
            <Menu.Item key="/teacher/courses">Cursos</Menu.Item>
            <Menu.Item key="/teacher/modules">Módulos</Menu.Item>
          </SubMenu>
        )}

        {user?.role === 'Admin' && (
          <SubMenu key="admin" icon={<SettingOutlined />} title="Admin">
            <Menu.Item key="/admin/courses" icon={<AppstoreAddOutlined />}>
              Criar Cursos
            </Menu.Item>
            <Menu.Item key="/admin/plans" icon={<FileTextOutlined />}>
              Criar Planos
            </Menu.Item>
            <Menu.Item key="/admin/reports" icon={<FileTextOutlined />}>
              Relatórios
            </Menu.Item>
            <Menu.Item key="/admin/users" icon={<TeamOutlined />}>
              Gestão de Usuários
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </Sider>
  );
}
