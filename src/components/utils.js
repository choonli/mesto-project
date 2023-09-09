export function renderLoading(isLoading, button, initialText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading === true) {
    button.textContent = loadingText;
  } else {
    button.textContent = initialText;
  }
}

export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  const initialText = submitBtn.textContent;

  renderLoading(true, submitBtn, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
    .finally(() => {
      renderLoading(false, submitBtn, initialText);
    });
}