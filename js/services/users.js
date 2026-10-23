(function () {
  const universities = Object.freeze([
    { universityId: 'muj', name: 'Manipal University Jaipur' },
    { universityId: 'poornima', name: 'Poornima University' },
    { universityId: 'jecrc', name: 'JECRC University' }
  ]);
  const universityIds = new Set(universities.map(university => university.universityId));

  function isSupportedUniversity(universityId) {
    return universityIds.has(universityId);
  }

  async function getCurrentProfile() {
    const user = window.UniMateAuth?.getUser();
    if (!user || !window.UniMateFirebase.connected) return null;
    // Read only the authenticated user's own profile document from Firestore here.
    return window.UniMateFirebase.getCurrentUserProfile?.() || null;
  }

  async function getCurrentUniversityProfile() {
    const profile = await getCurrentProfile();
    return profile && isSupportedUniversity(profile.universityId) ? profile : null;
  }

  async function saveProfile(profile) {
    const user = window.UniMateAuth?.getUser();
    if (!user) throw new Error('Sign in before completing your profile.');
    if (!isSupportedUniversity(profile.universityId)) throw new Error('Select one of the supported universities.');
    if (!window.UniMateFirebase.connected) throw new Error('Profile setup is not connected yet.');

    const payload = {
      name: user.name || '',
      email: user.email || '',
      universityId: profile.universityId
    };
    // Write to users/{auth.uid}; Firestore rules must only allow the user to write their own document.
    return window.UniMateFirebase.saveCurrentUserProfile?.(payload) || payload;
  }

  window.UniMateServices = window.UniMateServices || {};
  window.UniMateServices.users = { universities, isSupportedUniversity, getCurrentProfile, getCurrentUniversityProfile, saveProfile };
})();
