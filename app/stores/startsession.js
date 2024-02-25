import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export async function startSession({ queryKey }) {
    const [_, sessionId] = queryKey
    const { data } = await axios.get(`/api/session/${sessionId}`)
    return data
}

export default function useSessionStart({ sessionId }) {
    return useQuery({

    })
}