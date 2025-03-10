"use server"

import { fetcher } from "@/lib/fetcher";

//NOTE: bu class server tarafinda kullanilir. isteklerimizin yapildigi yer. daha duzenli olmasi icin belki trpc kullanilabilir.
class RemaxService {
    static instance: RemaxService | null = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new RemaxService();
        }
        return this.instance;
    }

    async getExample(id: number) {
        const response: {
            id: number;
            createdAt: Date;
            name: string;
            avatar: string
        } = await fetcher(`/FirstExample/${id}`);

        return response;
    }
}

export default RemaxService;