import { useQuery } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import axios from "axios";

export async function redirectToDashboardIfLogged({ queryKey }) {
  const [_, router] = queryKey
  const { data } = await axios.get('/api/session')
  if (data?.authenticated) {
    router.push('/dashboard')
  }
  return data
}

export default function useSessionRedirection() {
  const router = useRouter()
  return useQuery({
    queryKey: ['session', router],
    queryFn: redirectToDashboardIfLogged,
  })
}