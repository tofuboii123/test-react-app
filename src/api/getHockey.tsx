import { useQuery } from "@tanstack/react-query"
import { BASE_URL, CLIENT_CODE, CLIENT_KEY } from "./constants"
import { BootstrapResponse } from "./models/hockeyModels";
import fetch from "cross-fetch";

const getRequestWithKeys = (url: URL): URL => {
    url.searchParams.append("key", CLIENT_KEY);
    url.searchParams.append("client_code", CLIENT_CODE);
    return url;
}

export const useGetHockey = () => {
    const url = getRequestWithKeys(new URL(BASE_URL));
    url.searchParams.append("feed", "statviewfeed");
    url.searchParams.append("view", "bootstrap");
    return useQuery({
        queryKey: ['getHockey'],
        queryFn: async () => {
            const response = await fetch(url.toString());
            const responseTxt = await response.text();

            const bootstrapResponse = JSON.parse(responseTxt.substring(1, responseTxt.length - 1)) as BootstrapResponse;
            return bootstrapResponse;
        },
    })
}