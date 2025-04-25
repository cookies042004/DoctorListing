import DoctorCard from './DoctorCard';

export default function DoctorList({ allDoctors, searchQuery, filters }) {
  let filtered = allDoctors;

  // searching by name
  if (searchQuery) {
    filtered = filtered.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // selecting based on fees and experience
  if (filters.consultationType) {
    if (filters.consultationType === 'Video Consult') {
      filtered = filtered.filter(doc => doc.video_consult === true);
    } else if (filters.consultationType === 'In Clinic') {
      filtered = filtered.filter(doc => doc.in_clinic === true);
    }
  }

  if (filters.selectedSpecialties.length > 0) {
    filtered = filtered.filter(doc => {
      if (!Array.isArray(doc.specialities)) return false;
      return doc.specialities.some(spec => filters.selectedSpecialties.includes(spec.name));
    });
  }

  // Sorting by fees or experience
  if (filters.sortBy === 'fees') {
    filtered.sort((a, b) => {
      const feeA = parseFloat(a.fees.replace(/[^\d.-]/g, ''));
      const feeB = parseFloat(b.fees.replace(/[^\d.-]/g, ''));
      return feeA - feeB;
    });
  } else if (filters.sortBy === 'experience') {
    filtered.sort((a, b) => {
      const expA = parseInt(a.experience.split(' ')[0], 10);
      const expB = parseInt(b.experience.split(' ')[0], 10);
      return expB - expA;
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      {filtered.length === 0 ? (
        <p>No doctors match the filters.</p>
      ) : (
        filtered.map((doc, idx) => (
          <DoctorCard key={idx} doctor={doc} />
        ))
      )}
    </div>
  );
}
