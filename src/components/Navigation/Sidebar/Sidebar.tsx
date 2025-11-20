import { Menu, Layout, Typography, Avatar, Dropdown, Space } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  VideoCameraOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/Auth/AuthContext";
import "./Sidebar.css";

const { Sider } = Layout;
const { Title, Text } = Typography;

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        Perfil
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate("/settings")}>
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
      className="sidebar"
    >
      <div className="sidebar-user">
        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <Space>
            <Avatar
              style={{ backgroundColor: "#1677ff" }}
              icon={<UserOutlined />}
            />
            {!collapsed && <Text style={{ color: "#fff" }}>{user?.name}</Text>}
            {!collapsed && <DownOutlined style={{ color: "#fff" }} />}
          </Space>
        </Dropdown>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/home"]}
        onClick={({ key }) => handleMenuClick(key)}
      >
        <Menu.Item key="/home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="/courses" icon={<BookOutlined />}>
          Meus Cursos
        </Menu.Item>
        <Menu.Item key="/modules" icon={<VideoCameraOutlined />}>
          Módulos
        </Menu.Item>
        <Menu.Item key="/settings" icon={<SettingOutlined />}>
          Configurações
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
