import styles from "../components/style";
import Link from "next/link";
import Input from "../components/inputvalet";


const Register = () => {
  return (
    <div className="w-full h-screen bg-black">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div>
          <h3 className={styles.subText}>Remplissez</h3>
          <h2 className={styles.headText}>vos Informations</h2>
        </div>
        <div className="w-full">
          <Input placeholder="Prénom" />
          <Input placeholder="Numéro" />
        </div>
        <Link href="/" className="mb-10">
          <button className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
            <p className="text-black font-semibold text-[32px]">Commencer</p>
            <div className="w-[26px]">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Register;
