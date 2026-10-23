(async function () {
  const list = document.getElementById('activity-list');
  let category = 'all';

  function renderEmpty() {
    list.innerHTML = `<section class="page-card empty-state"><div class="empty-icon">＋</div><h2>No activities yet</h2><p>Be the first student to create one.</p><a class="primary-button" href="create-activity.html">Create activity</a></section>`;
  }

  function renderActivities(activities) {
    const visible = category === 'all' ? activities : activities.filter(activity => activity.category === category);
    if (!visible.length) return renderEmpty();
    const escape = window.UniMateApp.escapeHTML;
    list.innerHTML = visible.map(activity => `<a class="page-card activity-card" href="activity.html?id=${encodeURIComponent(activity.id)}"><span class="activity-category">${escape(activity.category)}</span><h3>${escape(activity.title)}</h3><span class="activity-meta">${escape(activity.date)} · ${escape(activity.time)}${activity.place ? ` · ${escape(activity.place)}` : ''}</span><p class="activity-description">${escape(activity.description)}</p></a>`).join('');
  }

  document.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    document.querySelectorAll('[data-category]').forEach(item => item.classList.toggle('active', item === button));
    window.UniMateServices.activities.list().then(renderActivities);
  }));

  renderActivities(await window.UniMateServices.activities.list());
})();
