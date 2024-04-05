import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export async function handleCheckToken({ queryKey }) {
    const [_, resetToken] = queryKey
    const { data } = await axios.get(`/api/forget/${resetToken}`)
    return data
}

export default function useCheckToken() {
    const searchParams = useSearchParams();
    const resetToken = searchParams.get("t")
    return useQuery({
        queryKey: ['resetToken', resetToken],
        queryFn: handleCheckToken,
    })
}