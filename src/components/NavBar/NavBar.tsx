import { useRef, useEffect } from 'react';

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

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === 'Enter'.toLowerCase()) {
        const inputEl = inputRef.current;
        if (document.activeElement === inputEl) return;
        inputEl?.focus();
        onQuery('');
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onQuery]);

  return (
    <input
      className="search"
      type="text"
      ref={inputRef}
      placeholder={placeholder}
      value={query}
      onChange={handleInputChange}
    />
  );
}

interface NumResultsProps {
  numResults: number;
}

function NumResults({ numResults }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{numResults}</strong> results
    </p>
  );
}

interface NavBarProps {
  query: string;
  onQuery: (query: string) => void;
  numResults: number;
}

export default function NavBar({ query, onQuery, numResults }: NavBarProps) {
  return (
    <header className="header">
      <nav className="header__nav-bar">
        <Logo />
        <Search
          placeholder="Search movies..."
          query={query}
          onQuery={onQuery}
        />
        <NumResults numResults={numResults} />
      </nav>
    </header>
  );
}
