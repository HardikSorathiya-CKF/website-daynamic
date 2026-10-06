import type { FormHTMLAttributes, ReactNode } from "react";
import "../../assets/css/form.css";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

function Form({ children, title, subtitle, className = "", ...rest }: FormProps) {
  return (
    <form className={`ckf-form ${className}`} {...rest}>
      {title && <h1 className="ckf-form__title">{title}</h1>}
      {subtitle && <p className="ckf-form__subtitle">{subtitle}</p>}

      {children}
    </form>
  );
}

export default Form;
