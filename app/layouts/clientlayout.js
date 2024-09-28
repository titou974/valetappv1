import styles from '@/app/components/style';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/footer';

export default function ClientLayout({ children }) {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <div
        className={`${styles.padding} relative mx-auto flex min-h-screen max-w-screen-sm flex-col justify-between gap-10`}
      >
        {children}
      </div>
    </div>
  );
}
