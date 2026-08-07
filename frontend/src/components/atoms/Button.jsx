export default function Button({
  children,
  onClick,
  type = "button",
  color = "bg-blue-600",
  hover = "hover:bg-blue-700",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl ${color} ${hover} py-4 font-bold text-white shadow-lg transition-all 
        hover:-translate-y-0.5 active:scale-95 cursor-pointer 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 disabled:shadow-none 
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
