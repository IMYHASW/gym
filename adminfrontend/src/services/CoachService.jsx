import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/coach"


class CoachService {

  getAll() {
    return axios.get(BASE_URL + '/all')
  }

  delete(id) {
    return axios.delete(BASE_URL + "/" + id);
  }

  create(equipment) {
    return axios.post(BASE_URL, equipment)
  }

  getById(id) {
    return axios.get(BASE_URL + '/getById?id=' + id)
  }

  update(id,equipment){
    return axios.put(BASE_URL + "/" + id,equipment)
  }

}

export default new CoachService();