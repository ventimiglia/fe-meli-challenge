'use client';

import { useState, useRef, useCallback, lazy, Suspense } from 'react';
import { Loader2, Search } from 'lucide-react';

import Modal from './components/Modal/Modal';

import './App.css';
import { useFetchItems } from './hooks/useFetchItems';
import useSearch from './hooks/useSearch';

export type TItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  detail: {
    info: string;
    price: number;
    address: string;
  };
};

const LazyItemDetailDialog = lazy(
  () => import('./components/ItemDetailDialog/ItemDetailDialog')
);

export default function Component() {
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { items, loading, hasMore, setPage, setItems } =
  useFetchItems(searchTerm);
  
  const observer = useRef<IntersectionObserver | null>(null);
  
  const lastItemRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage]
  );
  
  const handleItemClick = (item: TItem) => {
    setSelectedItem(item);
  };
  
  useSearch(searchTerm, setPage, setItems);
  
  return (
    <main className='item-list'>
      <header className='item-list__header'>
        <h1 className='item-list__title'>List with Search</h1>
        <div className='item-list__search-container'>
          <input
            type='text'
            placeholder='Search items...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='item-list__input'
            aria-label='Search through items'
          />
          <Search
            className='item-list__search-icon'
            size={20}
            aria-hidden='true'
          />
        </div>
      </header>

      <ul className='item-list__items'>
        {items.map((item, index) => (
          <li
            key={item.id}
            ref={index === items.length - 1 ? lastItemRef : null}
            className='item-list__item'
            onClick={() => handleItemClick(item)}
          >
            <article className='item-list__item-content'>
              <img
                src={item.image}
                alt={item.title}
                className='item-list__item-image'
              />
              <div className='item-list__item-information'>
                <h2 className='item-list__item-title'>{item.title}</h2>
                <p className='item-list__item-description'>
                  {item.description}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {loading && (
        <div className='item-list__loading'>
          <Loader2 className='item-list__loading-icon' />
          <span className='item-list__loading-text'>Loading more items...</span>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <div className='item-list__no-more-items'>No more items to load</div>
      )}

      {!loading && items.length === 0 && (
        <div className='item-list__no-items'>No items found</div>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
          {selectedItem && <LazyItemDetailDialog {...selectedItem} />}
        </Modal>
      </Suspense>
    </main>
  );
}
