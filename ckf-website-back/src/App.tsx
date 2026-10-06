import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import Roles from "./pages/Roles/Roles";
import Pages from "./pages/Pages/Pages";
import PageForm from "./pages/Pages/PageForm";
import Services from "./pages/Services/Services";
import ServiceForm from "./pages/Services/ServiceForm";
import ServiceEditor from "./pages/Services/ServiceEditor";
import CaseStudies from "./pages/CaseStudies/CaseStudies";
import CaseStudyForm from "./pages/CaseStudies/CaseStudyForm";
import CaseStudyEditor from "./pages/CaseStudies/CaseStudyEditor";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function RedirectToPageEdit() {
  const { id } = useParams();
  return <Navigate to={`/pages/${id}/edit`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/pages/create" element={<PageForm />} />
          <Route path="/pages/:id/edit" element={<PageForm />} />
          <Route path="/pages/:id/editor" element={<RedirectToPageEdit />} />
          <Route path="/pages/:id/preview" element={<RedirectToPageEdit />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/create" element={<ServiceForm />} />
          <Route path="/services/:id/edit" element={<ServiceForm />} />
          <Route path="/services/:id/editor" element={<ServiceEditor />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/case-studies/create" element={<CaseStudyForm />} />
          <Route path="/case-studies/:id/edit" element={<CaseStudyForm />} />
          <Route path="/case-studies/:id/editor" element={<CaseStudyEditor />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        className="ckf-toast-container"
        toastClassName={(context) => {
          const type = context?.type || "default";
          return `Toastify__toast Toastify__toast--${type} ckf-toast ckf-toast--${type}`;
        }}
      />
    </BrowserRouter>
  );
}

export default App;
