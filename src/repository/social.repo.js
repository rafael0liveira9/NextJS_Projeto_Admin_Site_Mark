import axios from "axios";

export class SocialRepo {
  static async toPlan(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}social/to-plan`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async toCreate(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}social/to-create`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  static async toPendingPublish(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}social/to-pending-publish`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  static async toPublish(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}social/to-publish`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

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

  static async updateApprove(data, token) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}social/update-approve`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
