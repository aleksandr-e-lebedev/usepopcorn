import './Box.styles.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Box({ children, className }: Props) {
  return (
    <div className={className ? `box ${className}` : 'box'}>{children}</div>
  );
}
