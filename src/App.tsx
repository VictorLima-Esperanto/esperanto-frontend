import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login/Login";
import { AuthProvider } from "@/contexts/Auth/AuthContext";
import HomeStudent from "./pages/Home/Home";
import Callback from "./pages/Auth/Callback/Callback";
import MainLayout from "./Layouts/MainLayout/MainLayout";

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
              <MainLayout>
                <Routes>
                  <Route path="home" element={<HomeStudent />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
