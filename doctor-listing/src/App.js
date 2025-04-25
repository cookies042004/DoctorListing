import { useEffect, useState } from 'react';
import { fetchDoctors } from '../../listing-doctor/src/utils/fetchDoctors';
import FilterPanel from '../../listing-doctor/src/components/FilterPanel';
import DoctorList from '../../listing-doctor/src/components/DoctorList';
import AutoComplete from '../../listing-doctor/src/components/AutoComplete';

function App() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ consultationType: '', selectedSpecialties: [], sortBy: '' });

  useEffect(() => {
    fetchDoctors().then(setAllDoctors);
  }, []);

  return (
    <div>
      <h1>Campus Assessment Doctor Listing</h1>
      <AutoComplete allDoctors={allDoctors} onSearch={setSearchQuery} />
      <FilterPanel allDoctors={allDoctors} onFilter={setFilters} />
      <DoctorList allDoctors={allDoctors} searchQuery={searchQuery} filters={filters} />
    </div>
  );
}

export default App;