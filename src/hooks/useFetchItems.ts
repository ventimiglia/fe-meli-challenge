import { useCallback, useEffect, useState } from 'react';
import { TItem } from '../App';

type TPagedResponse = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: TItem[];
};

type TFetchItemsResponse = TPagedResponse | TItem[];

const fetchItems = async (
  page: number,
  limit: number,
  search: string = ''
): Promise<TFetchItemsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (search) {
    const response = await fetch(`http://localhost:5000/items?_page=${page}`);
    const data: TItem[] = await response.json();

    if(!data) {
      return [];
    }

    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    return filteredData;
  } else {
    const response = await fetch(
      `http://localhost:5000/items?_page=${page}&_per_page=${limit}`
    );
    const data: TPagedResponse = await response.json();
    return data;
  }
};

export const useFetchItems = (searchTerm: string) => {
  const ITEMS_PER_PAGE = 10;

  const [items, setItems] = useState<TItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchItems(page, ITEMS_PER_PAGE, searchTerm);

      if (Array.isArray(response)) {
        setItems(response);
        setHasMore(false);
      } else {
        setItems((prevItems) =>
          page === 1 ? response.data : [...prevItems, ...response.data]
        );
        setHasMore(page < response.last);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return { items, loading, hasMore, setPage, setItems };
};
