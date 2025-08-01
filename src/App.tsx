import { useEffect, useMemo, useState } from 'react';
import AutocompleteSearchInput from './components/AutocompleteSearchInput';

interface City {
  nome: string;
  id: number;
  estado: string;
}

function App() {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<City[]>([]);

  const dataList = useMemo(() => {
    if (cities.length === 0) return [];

    return cities.map((city) => {
      return {
        value: city.nome,
        label: city.nome,
      };
    });
  }, [cities]);

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

  return (
    <>
      <h1>Autocomplete Search Input</h1>
      <p>Value: {query}</p>
      <AutocompleteSearchInput
        query={query}
        handleQueryChange={handleQueryChange}
        dataListOptions={dataList}
      />
    </>
  );
}

export default App;
