import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import styles from '../components/style';
import UserAccountNav from '../components/useraccountnav';

// const getUser = async (id) => {
//   let userData = {};
//   try {
//     const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//     const response = await axios.get(`${apiUrl}/api/voiturier/${id}`)
//     userData = response.data;
//     console.log(userData);
//   } catch (error) {
//     console.log('Error fetching user:', error.message);
//   }
//   return userData;
// }

const VoiturierShow = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
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
        <div>
        {
          session?.user ? (
            <div className='mb-10'>
              <UserAccountNav />
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
      </div>
    </div>
  )
}

export default VoiturierShow;
