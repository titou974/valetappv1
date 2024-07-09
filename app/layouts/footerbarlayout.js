import { motion } from "framer-motion"
import styles from "@/app/components/style";

export default function FooterBarLayout({ children, isVisible = true, fixed = true }) {
    return (
        isVisible && (
            <motion.div
                className={`mx-auto max-w-screen-sm ${fixed ? `${styles.padding} fixed left-1 right-1 bottom-4 z-50` : ''} w-full flex flex-col justify-center items-center gap-5 min-h-fit`}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
            >
                {children}
            </motion.div>
        )
    )
}