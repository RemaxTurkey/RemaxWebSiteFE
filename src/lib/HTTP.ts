import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://67c955c10acf98d07089cef1.mockapi.io",
    timeout: 12000
})

const executeHttpRequest = async <T>(method: "GET" | "POST" | "PUT" | "DELETE", url: string, data: object = {}) => {

    let response = null;
    try {
        if (method === "GET") {
            response = await axiosInstance.get<T>(url, { params: data });
        }

        if (method === "POST") {
            response = await axiosInstance.post<T>(url, data);
        }

        if (method === "PUT") {
            response = await axiosInstance.put<T>(url, data);
        }

        if (method === "DELETE") {
            response = await axiosInstance.delete<T>(url);
        }
    } catch (error: any) {
        response = error?.response;
    }

    return response;
}

export const Http = {
    get: <T>(url: string, data: object = {}) => executeHttpRequest<T>("GET", url, data),
    post: <T>(url: string, data: object = {}) => executeHttpRequest<T>("POST", url, data),
    put: <T>(url: string, data: object = {}) => executeHttpRequest<T>("PUT", url, data),
    delete: <T>(url: string, data: object = {}) => executeHttpRequest<T>("DELETE", url, data),
}