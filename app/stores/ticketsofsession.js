import axios from "axios"
import { useQuery } from '@tanstack/react-query'

export async function getTicketsOfSession({ queryKey }) {
    const [_, siteId, startedAt] = queryKey
    const { data } = await axios.get(`/api/ticketsforvalet`,
    { params: { restaurantId: siteId, startDate: startedAt } }
    )
    return data
}

export default function useTicketsOfSession({ siteId, startedAt }) {
    return useQuery({
        queryKey: ['tickets', siteId, startedAt],
        queryFn: getTicketsOfSession,
        enabled: !!startedAt && !!siteId,
        manual: true
    })
}