import type { TextareaHTMLAttributes } from "react";
import "../../assets/css/input.css";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

function Textarea({ label, error, id, rows = 4, ...rest }: TextareaProps) {
  const textareaId = id || rest.name;

  return (
    <div className={`ckf-input ${error ? "ckf-input--has-error" : ""}`}>
      <label className="ckf-input__label" htmlFor={textareaId}>
        {label}
      </label>

      <div className="ckf-input__wrap">
        <textarea
          id={textareaId}
          rows={rows}
          className={`ckf-input__field ckf-input__field--area ${
            error ? "ckf-input__field--error" : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          {...rest}
        />
      </div>

      {error && (
        <p id={`${textareaId}-error`} className="ckf-input__error" role="alert">
          <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default Textarea;
