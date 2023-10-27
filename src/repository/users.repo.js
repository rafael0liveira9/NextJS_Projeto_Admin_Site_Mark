import axios from "axios";
import { stringify } from "stylis";

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

  // ******************************** POST NEW CLIENTS
  static async postUserClient(data) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/signup`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
  }

  // ******************************** LOGIN NEW CLIENTS
  static async postLogin(email, password) {
    let dataLogin = {
      email: email,
      password: password,
    };

    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}auth/signin/`,
      dataLogin,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
  }

  // ******************************** POST COMPANY CLIENTS

  static async postUserCompany(auth, company) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}companie`,
      company,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: auth,
        },
      }
    );
  }

  // ******************************** GET USER BY EMAIL (return INT 200 or INT 400 only)

  static async getUserByEmailDoc(email, document) {
    let data = {
      email: email,
      document: document,
    };
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}user/search-user-register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      }
    );
  }

  // ******************************** PUT
  static async putArrearsUser(id, token) {
    return await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}user/arrears/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
  }
}
