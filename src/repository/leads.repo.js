import axios from "axios";

export class LeadsRepo {

    static async sendLeads(data) {
        return (
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}lead`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        );
    }
}
