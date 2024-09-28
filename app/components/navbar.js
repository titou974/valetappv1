import styles from './style';
import { Skeleton } from '@nextui-org/react';

const Navbar = ({
  subtitle,
  title,
  isLoading,
  transparent,
  position = 'sticky',
}) => {
  return isLoading ? (
    <div
      className={`${position} ${transparent ? 'bg-transparent' : 'bg-gradient-to-b from-background from-60% to-transparent'} min-h-40 left-0 right-0 top-0 z-50 w-full pb-4 pt-10`}
    >
      <Skeleton className='rounded-lg'>
        <h3 className={`${styles.subText}`}>Vous avez</h3>
        <h2 className={`${styles.headText}`}>0 ticket</h2>
      </Skeleton>
    </div>
  ) : (
    <div
      className={`${position} ${transparent ? 'bg-transparent' : 'bg-gradient-to-b from-background from-60% to-transparent'} min-h-40 left-0 right-0 top-0 z-50 w-full pb-4 pt-10`}
    >
      <h3 className={`${styles.subText}`}>{subtitle}</h3>
      <h2 className={`${styles.headText}`}>{title}</h2>
    </div>
  );
};

export default Navbar;
