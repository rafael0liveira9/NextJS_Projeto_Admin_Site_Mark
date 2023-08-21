import axios from "axios";

export class SiteRepo {
  static async toPlan(serviceId, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}site/to-plan`,
      {
        id: serviceId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async sendLayout(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}site/to-layout`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async sendLayoutFinished(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}site/to-layout-finished`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  static async setServicePublished(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}site/publish-layout`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
