import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Auth/Login/Login';
import { AuthProvider } from '@/contexts/Auth/AuthContext';
import Callback from './pages/Auth/Callback/Callback';
import MainLayout from './Layouts/MainLayout/MainLayout';
import { PrivateRoute } from './routes/PrivateRoute';
import HomeStudent from './pages/Student/Home/HomeStudent';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="auth/callback" element={<Callback />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Routes>
                    <Route path="/student/home" element={<HomeStudent />} />
                  </Routes>
                </MainLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
