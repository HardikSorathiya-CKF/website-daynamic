import type { ButtonHTMLAttributes, ReactNode } from "react";
import "../../assets/css/button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "ghost" | "danger";
};

function Button({
  children,
  loading = false,
  fullWidth = false,
  variant = "primary",
  disabled,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`ckf-btn ckf-btn--${variant} ${fullWidth ? "ckf-btn--full" : ""} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {/* Show loading text while API is running */}
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;
