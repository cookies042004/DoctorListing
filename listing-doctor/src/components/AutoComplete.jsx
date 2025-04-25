import { useState } from 'react';

export default function AutoComplete({ allDoctors, onSearch }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const matches = allDoctors
        .filter((doc) => doc.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 3);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (name) => {
    setQuery(name);
    setSuggestions([]);
    onSearch(name);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">
      <input
        className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
        data-testid="autocomplete-input"
        value={query}
        onChange={handleInputChange}
        placeholder="Search doctor by name"
      />
      {/* Suggestions list */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((sug, idx) => (
            <li
              key={idx}
              data-testid="suggestion-item"
              className="px-4 py-3 hover:bg-blue-100 cursor-pointer transition duration-200 flex items-center gap-4"
              onClick={() => handleSelect(sug.name)}
            >
              <img
                src={sug.photo}
                alt={sug.name}
                className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
              />
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-800">{sug.name}</span>
                <span className="text-sm text-gray-500">{sug.specialities.map(spec => spec.name).join(', ')}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
