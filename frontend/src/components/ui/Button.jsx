import { cn } from "@/lib/utils";

const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white",
    secondary: "bg-violet-600 hover:bg-violet-700 text-white",
    outline: "border border-slate-600 hover:bg-slate-800",
    ghost: "hover:bg-slate-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-6 py-3 text-lg font-semibold leading-none transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;