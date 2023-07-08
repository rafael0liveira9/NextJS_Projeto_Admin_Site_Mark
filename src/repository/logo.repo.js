import axios from "axios";

export class LogoRepo {
  static async sendProof(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}logo/to-proof`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async updateProof(data, token) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}logo/to-proof`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async sendArchives(data, token) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}logo/send-archives`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
