import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../../assets/css/color-picker.css";

const PRESETS = ["#000000", "#ffffff", "#062d67", "#f58020", "#575757", "#e11d48", "#15803d", "#3b82f6"];

const NAMED: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  blue: "#0000ff",
  green: "#008000",
  orange: "#ffa500",
  yellow: "#ffff00",
  gray: "#808080",
  grey: "#808080",
};

const hexFromRgb = (r: string, g: string, b: string) => {
  const hex = (n: string) => Number(n).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

export const toHexColor = (value: string, fallback = "#000000") => {
  const parsed = parseColor(value, fallback);
  return parsed.hex;
};

const parseColor = (value: string, fallback = "#000000") => {
  const v = String(value || "").trim().toLowerCase();
  if (NAMED[v]) return { hex: NAMED[v], alpha: 1 };
  if (/^#([0-9a-f]{8})$/i.test(v)) {
    return { hex: `#${v.slice(1, 7)}`, alpha: parseInt(v.slice(7), 16) / 255 };
  }
  if (/^#([0-9a-f]{6})$/i.test(v)) return { hex: v, alpha: 1 };
  if (/^#([0-9a-f]{3})$/i.test(v)) return { hex: `#${v[1]}${v[1]}${v[2]}${v[2]}${v[3]}${v[3]}`, alpha: 1 };
  const rgb = v.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/i);
  if (rgb) return { hex: hexFromRgb(rgb[1], rgb[2], rgb[3]), alpha: rgb[4] === undefined ? 1 : Math.min(1, Number(rgb[4])) };
  return { hex: fallback, alpha: 1 };
};

const colorToCss = (hex: string, alpha: number) => {
  if (alpha >= 0.995) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.round(alpha * 100) / 100})`;
};

type ColorPickerPanelProps = {
  value: string;
  left: number;
  top: number;
  onChange: (value: string) => void;
  onClose: () => void;
};

export function ColorPickerPanel({ value, left, top, onChange, onClose }: ColorPickerPanelProps) {
  const { hex, alpha } = parseColor(value);
  const opacity = Math.round(alpha * 100);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onClose]);

  const emit = (nextHex: string, nextAlpha: number) => onChange(colorToCss(nextHex, nextAlpha));

  return createPortal(
    <div
      ref={ref}
      className="ckf-color-picker"
      style={{ left: Math.min(left, window.innerWidth - 232), top: Math.min(top, window.innerHeight - 260) }}
    >
      <input type="color" value={hex} onChange={(event) => emit(event.target.value, alpha)} />
      <input
        type="text"
        value={colorToCss(hex, alpha)}
        onChange={(event) => {
          const next = parseColor(event.target.value, hex);
          emit(next.hex, next.alpha);
        }}
      />
      <label className="ckf-color-picker__opacity">
        <span>Opacity</span>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(event) => emit(hex, Number(event.target.value) / 100)}
        />
        <strong>{opacity}%</strong>
      </label>
      <div className="ckf-color-picker__presets">
        {PRESETS.map((color) => (
          <button
            key={color}
            type="button"
            style={{ background: color }}
            aria-label={color}
            onClick={() => emit(color, alpha)}
          />
        ))}
      </div>
    </div>,
    document.body
  );
}

type ColorPickerProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="ckf-color-picker-field">
      {label ? <span className="ckf-color-picker-field__label">{label}</span> : null}
      <button
        ref={btnRef}
        type="button"
        className="ckf-color-picker-field__swatch"
        aria-label={label || "Pick color"}
        onClick={() => setOpen(true)}
      >
        <span style={{ background: value || "#000000" }}></span>
      </button>
      {open ? (
        <ColorPickerPanel
          value={value}
          left={btnRef.current?.getBoundingClientRect().left || 0}
          top={(btnRef.current?.getBoundingClientRect().bottom || 0) + 8}
          onChange={onChange}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}

export default ColorPicker;
