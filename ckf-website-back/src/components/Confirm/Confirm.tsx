import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import "../../assets/css/confirm.css";

type ConfirmProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

function Confirm({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  danger = false,
  onConfirm,
  onClose,
}: ConfirmProps) {
  return (
    <Modal open={open} title={title} className="ckf-modal--sm" onClose={onClose}>
      <div className="ckf-confirm">
        <span className={`ckf-confirm__icon ${danger ? "ckf-confirm__icon--danger" : ""}`}>
          <i className={`bi ${danger ? "bi-exclamation-triangle-fill" : "bi-question-circle-fill"}`}></i>
        </span>
        <h2 className="ckf-form__title">{title}</h2>
        <p className="ckf-form__subtitle">{message}</p>
        <div className="ckf-form__actions">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={danger ? "danger" : "primary"}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default Confirm;
