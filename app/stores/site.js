import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation";
import axios from "axios";

export async function fetchSite({ queryKey }) {
    const [_, site] = queryKey
    const { data } = await axios.get(`/api/site/${site}`)
    return data
  }


export default function useSite() {
  const searchParams = useSearchParams();
  const site = searchParams.get("site");
  return useQuery({
    queryKey: ['site', site],
    queryFn: fetchSite,
  })
}