import axios from "axios";

export class ServicesRepo {
  static async getAllServices(userToken) {
    return (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}service`)).data;
  }
}
