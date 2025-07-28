import { useState } from 'react';
import AutocompleteSearchInput from './components/AutocompleteSearchInput';

const dataListOptions = [
  { value: 'banana', label: 'Banana' },
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
];

function App() {
  const [query, setQuery] = useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <h1>Autocomplete Search Input</h1>
      <p>Value: {query}</p>
      <AutocompleteSearchInput
        query={query}
        handleQueryChange={handleQueryChange}
        dataListOptions={dataListOptions}
      />
    </>
  );
}

export default App;
