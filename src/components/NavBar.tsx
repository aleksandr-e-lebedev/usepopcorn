import './NavBar.styles.css';

function Logo() {
  return (
    <div className="logo">
      <span className="logo__icon" role="img">
        🍿
      </span>
      <h1 className="logo__title">usePopcorn</h1>
    </div>
  );
}

interface SearchProps {
  placeholder: string;
  query: string;
  onQuery: (query: string) => void;
}

function Search({ placeholder, query, onQuery }: SearchProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    onQuery(e.target.value);
  }

  return (
    <input
      className="search"
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={handleInputChange}
    />
  );
}
