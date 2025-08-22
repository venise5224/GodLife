interface ActionButtonProps {
  text: string;
  bgColor: string;
  activeColor: string;
  onClick: () => void;
  disabled?: boolean;
}

const ActionButton = ({
  text,
  bgColor,
  activeColor,
  onClick,
  disabled = false,
}: ActionButtonProps) => (
  <button
    className={`flex-1 p-1 text-xl text-white ${bgColor} ${
      !disabled ? `active:scale-95 active:${activeColor}` : ""
    } transition-transform duration-100 cursor-pointer hover:scale-101 rounded-full h-20 shadow-lg`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default ActionButton;
