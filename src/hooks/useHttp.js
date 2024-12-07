import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
    //wrap fetch()
    const response = await fetch(url, config);

    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || "Request failed!");
    }
    return resData;
};
const useHttp = (url, config, initData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initData);
    const [error, setError] = useState(null);

    const clearData = () => {
        setData(initData);
    };
    const sendRequest = useCallback(
        async function sendRequest(data) {
            setIsLoading(true);
            try {
                const resData = await sendHttpRequest(url, {
                    ...config,
                    body: data,
                });
                setData(resData);
            } catch (error) {
                setError(error.message || "Something went wrong!");
            }
            setIsLoading(false);
        },
        [url, config],
    );

    useEffect(() => {
        if (
            (config && (config.method === "GET" || !config.method)) ||
            !config
        ) {
            sendRequest();
        }
    }, [sendRequest, config]);
    return { data, isLoading, error, sendRequest, clearData };
};

export default useHttp;
