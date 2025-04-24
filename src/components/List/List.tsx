import './List.styles.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function List({ children, className }: Props) {
  return (
    <ul className={className ? `list ${className}` : 'list'}>{children}</ul>
  );
}
