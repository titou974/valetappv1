import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export async function handleTicketClient({ queryKey }) {
  const [_, ticketId] = queryKey;
  const { data } = await axios.get(`/api/ticket/${ticketId}`);
  return data;
}

export default function useTicketClient({ ticketId }) {
  return useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: handleTicketClient,
  });
}
