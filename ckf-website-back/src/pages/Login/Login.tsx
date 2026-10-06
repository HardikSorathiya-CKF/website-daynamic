import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { login } from "../../services/authService";
import { getApiMessage, getApiFieldError } from "../../utils/apiError";
import { saveToken, saveUser } from "../../utils/authStorage";
import type { LoginRequest } from "../../types/auth";
import "../../assets/css/login.css";

const REMEMBER_KEY = "ckf_remember_email";

type LoginFormValues = LoginRequest & {
  rememberMe: boolean;
};

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Field errors come from API only
  const [apiErrors, setApiErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const { register, handleSubmit, setValue } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Load saved email if Remember me was checked before
  useEffect(() => {
    const savedEmail = localStorage.getItem(REMEMBER_KEY);
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      setApiErrors({}); // clear old API errors

      // Call backend login API
      const result = await login({
        email: data.email,
        password: data.password,
      });

      saveToken(result.token);

      // API may send admin or user
      const adminData = result.admin || result.user;
      if (adminData) {
        saveUser(adminData);
      }

      if (data.rememberMe) {
        localStorage.setItem(REMEMBER_KEY, data.email);
      } else {
        localStorage.removeItem(REMEMBER_KEY);
      }

      // Success message from API
      toast.success(result.message || "Login successful");

      // Open dashboard after login success
      navigate("/dashboard");
    } catch (error) {
      // Error message + field errors from API
      toast.error(getApiMessage(error));
      setApiErrors({
        email: getApiFieldError(error, "email"),
        password: getApiFieldError(error, "password"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__mesh" aria-hidden="true" />
      <div className="login-page__orb login-page__orb--one" aria-hidden="true" />
      <div className="login-page__orb login-page__orb--two" aria-hidden="true" />
      <div className="login-page__orb login-page__orb--three" aria-hidden="true" />

      <div className="login-wrap">
        <div className="login-brand">
          <div className="login-brand__glow" aria-hidden="true" />
          <img
            className="login-logo"
            src="/logo.webp"
            alt="Cloud Kode Form Technologies"
          />
        </div>

        <div className="login-card">
          <Form
            className="login-form"
            title="Welcome back"
            subtitle="Sign in to your admin account"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Email"
              type="email"
              placeholder="admin@example.com"
              autoComplete="email"
              error={apiErrors.email}
              {...register("email")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              autoComplete="current-password"
              error={apiErrors.password}
              {...register("password")}
            />

            <div className="login-options">
              <Checkbox label="Remember me" {...register("rememberMe")} />

              <Link to="/forgot-password" className="login-forgot">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} fullWidth>
              Sign in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
