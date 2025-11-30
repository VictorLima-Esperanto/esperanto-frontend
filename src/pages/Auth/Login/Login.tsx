import { Button, Card, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined, GoogleOutlined } from '@ant-design/icons';
import './Login.css';
import { useAuth } from '@/contexts/Auth/AuthContext.ts';

const { Title, Text } = Typography;

export default function Login() {
  const { externalLogin, login, loading } = useAuth();

  const handleGoogleLogin = () => {
    externalLogin('Google');
  };

  const onFinish = async (values: any) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <div className="login-header">
          <Title level={2} style={{ color: '#1677ff', marginBottom: 0 }}>
            Esperanto Idiomas
          </Title>
          <Text type="secondary">Acesse sua conta para continuar</Text>
        </div>

        {/* Formulário de login interno */}
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: 'Por favor, insira seu e-mail' },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="seuemail@exemplo.com"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[{ required: true, message: 'Por favor, insira sua senha' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="••••••••"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              style={{ background: '#1677ff' }}
              loading={loading}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>

        {/* Login externo via Google */}
        <Button
          type="default"
          icon={<GoogleOutlined />}
          size="large"
          block
          style={{ marginTop: 10 }}
          onClick={handleGoogleLogin}
          loading={loading}
        >
          Entrar com Google
        </Button>

        <div className="login-footer" style={{ marginTop: 10 }}>
          <Text type="secondary">Esqueceu sua senha?</Text>
          <a href="#"> Redefinir</a>
        </div>
      </Card>
    </div>
  );
}
