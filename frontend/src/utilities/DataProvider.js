import axios from "axios";

export default class DataProvider {
  #url = "http://localhost:5000/api";

  async get(route, params = "", headers = {}) {
    try {
      const url = `${this.#url}/${route}/${params}`;
      const response = await axios.get(url, { headers: headers });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async post(route, payload, params = "", headers = {}) {
    try {
      const url = `${this.#url}/${route}/${params}`;
      const response = await axios.post(url, payload, { headers: headers });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async update(route, payload, params = "", headers = {}) {
    try {
      const url = `${this.#url}/${route}/${params}`;
      const response = await axios.put(url, payload, { headers: headers });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}