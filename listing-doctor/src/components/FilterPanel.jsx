import { useState, useEffect } from 'react';

export default function FilterPanel({ allDoctors, onFilter }) {
  const [consultationType, setConsultationType] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    if (Array.isArray(allDoctors)) {
      const specialtySet = new Set(allDoctors.flatMap(doc => doc.specialities.map(spec => spec.name)));
      setSpecialties([...specialtySet]);
    } else {
      console.warn('allDoctors is not an array or is undefined');
    }
  }, [allDoctors]);

  useEffect(() => {
    onFilter({ consultationType, selectedSpecialties, sortBy });
  }, [consultationType, selectedSpecialties, sortBy]);

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-4" data-testid="filter-header-moc">Mode of Consultation</h3>
      <div className="space-y-2 mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="consult"
            value="Video Consult"
            data-testid="filter-video-consult"
            onChange={() => setConsultationType('Video Consult')}
            className="form-radio text-blue-500"
          />
          <span className="ml-2 text-gray-600">Video Consult</span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="consult"
            value="In Clinic"
            data-testid="filter-in-clinic"
            onChange={() => setConsultationType('In Clinic')}
            className="form-radio text-blue-500"
          />
          <span className="ml-2 text-gray-600">In Clinic</span>
        </label>
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-4" data-testid="filter-header-speciality">Specialties</h3>
      <div className="space-y-2 mb-4">
        {specialties.length > 0 ? (
          specialties.map((spec, idx) => (
            <label key={idx} className="flex items-center">
              <input
                type="checkbox"
                data-testid={`filter-specialty-${spec}`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSpecialties([...selectedSpecialties, spec]);
                  } else {
                    setSelectedSpecialties(selectedSpecialties.filter(s => s !== spec));
                  }
                }}
                className="form-checkbox text-blue-500"
              />
              <span className="ml-2 text-gray-600">{spec}</span>
            </label>
          ))
        ) : (
          <p className="text-gray-500">No specialties available</p>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mb-4" data-testid="filter-header-sort">Sort By</h3>
      <select
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">None</option>
        <option value="fees">Fees</option>
        <option value="experience">Experience</option>
      </select>
    </div>
  );
}
