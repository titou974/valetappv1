import styles from "@/app/components/style";
import { ToastContainer } from 'react-toastify';
import Footer from "../components/footer";

export default function VoiturierLayout({ children }) {
    return (
        <div className="dark bg-background text-foreground min-h-screen">
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
            <div className={`${styles.padding} flex flex-col justify-between min-h-screen max-w-screen-sm mx-auto relative`}>
                {children}
            </div>
            <Footer />
        </div>
    )
}