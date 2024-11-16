import styled from 'styled-components';
import { Logo } from './Logo';
import { useData } from '../providers';

export function Header() {
  const { filters, setFilters } = useData();

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value
    }));
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <FilterContainer>
        <StyledInput
          type="text"
          placeholder="Name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Status"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Species"
          value={filters.species}
          onChange={(e) => handleFilterChange('species', e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Type"
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Gender"
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
        />
      </FilterContainer>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
  font-size: 16px;
  width: 200px;

  &:focus {
    border-color: #83bf46;
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }
`;
