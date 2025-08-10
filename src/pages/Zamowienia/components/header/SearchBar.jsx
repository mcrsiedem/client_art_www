import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.module.css'; // Dodaj ten plik ze stylami
import style from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const inputRef = useRef(null);

  // Ładowanie historii z localStorage przy pierwszym renderowaniu
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('searchHistory');
      if (storedHistory) {
        setSearchHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load search history from localStorage", e);
    }
  }, []);

  // Zapisywanie historii do localStorage po każdej zmianie
  useEffect(() => {
    try {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    } catch (e) {
      console.error("Failed to save search history to localStorage", e);
    }
  }, [searchHistory]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearInput = () => {
    setInputValue('');
    inputRef.current.focus(); // Ustawienie focusa na polu po wyczyszczeniu
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      onSearch(inputValue);
      // Dodawanie do historii, jeśli jeszcze tam nie ma
      if (!searchHistory.includes(inputValue)) {
        setSearchHistory(prevHistory => [inputValue, ...prevHistory.slice(0, 4)]); // Ograniczenie do 5 ostatnich wyszukiwań
      }
      setInputValue('');
    }
  };

  return (
    <div  className={ style.search_bar_container}>
      <form onSubmit={handleSearchSubmit} className={ style.search_bar}>
        <div className={ style.search_icon_left}>
          {/* Przykładowa ikona lupki */}
          <span>🔍</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Wyszukaj..."
          className={ style.search_input}
        />
        {inputValue && (
          <div className={ style.clear_icon_right} onClick={handleClearInput}>
            {/* Przykładowa ikona krzyżyka */}
            <span>❌</span>
          </div>
        )}
      </form>
      {searchHistory.length > 0 && (
        <div className={ style.search_history_container}>
          **Ostatnie wyszukiwania:**
          <ul className={ style.search_history_list}>
            {searchHistory.map((item, index) => (
              <li key={index} onClick={() => setInputValue(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;