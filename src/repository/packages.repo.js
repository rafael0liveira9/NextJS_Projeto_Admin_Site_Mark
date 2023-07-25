import axios from "axios";

export class PackagesRepo {
  static async getAllPackages(userToken) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}package/all`, {
      headers: {
        Authorization: userToken,
      },
    });
  }

  static async getPackagesBySearch({ packageChose }) {
    let pack;

    const data = {
      value: packageChose.sliderValue ? packageChose.sliderValue : 39990,
      haveLogo: packageChose.questionOne,
      haveSite: packageChose.questionTwo,
      haveSocialMidia: packageChose.questionTree,
    };

    pack = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}package/search`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return pack;
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

  static async updatePackage(data, token) {
    return await axios.put(`${process.env.NEXT_PUBLIC_API_URL}package`, data, {
      headers: {
        Authorization: token,
      },
    });
  }

  static async getPackageById(data, token) {
    return (
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}package/${data}`, {
        headers: {
          Authorization: token,
        },
      })
    ).data;
  }

  static async deletePackage(id, token) {
    return await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}package/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
