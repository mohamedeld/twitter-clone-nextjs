interface IProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}
const Button = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}: IProps) => {
  return (
    <button
      className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        trasition
        border-2
        ${fullWidth ? "w-full" : "w-fit"}
        ${
          secondary
            ? "bg-white text-black border-black"
            : "bg-sky-500 text-white border-sky-500"
        }
        ${large ? "text-xl px-5 py-3" : "text-md px-4 py-2"}
        ${outline ? "bg-transparent border-white text-white" : ""}

        `}
        disabled={disabled}
        onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
