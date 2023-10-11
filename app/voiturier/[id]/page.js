import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import axios from 'axios';

const getUser = async (id) => {
  let userData = {};
  try {
    const response = await axios.get(`http://localhost:3000/api/voiturier/${id}`)
    userData = response.data;
    console.log(userData);
  } catch (error) {
    console.log('Error fetching user:', error);
  }
  return userData;
}

const VoiturierShow = async ({ params }) => {
  const user = await getUser(params.id)
  return (
    <div>
      <h2>Bon courage {user.name}</h2>
    </div>
  )
}

export default VoiturierShow;
