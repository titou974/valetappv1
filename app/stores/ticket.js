import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import createTicket from "./createticket";

export async function handleCheckSite({ queryKey }) {
    const [_, siteId, router] = queryKey;
    console.log(router, "router")
    const { data } = await axios.get(`/api/site/${siteId}`)
    if (!data || Object.keys(data).length === 0) {
        return data;
    } else {
        const ticketCreationResult = await createTicket({ router, siteId, companyId: data.companyId });
        return { ticketCreationResult, name: data.name };
    }
}

export default function useTicket({ router }) {
    const searchParams = useSearchParams();
    const siteId = searchParams.get("site");
    return useQuery({
        queryKey: ["checksite", siteId, router],
        queryFn: handleCheckSite,
    })
}