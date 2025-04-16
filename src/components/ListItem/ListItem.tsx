import './ListItem.styles.css';

type Props = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

export default function ListItem({ children, className, ...props }: Props) {
  return (
    <li
      className={className ? `list-item ${className}` : 'list-item'}
      {...props}
    >
      {children}
    </li>
  );
}
