interface ActionButtonProps {
  type?: "button" | "submit" | "reset";
  text: string;
  bgColor: string;
  activeColor: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ActionButton = ({
  type = "button",
  text,
  bgColor,
  activeColor,
  onClick,
  disabled = false,
}: ActionButtonProps) => (
  <button
    type={type}
    className={`flex-1 p-1 text-base sm:text-xl text-white border-2 border-black ${bgColor} ${
      !disabled ? `active:scale-95 active:${activeColor}` : ""
    } transition-transform duration-100 cursor-pointer hover:scale-101 rounded-full h-12 sm:h-20 shadow-[3px_3px_0px_rgba(0,0,0,1)]`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default ActionButton;
