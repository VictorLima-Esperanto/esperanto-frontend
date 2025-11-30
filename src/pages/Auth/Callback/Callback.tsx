import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/Auth/useUserStore';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  id: number;
  name: string;
  email: string;
  role: string;
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
          id: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        },
        token,
      );

      navigate('/student/home');
    };

    handleCallback();
  }, [navigate, setUser]);

  return <div>Carregando...</div>;
}
