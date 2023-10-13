import { authOptions } from '@/lib/auth';
import axios from 'axios';
import { AuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';

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

const VoiturierShow = async ({ params }) => {
  const session = await getServerSession(authOptions)
  console.log(session);
  return (
    <div>
      <h2>Bon courage {session.user.name}</h2>
    </div>
  )
}

export default VoiturierShow;
