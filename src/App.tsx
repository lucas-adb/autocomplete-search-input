import { useEffect, useState } from 'react';
import AutocompleteSearchInput from './components/AutocompleteSearchInput';

const dataListOptions = [
  { value: 'banana', label: 'Banana' },
  { value: 'apple', label: 'Apple' },
  { value: 'orange', label: 'Orange' },
];

interface City {
  nome: string;
  id: number;
  estado: string;
}

function App() {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setCities([]);
      return;
    }

    async function startFetching() {
      try {
        const result = await fetch(
          `https://brasilapi.com.br/api/cptec/v1/cidade/${query}`
        );

        if (!result.ok) {
          console.error('fetch not working');
          setCities([]);
          return;
        }

        const data = await result.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      }
    }

    const timeoutId = setTimeout(startFetching, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  console.log('cities', cities);

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
