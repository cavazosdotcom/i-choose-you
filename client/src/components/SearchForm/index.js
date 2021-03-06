import React, { useState } from 'react';

// We take our props object and assign each property to it's own variable name.
// In this case we only passed one prop, `onFormSubmit`
function SearchForm({ onFormSubmit }) {
  // Our state variable for the search term. Defaults to "microsoft/vscode".
  const [term, setTerm] = useState('');

  const sendTerm = (e) => {
    e.preventDefault();

    onFormSubmit(term);
    setTerm('')
  };

  return (
    <div className="search-bar ui segment text-center py-3">
      <form className="ui form" onSubmit={sendTerm}>
        <div className="field">
          <label></label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </form>
    </div>
  );
}

export default SearchForm;