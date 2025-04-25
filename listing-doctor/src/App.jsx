import { useEffect, useState } from 'react';
import { fetchDoctors } from './utils/fetchDoctors';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';
import AutoComplete from './components/AutoComplete';

function App() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ consultationType: '', selectedSpecialties: [], sortBy: '' });

  useEffect(() => {
    fetchDoctors().then(setAllDoctors);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Campus Assessment Doctor Listing</h1>
      <AutoComplete allDoctors={allDoctors} onSearch={setSearchQuery} />

      {/* Container for the FilterPanel and DoctorList */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Filter Panel */}
        <div className="md:col-span-1">
          <FilterPanel allDoctors={allDoctors} onFilter={setFilters} />
        </div>

        {/* Doctor List */}
        <div className="md:col-span-2">
          <DoctorList allDoctors={allDoctors} searchQuery={searchQuery} filters={filters} />
        </div>
      </div>
    </div>
  );
}

export default App;
