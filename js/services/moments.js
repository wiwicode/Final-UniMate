(function () {
  async function getScope() {
    return window.UniMateServices.users?.getCurrentUniversityProfile() || null;
  }

  async function list() {
    const profile = await getScope();
    if (!profile || !window.UniMateFirebase.connected) return [];
    // Query current Moments with universityId == profile.universityId. Do not fetch other universities' Moments.
    return window.UniMateFirebase.queryMoments?.({ universityId: profile.universityId }) || [];
  }

  async function create(moment) {
    const profile = await getScope();
    if (!profile) throw new Error('Complete your profile and select a university before posting a Moment.');
    if (!window.UniMateFirebase.connected) throw new Error('Moment publishing is not connected yet.');
    const payload = { ...moment, universityId: profile.universityId };
    // Store any uploaded image in Firebase Storage, then write this university-scoped Moment in Firestore.
    return window.UniMateFirebase.createMoment?.(payload) || payload;
  }

  window.UniMateServices = window.UniMateServices || {};
  window.UniMateServices.moments = { list, create };
})();
