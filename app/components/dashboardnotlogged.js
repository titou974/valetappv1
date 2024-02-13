import Link from "next/link";
import styles from "./style";

const DashboardNotLogged = () => {
    return (
        <div className={`bg-black h-screen w-full text-white`}>
            <div className={`${styles.padding} flex flex-col justify-between h-full`}>
                <div>
                <h2 className={`${styles.subText}`}>Pour débuter,</h2>
                <h2 className={`${styles.headText}`}>Connectez-vous</h2>
                </div>
                <div>
                    <Link href="/sign-in">
                    <button className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors mb-10">
                        <p className="text-black font-semibold text-[32px]">Se Connecter</p>
                        <div className="w-[26px] text-black">
                        <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        </div>
                    </button>
                    </Link>
                </div>
                <div className="text-center">
                <p className="text-white">Nestor App 🇫🇷</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardNotLogged;