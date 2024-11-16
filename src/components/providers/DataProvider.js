import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    type: '',
    gender: ''
  });

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    try {
      const { data } = await axios.get(url);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (error) {
      setIsError(true);
      console.error('Error fetching data:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const { name, status, species, type, gender } = filters;
    const filterParams = new URLSearchParams();

    if (name) filterParams.append('name', name);
    if (status) filterParams.append('status', status);
    if (species) filterParams.append('species', species);
    if (type) filterParams.append('type', type);
    if (gender) filterParams.append('gender', gender);

    const url = `${API_URL}?page=${activePage}&${filterParams.toString()}`;
    fetchData(url);
  }, [activePage, filters]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      characters,
      isFetching,
      isError,
      info,
      filters,
      setFilters
    }),
    [activePage, characters, isFetching, isError, info, filters]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});
export const useData = () => useContext(DataContext);
