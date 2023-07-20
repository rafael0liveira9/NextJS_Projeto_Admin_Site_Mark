import axios from "axios";

export class SocialRepo {
  static async sendShow(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}social/to-show`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async sendApprove(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}social/to-approve`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async updateShow(data, token) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}social/update-show`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
