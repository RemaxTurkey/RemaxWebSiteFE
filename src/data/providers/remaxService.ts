"use server"
//NOTE: bu class server tarafinda kullanilir. isteklerimizin yapildigi yer. daha duzenli olmasi icin belki trpc kullanilabilir.
import { Http } from "@/lib/HTTP";
import { AxiosResponse } from "axios";
class RemaxService {
    static instance: RemaxService | null = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new RemaxService();
        }
        return this.instance;
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