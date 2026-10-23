(function () {
  async function listJoinedActivityChats() {
    const profile = await window.UniMateServices.users?.getCurrentUniversityProfile();
    if (!profile || !window.UniMateFirebase.connected) return [];
    // Query only the user's joined activity chats with universityId == profile.universityId.
    return window.UniMateFirebase.queryJoinedActivityChats?.({ universityId: profile.universityId }) || [];
  }

  window.UniMateServices = window.UniMateServices || {};
  window.UniMateServices.chats = { listJoinedActivityChats };
})();
