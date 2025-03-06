"use server"

import { Http } from "@/lib/HTTP";
import { AxiosResponse } from "axios";
class RemaxService {
    static instance: RemaxService | null = null;

    static getInstance() {
        if (!RemaxService.instance) {
            RemaxService.instance = new RemaxService();
        }
        return RemaxService.instance;
    }

    async getExample() {
        const response: AxiosResponse<{
            id: number;
            createdAt: Date;
            name: string;
            avatar: string
        }> = await Http.get("/FirstExample");

        return response.data;
    }
}

export default RemaxService;