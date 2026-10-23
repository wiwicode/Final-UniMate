(async function () {
  const list = document.getElementById('tea-list');
  const modal = document.getElementById('tea-modal');
  const posts = await window.UniMateServices.tea.list();

  const escape = window.UniMateApp.escapeHTML;
  if (!posts.length) {
    list.innerHTML = `<section class="page-card empty-state"><div class="empty-icon">☕</div><h2>No tea yet ☕</h2><p>Be the first to spill.</p><button class="primary-button" data-open-tea>Spill the tea</button></section>`;
  } else {
    list.innerHTML = posts.map(post => `<article class="page-card form-card" style="margin-bottom:12px"><p class="eyebrow">Anonymous${post.createdAt ? ` · ${escape(post.createdAt)}` : ''}</p><p style="margin:0;white-space:pre-wrap">${escape(post.text)}</p><div style="display:flex;gap:10px;margin-top:14px"><button class="secondary-button" data-report="${escape(post.id)}">Report</button>${post.isMine ? `<button class="danger-button" data-delete="${escape(post.id)}">Delete my post</button>` : ''}</div></article>`).join('');
  }

  function openModal() { modal.hidden = false; }
  function closeModal() { modal.hidden = true; }
  document.getElementById('open-tea-form').addEventListener('click', openModal);
  list.addEventListener('click', event => { if (event.target.closest('[data-open-tea]')) openModal(); });
  list.addEventListener('click', async event => {
    const report = event.target.closest('[data-report]');
    const remove = event.target.closest('[data-delete]');
    try {
      if (report) await window.UniMateServices.tea.report(report.dataset.report);
      if (remove) await window.UniMateServices.tea.deleteMine(remove.dataset.delete);
      if (report || remove) window.UniMateApp.showToast(report ? 'Post reported.' : 'Your post was deleted.');
    } catch (error) {
      window.UniMateApp.showToast(error.message);
    }
  });
  modal.querySelector('.modal-close').addEventListener('click', closeModal);

  document.getElementById('tea-form').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    const text = new FormData(form).get('text').trim();
    try {
      await window.UniMateServices.tea.create({ text, anonymous: true });
      window.UniMateApp.setStatus('tea-status', 'Your post is live as Anonymous.', 'success');
      form.reset();
    } catch (error) {
      window.UniMateApp.setStatus('tea-status', error.message, 'error');
    }
  });
})();
