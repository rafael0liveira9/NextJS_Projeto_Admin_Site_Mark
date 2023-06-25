import axios from "axios";

export class PackagesRepo {
  static async getAllPackages(userToken) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}package/all`, {
      headers: {
        Authorization: userToken,
      },
    });
  }

  static async sendPackage(data, token) {
    return (
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}package`, data, {
        headers: {
          Authorization: token,
        },
      })
    ).data;
  }
}
