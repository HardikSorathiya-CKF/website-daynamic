import Checkbox from "../Checkbox/Checkbox";
import type { PermissionGroup } from "../../types/role";
import "../../assets/css/permission-select.css";

type PermissionSelectProps = {
  groups: PermissionGroup[];
  value: string[];
  loading?: boolean;
  error?: string;
  onChange: (value: string[]) => void;
};

function PermissionSelect({
  groups,
  value,
  loading = false,
  error,
  onChange,
}: PermissionSelectProps) {
  const selected = value || [];

  const toggle = (key: string) => {
    if (selected.includes(key)) {
      onChange(selected.filter((item) => item !== key));
      return;
    }
    onChange([...selected, key]);
  };

  const toggleGroup = (keys: string[]) => {
    const allOn = keys.every((key) => selected.includes(key));
    if (allOn) {
      onChange(selected.filter((item) => !keys.includes(item)));
      return;
    }
    onChange(Array.from(new Set([...selected, ...keys])));
  };

  return (
    <div className={`ckf-input ${error ? "ckf-input--has-error" : ""}`}>
      <p className="ckf-input__label">Permissions</p>

      {loading ? (
        <p className="ckf-perm__empty">Loading permissions...</p>
      ) : groups.length === 0 ? (
        <p className="ckf-perm__empty">No permissions available.</p>
      ) : (
        groups.map((group) => {
          const keys = group.items.map((item) => item.key);
          const allOn = keys.every((key) => selected.includes(key));

          return (
            <div key={group.label} className="ckf-perm">
              <div className="ckf-perm__head">
                <p className="ckf-perm__title">{group.label}</p>
                <button
                  type="button"
                  className="ckf-perm__all"
                  onClick={() => toggleGroup(keys)}
                >
                  {allOn ? "Clear" : "Select all"}
                </button>
              </div>
              <div className="ckf-perm__list">
                {group.items.map((item) => (
                  <Checkbox
                    key={item.key}
                    id={`perm-${item.key}`}
                    label={item.label}
                    checked={selected.includes(item.key)}
                    onChange={() => toggle(item.key)}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}

      {error && (
        <p className="ckf-input__error" role="alert">
          <i className="bi bi-exclamation-circle-fill" aria-hidden="true"></i>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export default PermissionSelect;
