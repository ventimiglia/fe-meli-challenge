import { useEffect } from 'react';
import useDebounce from './useDebounce';
import { TItem } from '../App';

const useSearch = (
  searchTerm: string,
  setPage: (page: number) => void,
  setItems: (items: TItem[]) => void
) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm === '') {
      setPage(1);
      setItems([]);
    } else {
      setPage(0);
    }
  }, [debouncedSearchTerm, setPage, setItems]);
};

export default useSearch;
