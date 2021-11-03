export function buttonLoader(isLoading, popup, loadingText, originalText) {
  const button = popup.querySelector('.popup__save');
  if(isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = originalText;
  }
}
