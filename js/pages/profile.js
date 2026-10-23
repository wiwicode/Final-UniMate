(async function () {
  const target = document.getElementById('profile-content');
  const profile = await window.UniMateServices.users.getCurrentProfile();
  const authUser = window.UniMateAuth.getUser();

  if (!profile && !authUser) {
    target.innerHTML = `<div class="empty-state"><div class="empty-icon">◎</div><h2>Your profile is waiting</h2><p>Sign in with your university account to view and manage your profile.</p><a class="primary-button" href="index.html">Sign in</a></div>`;
    return;
  }

  const user = profile || authUser;
  const escape = window.UniMateApp.escapeHTML;
  target.innerHTML = `<div class="profile-heading">${user.photoURL ? `<img class="profile-placeholder" src="${escape(user.photoURL)}" alt="Profile photo">` : '<div class="profile-placeholder">◎</div>'}<div><h2>${escape(user.name || 'Profile')}</h2><p>Your account information</p></div></div><dl class="profile-fields"><div><dt>Name</dt><dd>${escape(user.name || 'Not added yet')}</dd></div><div><dt>Course</dt><dd>${escape(user.course || 'Not added yet')}</dd></div><div><dt>Year</dt><dd>${escape(user.year || 'Not added yet')}</dd></div><div><dt>Bio</dt><dd>${escape(user.bio || 'Not added yet')}</dd></div><div><dt>Interests</dt><dd>${escape(user.interests?.length ? user.interests.join(', ') : 'Not added yet')}</dd></div></dl>`;
})();
