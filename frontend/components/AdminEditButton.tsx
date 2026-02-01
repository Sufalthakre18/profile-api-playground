'use client';

import { useState } from 'react';
import { isAuthenticated } from '@/lib/auth';
import EditProfileModal from './EditProfileModal';

export default function AdminEditButton() {
  const [showModal, setShowModal] = useState(false);
  const authenticated = isAuthenticated();

  if (!authenticated) {
    return null; // Don't show button if not logged in
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center gap-2 z-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Profile
      </button>

      {showModal && (
        <EditProfileModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            window.location.reload(); // Refresh to show updated data
          }}
        />
      )}
    </>
  );
}