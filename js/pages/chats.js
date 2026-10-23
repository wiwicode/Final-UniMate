(async function () {
  const container = document.getElementById('chat-list');
  const chats = await window.UniMateServices.chats.listJoinedActivityChats();
  if (!chats.length) return;
  const escape = window.UniMateApp.escapeHTML;
  container.classList.remove('empty-state', 'chat-empty');
  container.innerHTML = `<div class="form-card"><h2 style="margin:0 0 12px;font:700 19px var(--display)">Your activity chats</h2>${chats.map(chat => `<a class="activity-card" href="activity.html?id=${encodeURIComponent(chat.activityId)}"><h3>${escape(chat.activityTitle)}</h3><span class="activity-meta">Activity group chat</span></a>`).join('')}</div>`;
})();
