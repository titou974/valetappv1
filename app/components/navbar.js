import styles from "./style";
import { Skeleton } from "@nextui-org/react";

const Navbar = ({ subtitle, title, isLoading }) => {
    return (
        isLoading ? (
            <div className='sticky min-h-40 top-0 left-0 right-0 gradientTop w-full z-50 pt-10 pb-4'>
                <Skeleton className="rounded-lg">
                    <h3 className={`${styles.subText}`}>Vous avez</h3>
                    <h2 className={`${styles.headText}`}>0 ticket</h2>
                </Skeleton>
            </div>
        ) : (
            <div className={`sticky min-h-40 top-0 left-0 right-0 gradientTop w-full z-50 pt-10 pb-4`}>
                <h3 className={`${styles.subText}`}>{ subtitle }</h3>
                <h2 className={`${styles.headText}`}>{ title }</h2>
            </div>
        )
    )
}

export default Navbar