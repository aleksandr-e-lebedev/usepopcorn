import './ToggleButton.styles.css';

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function ToggleButton({ isOpen, onToggle, className }: Props) {
  function handleClick() {
    onToggle();
  }

  return (
    <button
      type="button"
      className={className ? `toggle-button ${className}` : 'toggle-button'}
      onClick={handleClick}
    >
      {isOpen ? '–' : '+'}
    </button>
  );
}
