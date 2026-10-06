import type { InputHTMLAttributes } from "react";
import "../../assets/css/input.css";

// Props = normal input props + label + error message
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

function Input({ label, error, id, ...rest }: InputProps) {
  // Use id or name so label click focuses the input
  const inputId = id || rest.name;

  return (
    <div className={`ckf-input ${error ? "ckf-input--has-error" : ""}`}>
      <label className="ckf-input__label" htmlFor={inputId}>
        {label}
      </label>

      <div className="ckf-input__wrap">
        <input
          id={inputId}
          className={`ckf-input__field ${error ? "ckf-input__field--error" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
      </div>

      {/* Error message shows right under the input */}
      {error && (
        <p id={`${inputId}-error`} className="ckf-input__error" role="alert">
          <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default Input;
