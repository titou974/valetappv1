import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import styles from '@/app/components/style';
import UserAccountNav from '@/app/components/useraccountnav';
import TimeCounter from '@/app/components/timecounter';

const VoiturierShow = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const startingHour = new Date(session.user.startingHourSession)
  const startingHourFormat = startingHour.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', 'h')
  return (
    <div className='bg-black h-screen w-full text-white'>
      <div className={`${styles.padding} flex flex-col justify-between h-full`}>
        {session?.user ? (
          <div>
            <h2 className={`${styles.subText}`}>Bon courage,</h2>
            <h2 className={`${styles.headText}`}>{session.user.name} 🚗</h2>
          </div>
        ) : (
          <div>
            <h2 className={`${styles.subText}`}>Pour débuter,</h2>
            <h2 className={`${styles.headText}`}>Connectez-vous</h2>
          </div>
        )}
        {session?.user && (
          <div className={styles.subText}>
            <h3 className='text-[40px] text-center py-4 font-semibold'><TimeCounter startingHour={startingHour}/></h3>
            <div>
              <p className='text-center py-2'>Vous avez commencé à {startingHourFormat}</p>
              <p className='text-center py-2'>Vous êtes au <span className='italic'>{session.user.siteName}</span></p>
            </div>
          </div>
        )}
        <div>
        {
          session?.user ? (
            <div>
              <UserAccountNav sessionId={session.user.sessionId} />
            </div>
          ) : (
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
          )
        }
        </div>
        <div className="text-center">
          <p className="text-white">Nestor App 🇫🇷</p>
        </div>
      </div>
    </div>
  )
}

export default VoiturierShow;
