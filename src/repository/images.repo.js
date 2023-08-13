import axios from "axios";

export class ImagesRepo {
  static async sendFile(data, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}send-media`,
      data,
      {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  static async sendImage({ url = "", title = "", author = "" }, token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}images`,
      {
        url: url,
        title: title,
        author: author,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}
