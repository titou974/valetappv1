import styles from "@/app/components/style";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/footer";


export default function ClientLayout({ children }) {
    return (
        <div className="bg-background text-foreground min-h-screen">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className={`${styles.padding} flex flex-col justify-between min-h-screen max-w-screen-sm mx-auto relative gap-10`}>
                {children}
            </div>
        </div>
        )
  }
  