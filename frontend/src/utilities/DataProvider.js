import axios from "axios";

export default class DataProvider {
  #url = "http://localhost:5000/api";

  async get(route, headers = {}, responseType = "json") {
    try {
      const url = `${this.#url}/${route}`;
      const response = await axios.get(url, {
        responseType: responseType,
        headers: headers,
      });

      return response;
    } catch (error) {
      return error.response;
    }
  }

  async post(route, payload, headers = {}) {
    try {
      const url = `${this.#url}/${route}`;
      const response = await axios.post(url, payload, { headers: headers });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async update(route, payload, headers = {}) {
    try {
      const url = `${this.#url}/${route}`;
      const response = await axios.put(url, payload, { headers: headers });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
