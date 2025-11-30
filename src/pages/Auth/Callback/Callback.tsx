import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/Auth/useUserStore';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  name: string;
  email: string;
  role?: string;
}

export default function Callback() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  useEffect(() => {
    const handleCallback = () => {
      const existingToken = localStorage.getItem('token');
      if (existingToken) {
        navigate('/student/home');
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) return navigate('/');

      localStorage.setItem('token', token);

      const payload: TokenPayload = jwtDecode(token);

      setUser(
        {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          role: 'student', // você pode pegar do token se tiver
        },
        token,
      );

      navigate('/student/home');
    };

    handleCallback();
  }, [navigate, setUser]);

  return <div>Carregando...</div>;
}
