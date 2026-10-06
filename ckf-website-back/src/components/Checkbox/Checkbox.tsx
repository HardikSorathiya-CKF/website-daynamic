import type { InputHTMLAttributes } from "react";
import "../../assets/css/checkbox.css";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function Checkbox({ label, id, ...rest }: CheckboxProps) {
  const checkboxId = id || rest.name;

  return (
    <label className="ckf-checkbox" htmlFor={checkboxId}>
      <input
        id={checkboxId}
        type="checkbox"
        className="ckf-checkbox__input"
        {...rest}
      />
      <span className="ckf-checkbox__box" aria-hidden="true">
        <i className="bi bi-check-lg"></i>
      </span>
      <span className="ckf-checkbox__label">{label}</span>
    </label>
  );
}

export default Checkbox;
