import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export async function patchTicket({ queryKey }) {
    const [_, ticketId] = queryKey
    const { data } = await axios.patch(`/api/ticket/${ticketId}`)
    return data
}


export default function usePatchTicket() { 
    return useQuery({
        queryKey: ['patchticket', ticketId],
        queryFn: patchTicket,
    })
}