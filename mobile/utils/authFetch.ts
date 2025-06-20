
export const authFetch = async (url: string, token: string, options: RequestInit = {}) => {

    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    const fetchOptions: RequestInit = {
        ...options,
        headers,
    };

    return fetch(url, fetchOptions);
};
