import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { info, activePage, setActivePage, filters } = useData();

  const getPageFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('page'), 10) || 1;
  };

  const updateUrl = (page) => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('page', page);

    // Добавляем фильтры в URL
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        newUrl.searchParams.set(key, filters[key]);
      } else {
        newUrl.searchParams.delete(key);
      }
    });

    window.history.pushState({}, '', newUrl);
  };

  const pageClickHandler = (index) => {
    setActivePage(index);
    updateUrl(index + 1); // Учитываем 0-индексацию
  };

  useEffect(() => {
    const initialPage = getPageFromUrl();
    setActivePage(initialPage - 1); // Устанавливаем activePage с учётом индексации
    const createdPages = Array.from({ length: info.pages }, (_, i) => i + 1);
    setPages(createdPages);
  }, [info.pages, setActivePage]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {activePage > 0 && (
        <>
          <Page
            onClick={() => pageClickHandler(0)}
            aria-label="Go to first page"
          >
            « First
          </Page>
          <Ellipsis>...</Ellipsis>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {activePage < pages.length - 1 && (
        <>
          <Page
            onClick={() => pageClickHandler(activePage + 1)}
            aria-label={`Go to page ${activePage + 2}`}
          >
            {activePage + 2}
          </Page>
          {activePage + 1 !== pages.length - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page
                onClick={() => pageClickHandler(pages.length - 1)}
                aria-label="Go to last page"
              >
                Last »
              </Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
