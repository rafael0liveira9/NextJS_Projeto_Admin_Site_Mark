import axios from "axios";

export class PackagesRepo {
  static async getAllPackages(userToken) {
    return (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}packages`)).data;
  }
}
