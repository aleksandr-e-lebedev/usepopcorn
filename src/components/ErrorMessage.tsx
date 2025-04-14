import './ErrorMessage.styles.css';

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}
