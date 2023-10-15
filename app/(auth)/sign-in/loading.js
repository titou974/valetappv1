import styles from "@/app/components/style";

const Loading = () => {
  return (
    <div className="w-full h-screen bg-black">
    <div className={`${styles.padding} flex flex-col justify-between h-full`}>
      <div>
        <div className="animate-pulse bg-gray-400/50 rounded-md mb-3" style={{ animationDelay: `${1 * 0.05}s`, animationDuration: "1s"}}>
          <h3 className={`${styles.subText} invisible`}>Bonjour</h3>
        </div>
        <div className="animate-pulse bg-gray-400/50 rounded-md" style={{ animationDelay: `${2 * 0.05}s`, animationDuration: "1s"}}>
          <h2 className={`${styles.headText} invisible `}>Prêt, à travailler ?</h2>
        </div>
      </div>
      <div className="w-full relative flex flex-col justify-center gap-10">
        <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${3 * 0.05}s`, animationDuration: "1s"}}>
          <p className="text-[20px] px-[12px] py-[20px] invisible">Lorem ipsum dolor</p>
        </div>
        <div className="animate-pulse bg-gray-400/50 rounded-full" style={{ animationDelay: `${4 * 0.05}s`, animationDuration: "1s"}}>
          <p className="text-[20px] px-[12px] py-[20px] invisible">Lorem ipsum dolor</p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-5">
        <button className="bg-primary w-full py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white transition-colors">
          <p className="text-black font-semibold text-[32px]">Se Connecter</p>
          <div className="w-[26px]">
            <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </button>
        <button className="mx-auto w-2/3 py-[12px] rounded-full font-bold hover:bg-primary transition-colors flex justify-center items-center gap-2 text-primary hover:text-black">
          <p>Créer mon compte</p>
          <div className="w-[20px]">
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
  )
}

export default Loading;
