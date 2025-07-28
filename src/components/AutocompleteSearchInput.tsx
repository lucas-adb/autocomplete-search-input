import { useId } from 'react';

interface DataListOption {
  value: string;
  label: string;
}

interface AutocompleteSearchInputProps {
  query: string;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dataListOptions: DataListOption[];
}

function AutocompleteSearchInput({
  query,
  handleQueryChange,
  dataListOptions,
}: AutocompleteSearchInputProps) {
  const searchInputId = useId();
  const searchListId = useId();

  return (
    <>
      <label htmlFor={searchInputId}>Search here:</label>
      <input
        name="search"
        id={searchInputId}
        value={query}
        onChange={handleQueryChange}
        list={searchListId}
        placeholder="Search here..."
      />

      <datalist id={searchListId}>
        {dataListOptions.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </datalist>
    </>
  );
}

export default AutocompleteSearchInput;
