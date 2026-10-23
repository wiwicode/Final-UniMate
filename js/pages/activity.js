(async function () {
  const target = document.getElementById('activity-detail');
  const id = new URLSearchParams(location.search).get('id');
  const activity = await window.UniMateServices.activities.getById(id);

  if (!activity) {
    target.innerHTML = `<div class="empty-state"><div class="empty-icon">□</div><h2>Activity not found</h2><p>This activity may have been removed, or activity data is not available yet.</p><a class="primary-button" href="home.html">Back to activities</a></div>`;
    return;
  }

  const escape = window.UniMateApp.escapeHTML;
  target.innerHTML = `<span class="activity-category">${escape(activity.category)}</span><h2>${escape(activity.title)}</h2><dl class="detail-list"><div><dt>Date</dt><dd>${escape(activity.date)}</dd></div><div><dt>Time</dt><dd>${escape(activity.time)}</dd></div>${activity.place ? `<div><dt>Place</dt><dd>${escape(activity.place)}</dd></div>` : ''}<div><dt>Host</dt><dd>${escape(activity.hostName || 'Not available')}</dd></div></dl><h3>About this activity</h3><p class="description">${escape(activity.description)}</p><h3>Participants</h3><p class="participant-empty">${activity.participantCount ? `${activity.participantCount} participant${activity.participantCount === 1 ? '' : 's'}` : 'Be the first to join.'}</p><button class="primary-button" id="join-activity">Join activity</button><p class="status-message" id="join-status"></p>`;

  document.getElementById('join-activity').addEventListener('click', async () => {
    try {
      await window.UniMateServices.activities.join(id);
      window.UniMateApp.setStatus('join-status', 'Chat unlocked. You can now open the activity group chat.', 'success');
    } catch (error) {
      window.UniMateApp.setStatus('join-status', error.message, 'error');
    }
  });
})();
