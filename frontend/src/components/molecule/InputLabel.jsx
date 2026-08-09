import Input from "../atoms/Input";

export default function InputLabel({
  label,
  id,
  name,
  type = "text",
  data, // Soporta tu prop actual
  value, // Soporta el estándar de React
  handleChange, // Soporta tu prop actual
  onChange, // Soporta el estándar de React
  placeholder,
  required = false,
  step,
  min,
  max,
  disabled = false,
  className = "",
}) {
  // Asegurar que use id o caiga de respaldo en el name para el htmlFor
  const inputId = id || name;

  // Priorizar prop estándar sobre la personalizada si se pasa alguna
  const val = value !== undefined ? value : data;
  const handler = onChange || handleChange;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-slate-600 ml-1"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <Input
        id={inputId}
        name={name}
        type={type}
        value={val || ""}
        onChange={handler}
        placeholder={placeholder}
        required={required}
        step={step}
        min={min}
        max={max}
        disabled={disabled}
      />
    </div>
  );
}
