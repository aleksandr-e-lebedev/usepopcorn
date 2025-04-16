import './Content.styles.css';

interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return <main className="content">{children}</main>;
}
