import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../../assets/css/action-menu.css";

export type ActionMenuItem = {
  label: string;
  icon?: string;
  onClick: () => void;
  danger?: boolean;
};

type ActionMenuProps = {
  items: ActionMenuItem[];
  label?: string;
};

function ActionMenu({ items, label = "Actions" }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const placeMenu = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    const width = 180;
    const height = items.length * 42 + 16;
    const left = Math.min(rect.right - width, window.innerWidth - width - 8);
    const top =
      window.innerHeight - rect.bottom < height
        ? rect.top - height - 6
        : rect.bottom + 6;

    setPos({ top, left: Math.max(8, left) });
  };

  useEffect(() => {
    if (!open) return;

    placeMenu();

    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onReposition = () => setOpen(false);

    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);

    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open, items.length]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={`ckf-action-menu__btn ${open ? "is-open" : ""}`}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <i className="bi bi-three-dots-vertical"></i>
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            className="ckf-action-menu__list"
            role="menu"
            style={{ top: pos.top, left: pos.left }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                className={`ckf-action-menu__item ${
                  item.danger ? "ckf-action-menu__item--danger" : ""
                }`}
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
              >
                {item.icon && <i className={`bi ${item.icon}`}></i>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export default ActionMenu;
