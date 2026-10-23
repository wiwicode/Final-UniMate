(function () {
  function setStatus(id, message, tone = '') {
    const element = document.getElementById(id);
    if (!element) return;
    element.textContent = message;
    element.className = `status-message ${tone}`.trim();
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.append(toast);
    setTimeout(() => toast.remove(), 3600);
  }

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[character]));
  }

  function updateProfileLinks() {
    const user = window.UniMateAuth?.getUser();
    document.querySelectorAll('[data-profile-link]').forEach(link => {
      if (!user?.photoURL) return;
      link.classList.add('has-avatar');
      link.innerHTML = `<img src="${user.photoURL}" alt="Profile">`;
    });
    const greeting = document.getElementById('home-greeting');
    if (greeting && user?.name) greeting.textContent = `Hello, ${user.name.split(' ')[0]}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateProfileLinks();
    document.getElementById('google-sign-in')?.addEventListener('click', () => window.UniMateAuth.signIn());
    setTimeout(() => window.UniMateAuth?.initializeGoogle(), 400);
  });
  window.addEventListener('unimate:auth-changed', updateProfileLinks);

  window.UniMateApp = { setStatus, showToast, updateProfileLinks, escapeHTML };
})();
