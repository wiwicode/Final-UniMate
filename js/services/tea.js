(function () {
  async function getScope() {
    return window.UniMateServices.users?.getCurrentUniversityProfile() || null;
  }

  async function list() {
    const profile = await getScope();
    if (!profile || !window.UniMateFirebase.connected) return [];
    // Query Tea posts with universityId == profile.universityId; never expose authorId in public fields.
    return window.UniMateFirebase.queryTea?.({ universityId: profile.universityId }) || [];
  }

  async function create(post) {
    const profile = await getScope();
    if (!profile) throw new Error('Complete your profile and select a university before posting Campus Tea.');
    if (!window.UniMateFirebase.connected) throw new Error('Campus Tea posting is not connected yet.');
    const payload = { ...post, universityId: profile.universityId, anonymous: true };
    // Save authorId internally; query and render only Anonymous publicly.
    return window.UniMateFirebase.createTea?.(payload) || payload;
  }

  async function report(postId) {
    if (!window.UniMateFirebase.connected) throw new Error('Reporting is not connected yet.');
    return postId;
  }

  async function deleteMine(postId) {
    if (!window.UniMateFirebase.connected) throw new Error('Post deletion is not connected yet.');
    return postId;
  }

  window.UniMateServices = window.UniMateServices || {};
  window.UniMateServices.tea = { list, create, report, deleteMine };
})();
