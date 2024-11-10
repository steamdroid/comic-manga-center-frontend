import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const showError = (nativeError, message) => {
  console.error(nativeError);
  Notify.failure(message);
};
