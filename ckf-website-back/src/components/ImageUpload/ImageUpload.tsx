import { useRef } from "react";
import "../../assets/css/input.css";

type ImageUploadProps = {
  label: string;
  value?: string;
  error?: string;
  hint?: string;
  emptyText?: string;
  onChange: (value: string) => void;
};

function ImageUpload({
  label,
  value,
  error,
  hint,
  emptyText,
  onChange,
}: ImageUploadProps) {
  const inputId = label.replace(/\s+/g, "-").toLowerCase();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={`ckf-input ${error ? "ckf-input--has-error" : ""}`}>
      <label className="ckf-input__label" htmlFor={inputId}>
        {label}
      </label>

      {hint ? <p className="ckf-input__hint">{hint}</p> : null}

      {value ? (
        <div className="ckf-input__preview-row">
          <img src={value} alt={label} className="ckf-input__preview" />
          <button
            type="button"
            className="ckf-input__remove"
            onClick={clearImage}
          >
            <i className="bi bi-trash"></i>
            Delete
          </button>
        </div>
      ) : emptyText ? (
        <p className="ckf-input__empty">{emptyText}</p>
      ) : null}

      <div className="ckf-input__wrap">
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          accept="image/*"
          className={`ckf-input__field ckf-input__field--file ${
            error ? "ckf-input__field--error" : ""
          }`}
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>

      {error && (
        <p className="ckf-input__error" role="alert">
          <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default ImageUpload;
