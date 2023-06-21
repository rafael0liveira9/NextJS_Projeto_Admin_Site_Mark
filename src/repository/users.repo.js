import axios from "axios";

export class UsersRepo {
  static async getAllUsers(token) {
    return (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user/all`)).data;
  }
}
