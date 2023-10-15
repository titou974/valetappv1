import styles from "../../components/style";

const Loading = () => {

  return (
    <div className="w-full h-screen bg-secondary">
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        <div>
          <div className="animate-pulse bg-gray-400/50 rounded-md mb-3" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}>
            <h3 className={`${styles.subText} invisible`}>Bonjour</h3>
          </div>
          <div className="animate-pulse bg-gray-400/50 rounded-md" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}>
            <h2 className={`${styles.headText} invisible `}>Prêt, à travailler ?</h2>
          </div>
        </div>
        <div className="animate-pulse bg-gray-400/50 rounded-md" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}>
          <p className={`invisible`}>Votre voiture vas être prise en charge...</p>
        </div>
        <div className="mb-20">
          <div className="w-full animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${4 * 0.05}s`, animationDuration: "1s"}}>
            <p className="font-semibold text-[26px] invisible">Créer votre ticket</p>
            <div className="w-[26px] invisible">
              <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading;
