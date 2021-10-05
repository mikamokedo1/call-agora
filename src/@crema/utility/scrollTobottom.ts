export function scrollToLastMessage(smooth = true, delayTime = 100, div: string) {
  setTimeout(() => {
    const currentChat = document.querySelector(`#${div}`);
    if (currentChat && currentChat.lastElementChild && currentChat.lastElementChild.scrollIntoView) {
      currentChat.lastElementChild.scrollIntoView(smooth ? { behavior: 'smooth' } : undefined);
    }
  }, delayTime);
}
