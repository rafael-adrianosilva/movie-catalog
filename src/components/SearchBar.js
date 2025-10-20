import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const [year, setYear] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSearch({
      term: term.trim(),
      year: year.trim(),
    });
  }

  return (
    <form className="topbar" onSubmit={handleSubmit}>
      <input
        placeholder="Busque por título…"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <input
        type="number"
        inputMode="numeric"
        placeholder="Ano"
        min="1900"
        max={new Date().getFullYear()}
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button className="button" type="submit">Buscar</button>
    </form>
  );
}
