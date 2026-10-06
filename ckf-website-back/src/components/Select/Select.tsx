import type { SelectHTMLAttributes, ReactNode } from "react";
import "../../assets/css/input.css";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  children: ReactNode;
};

function Select({ label, error, id, children, ...rest }: SelectProps) {
  const selectId = id || rest.name;

  return (
    <div className={`ckf-input ${error ? "ckf-input--has-error" : ""}`}>
      <label className="ckf-input__label" htmlFor={selectId}>
        {label}
      </label>

      <div className="ckf-input__wrap">
        <select
          id={selectId}
          className={`ckf-input__field ckf-input__field--select ${
            error ? "ckf-input__field--error" : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          {...rest}
        >
          {children}
        </select>
      </div>

      {error && (
        <p id={`${selectId}-error`} className="ckf-input__error" role="alert">
          <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default Select;
