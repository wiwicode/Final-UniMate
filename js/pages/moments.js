(async function () {
  const list = document.getElementById('moments-list');
  const moments = await window.UniMateServices.moments.list();

  if (!moments.length) {
    list.innerHTML = `<section class="page-card empty-state"><div class="empty-icon">◈</div><h2>No moments yet</h2><p>Share something from campus.</p></section>`;
  } else {
    const escape = window.UniMateApp.escapeHTML;
    list.innerHTML = moments.map(moment => `<article class="page-card form-card" style="margin-bottom:14px">${moment.authorName ? `<p class="eyebrow">${escape(moment.authorName)}</p>` : ''}<p style="margin:0;white-space:pre-wrap">${escape(moment.caption)}</p>${moment.imageURL ? `<img src="${escape(moment.imageURL)}" alt="Moment image" style="width:100%;margin-top:14px;border-radius:var(--radius-sm)">` : ''}</article>`).join('');
  }

  document.getElementById('moment-form')?.addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const caption = new FormData(form).get('caption').trim();
    if (!caption) return window.UniMateApp.setStatus('moment-status', 'Add a caption before posting.', 'error');
    try {
      await window.UniMateServices.moments.create({ caption });
      window.UniMateApp.setStatus('moment-status', 'Moment posted.', 'success');
      form.reset();
    } catch (error) {
      window.UniMateApp.setStatus('moment-status', error.message, 'error');
    }
  });
})();
