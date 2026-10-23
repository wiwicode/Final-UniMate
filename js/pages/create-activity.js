document.getElementById('activity-form')?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = new FormData(form);
  const activity = Object.fromEntries(fields.entries());

  try {
    await window.UniMateServices.activities.create(activity);
    window.UniMateApp.setStatus('activity-status', 'Activity posted.', 'success');
    form.reset();
  } catch (error) {
    window.UniMateApp.setStatus('activity-status', error.message, 'error');
  }
});
