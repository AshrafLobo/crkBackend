import axios from "axios";

export default class DataProvider {
  #url = "https://secure.comp-rite.co.ke/registerBackend/api";

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

  async delete(route, headers = {}) {
    try {
      const url = `${this.#url}/${route}`;
      const response = await axios.delete(url, { headers: headers });
      return response;
    } catch (error) {
      return error.response;
    }
  }
}
