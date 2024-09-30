import styles from '@/app/components/style';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/footer';

export default function VoiturierLayout({ children, justify = 'between' }) {
  return (
    <div className='min-h-screen bg-background text-foreground dark'>
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
        className={`${styles.padding} flex flex-col justify-${justify} relative mx-auto min-h-screen max-w-screen-sm`}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}
