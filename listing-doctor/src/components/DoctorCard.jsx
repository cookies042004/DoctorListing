import React from 'react';

export default function DoctorCard({ doctor }) {
  const specialties =
    doctor.specialities && Array.isArray(doctor.specialities)
      ? doctor.specialities.map((spec) => spec.name).join(', ')
      : 'No specialties available';

  const clinic = doctor.clinic ? doctor.clinic.address : null;
  const location = clinic ? `${clinic.locality}, ${clinic.city}` : 'Location not available';
  const clinicName = doctor.clinic ? doctor.clinic.name : 'Clinic not available';

  return (
    <div
      data-testid="doctor-card"
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 mb-6 flex items-start gap-6 border border-gray-200 hover:border-blue-100"
    >
      {/* Doctor Image */}
      <div className="flex-shrink-0">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full border-4 border-blue-100 shadow-sm"
        />
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col justify-between w-full">
        <div>
          {/* Name & Specialties */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
            {doctor.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 italic">{specialties}</p>

          {/* Experience & Fee */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-700">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              <strong>Experience:</strong> {doctor.experience}
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              <strong>Fee:</strong> {doctor.fees}
            </span>
          </div>

          {/* Clinic Info */}
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <div className="flex items-center">
              <i className="ri-building-4-line mr-2 text-blue-400"></i>
              {clinicName}
            </div>
            <div className="flex items-center">
              <i className="ri-map-pin-2-fill mr-2 text-blue-400"></i>
              {location}
            </div>
          </div>
        </div>

        {/* Book Appointment Button */}
        <div className="mt-6 text-right">
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
