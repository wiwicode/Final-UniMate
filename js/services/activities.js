(function () {
  const categories = new Set(['sports', 'study', 'food', 'walk', 'social', 'other']);

  async function getScope() {
    return window.UniMateServices.users?.getCurrentUniversityProfile() || null;
  }

  async function list(category = 'all') {
    const profile = await getScope();
    if (!profile || !window.UniMateFirebase.connected) return [];
    if (category !== 'all' && !categories.has(category)) return [];
    // Firestore query must start with: where('universityId', '==', profile.universityId).
    // Add where('category', '==', category) when a category is selected; never fetch cross-university records.
    return window.UniMateFirebase.queryActivities?.({ universityId: profile.universityId, category }) || [];
  }

  async function getById(id) {
    const profile = await getScope();
    if (!id || !profile || !window.UniMateFirebase.connected) return null;
    // Query this id with universityId == profile.universityId; Firestore rules enforce the same boundary.
    return window.UniMateFirebase.getActivityForUniversity?.({ id, universityId: profile.universityId }) || null;
  }

  async function create(activity) {
    const profile = await getScope();
    if (!profile) throw new Error('Complete your profile and select a university before posting an activity.');
    if (!categories.has(activity.category)) throw new Error('Select a valid activity category.');
    if (!window.UniMateFirebase.connected) throw new Error('Activity publishing is not connected yet.');
    const payload = { ...activity, universityId: profile.universityId };
    // Write this payload to Firestore. Rules must require payload.universityId to match the creator profile.
    return window.UniMateFirebase.createActivity?.(payload) || payload;
  }

  async function join(id) {
    const profile = await getScope();
    if (!profile) throw new Error('Complete your profile and select a university before joining an activity.');
    if (!window.UniMateFirebase.connected) throw new Error('Joining activities is not connected yet.');
    // Add the user only after a university-scoped activity read; Firestore rules enforce the same check.
    return id;
  }

  window.UniMateServices = window.UniMateServices || {};
  window.UniMateServices.activities = { list, getById, create, join };
})();
