import axios from "axios";

export class ServicesRepo {
  static async getAllServices(userToken) {
    return (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}service`)).data;
  }
  static async sendService(data, token) {
    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}service`, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  static async contratedServices(token) {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}contratedServices/all`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async contratedServicesById(token, id) {
    return await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}contratedServices/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async logoServiceById(token, id) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}logo/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}
