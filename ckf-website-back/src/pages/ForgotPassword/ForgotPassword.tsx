import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { forgotPassword } from "../../services/authService";
import { getApiMessage, getApiFieldError } from "../../utils/apiError";
import type { ForgotPasswordRequest } from "../../types/auth";
import "../../assets/css/login.css";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  // Field error comes from API only
  const [apiErrors, setApiErrors] = useState<{ email?: string }>({});

  const { register, handleSubmit } = useForm<ForgotPasswordRequest>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordRequest) => {
    try {
      setLoading(true);
      setApiErrors({});

      // Call backend forgot-password API
      const result = await forgotPassword(data);

      // Success message from API
      toast.success(result.message);
    } catch (error) {
      // Error message + field error from API
      toast.error(getApiMessage(error));
      setApiErrors({
        email: getApiFieldError(error, "email"),
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
            title="Forgot password"
            subtitle="Enter your email to reset password"
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

            <Button type="submit" loading={loading} fullWidth>
              Send reset link
            </Button>

            <Link to="/login" className="login-back">
              Back to login
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
