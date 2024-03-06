import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import createTicket from "./createticket";

export async function handleCheckSite({ queryKey }) {
    const [_, siteId, router] = queryKey;
    const { data } = await axios.get(`/api/site/${siteId}`)
    if (!data || Object.keys(data).length === 0) {
        return data;
    } else {
        const ticketCreationResult = await createTicket({ router, siteId, companyId: data.companyId });
        return { ticketCreationResult, name: data.name };
    }
}

export default function useTicket({ siteId, router }) {
    return useQuery({
        queryKey: ["checksite", siteId, router],
        queryFn: handleCheckSite,
    })
}