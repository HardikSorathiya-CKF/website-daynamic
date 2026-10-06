import type { ReactNode } from "react";
import "../../assets/css/modal.css";

type ModalProps = {
  open: boolean;
  title?: string;
  className?: string;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ open, title, className = "", onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className={`ckf-modal ${className}`} role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="ckf-modal__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="ckf-modal__panel">
        <button
          type="button"
          className="ckf-modal__close"
          aria-label="Close form"
          onClick={onClose}
        >
          <i className="bi bi-x-lg"></i>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
