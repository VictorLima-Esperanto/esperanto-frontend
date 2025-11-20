import { Layout, Select, Avatar, Row, Col, Typography } from "antd";
import Sidebar from "@/components/Navigation/Sidebar/Sidebar.tsx";
import "./MainLayout.css";

const { Content } = Layout;
const { Title, Text } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const courses = [
    {
      id: "spanish",
      name: "Espanhol",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
    },
  ];

  const handleChangeCourse = (value: string) => {
    console.log("Curso selecionado:", value);
  };

  return (
    <Layout>
      <Sidebar />
      <Layout style={{ marginLeft: 250 }}>
        {" "}
        {/* 250 = largura da sidebar */}
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "16px 24px",
            borderBottom: "1px solid #f0f0f0",
            background: "#fff",
          }}
        >
          <div className="sidebar-header">
            <Title level={4} style={{ color: "#000000", margin: 0 }}>
              Esperanto Idiomas
            </Title>
          </div>
          <Select
            defaultValue={courses[0].id}
            style={{ width: 200 }}
            onChange={handleChangeCourse}
            options={courses.map((course) => ({
              label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    size={20}
                    src={course.flagUrl}
                    style={{ marginRight: 8 }}
                  />
                  {course.name}
                </div>
              ),
              value: course.id,
            }))}
          />
        </div>
        <Content style={{ padding: "24px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
