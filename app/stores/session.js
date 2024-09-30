import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export async function getSession({ queryKey }) {
  const [_, sessionId] = queryKey;
  const { data } = await axios.get(`/api/session/${sessionId}`);
  return data;
}

export default function useSession({ sessionId }) {
  return useQuery({
    queryKey: ['session', sessionId],
    queryFn: getSession,
  });
}
