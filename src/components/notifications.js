import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showNotification = (title, message, type = 'success') => {
  switch (type) {
    case 'success':
      toast.success(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case 'error':
      toast.error(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    case 'info':
      toast.info(message, { position: toast.POSITION.TOP_RIGHT });
      break;
    default:
      toast(message, { position: toast.POSITION.TOP_RIGHT });
  }
};
