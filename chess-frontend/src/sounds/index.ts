export const playNotification = () => {
  const audio = new Audio("../../public/sounds/notification.wav");
  audio.play();
};
