import React, { useCallback, useEffect, useState } from 'react';
import { getMemes } from '../lib/cryptoMemeContract';
import useDebounce from '../lib/hooks/useDebounce';
import { Result } from '../lib/types/result';
import Loader from './Loader';
import MemeCard from './MemeCard';

const MemeList = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const countPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [memes, setMemes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const debouncedValue = useDebounce(searchValue, 500);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const loadMemes = useCallback(async () => {
    setLoading(true);
    const response: Result = await getMemes();
    setError(response.isError);
    setMemes(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMemes();
  }, [loadMemes]);

  if (isError)
    return (
      <div>
        failed to load <p>Please, check your wallet connection :)</p>
      </div>
    );
  if (isLoading) return <Loader />;

  // Simple Searching and pagination
  const startIndex = currentPage * countPerPage - countPerPage;
  const endIndex = startIndex + countPerPage;
  //console.log(`search: ${debouncedValue}, skip: ${startIndex}, limit: ${endIndex}`);
  const currentMemes = memes
    .filter(item => item.text.toLowerCase().indexOf(debouncedValue) > -1)
    .slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2 text-black dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          name="Meme"
          autoFocus
          placeholder="Search memes .... "
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="w-full py-2 border-b-2 outline-none text-black focus:border-black dark:focus:border-white dark:bg-black dark:text-white"
        />
      </div>
      <div className="space-y-4 divide-y-2 ">
        {currentMemes?.map(meme => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>

      <nav aria-label="Page navigation" className="py-10">
        {currentPage > 1 && (
          <button
            className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            onClick={previousPage}
          >
            Previous
          </button>
        )}
        {memes.length > 0 && (
          <button
            className="h-10 px-10 text-black dark:text-white transition-colors duration-150 border focus:shadow-outline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black float-right"
            onClick={nextPage}
          >
            Next
          </button>
        )}
      </nav>
    </div>
  );
};

export default MemeList;
