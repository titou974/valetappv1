import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import axios from 'axios';

const getTicket = async (id) => {
  let ticketData = {};
  try {
    const response = await axios.get(`/api/ticket/${id}`);
    ticketData = response.data;
    console.log(ticketData);
  } catch (error) {
    console.error('Error fetching ticket data:', error);
  }

  return ticketData;
}

const TicketShow = async ({ params }) => {
  const ticket = await getTicket(params.id)
  return (
    <div>
      <p>Votre ticket est généré</p>
      <p className='text-black'>Bienvenue au {ticket.restaurant.name}</p>
      <p>{ticket.scannedAt}</p>
    </div>
  )
}

export default TicketShow;
