import { motion } from 'framer-motion';
import styles from '@/app/components/style';

export default function FooterBarLayout({
  children,
  isVisible = true,
  fixed = true,
}) {
  return (
    isVisible && (
      <motion.div
        className={`mx-auto max-w-screen-sm ${fixed ? `${styles.padding} fixed bottom-4 left-1 right-1 z-50` : ''} flex min-h-fit w-full flex-col items-center justify-center gap-8`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {children}
      </motion.div>
    )
  );
}
