import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export async function handleCompany({ queryKey }) {
    const [_, companyId] = queryKey;
    const { data } = await axios.get(`/api/company/${companyId}`)
    return data;
}

export default function useCompany({ companyId }) {
    return useQuery({
        queryKey: ["company", companyId],
        queryFn: handleCompany,
    })
}