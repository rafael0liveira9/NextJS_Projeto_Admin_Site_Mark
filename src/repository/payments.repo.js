import axios from "axios";

export class PaymentsRepo {
  static async getAllPayments(token) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}payment/all`, {
      headers: {
        Authorization: token,
      },
    });
  }
  static async getPaymentById(token, id) {
    return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}payment/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  }
}
