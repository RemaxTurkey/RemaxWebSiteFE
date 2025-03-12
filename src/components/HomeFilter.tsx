import React, { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface HomeFilterProps {
  onSearch: (category: string, city: string) => void;
  onMapClick: () => void;
}

const categories: Category[] = [
  { id: 'satilik', name: 'Satılık' },
  { id: 'kiralik', name: 'Kiralık' },
  { id: 'gunluk', name: 'Günlük Kiralık' },
  { id: 'devren', name: 'Devren' },
];

const HomeFilter: React.FC<HomeFilterProps> = ({ onSearch, onMapClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const [citySearch, setCitySearch] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    onSearch(selectedCategory.id, citySearch);
  };

  return (
    <div className="home-filter">
      <div className="home-filter__filter">
        {/* Kategori Dropdown */}
        <div className="home-filter__filter-category">
          <button
            className="home-filter__filter-category-dropdown"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="home-filter__filter-category-selected">
              {selectedCategory.name}
            </span>
            <ChevronDown 
              className={`home-filter__filter-category-icon ${isDropdownOpen ? 'open' : ''}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="home-filter__filter-category-menu">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`home-filter__filter-category-item ${
                    selectedCategory.id === category.id ? 'active' : ''
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Şehir Arama */}
        <div className="home-filter__filter-city-search">
          <input
            type="text"
            className="home-filter__filter-city-search-input"
            placeholder="İl, ilçe veya mahalle ara"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
        </div>

        {/* Butonlar */}
        <div className="home-filter__filter-buttons">
          <button className="btn-search" onClick={handleSearch}>
            <Search />
            <span className="btn-search__text">Ara</span>
          </button>
          <button className="btn-map-link" onClick={onMapClick}>
            <MapPin />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter; 