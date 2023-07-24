import axios from "axios";

export class UsersRepo {

  // ******************************** GET ALL USERS
  static async getAllUsers(token) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user/all`, {
      headers: {
        Authorization: token,
      },
    });
  }

  // ******************************** GET ALL COMPANYS
  static async getAllCompanies(token) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}companie`, {
      headers: {
        Authorization: token,
      },
    });
  }

  // ******************************** POST CLIENTS
  static async postUserClient(data) {

    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/signup`, data, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*"
      },
    });
  }

  // ******************************** POST COMPANY CLIENTS

  static async postUserCompany(auth, company) {

    return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}companie`, company, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        Authorization: auth
      },
    });
  }

  // ******************************** GET USER BY EMAIL (return INT 200 or INT 400 only)

  static async getUserByEmail(email) {
    try {
      const x = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}user/search-user/${email}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
      });
      return 200
    } catch (error) {
      return 400
    }

  }
}
