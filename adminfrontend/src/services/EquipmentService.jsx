import axios from "axios";

const ADMIN_BASE_REST_API_URL = "http://localhost:8080/api/v1/equipment"


class EquipmentService {

  getEquipment(pageIndex, pageSize, filter) {
    return axios.post(
      ADMIN_BASE_REST_API_URL + '/filter?pageIndex=${pageIndex}&&pageSize=${pageSize}',
      filter
    );
  }

  getAll() {
    return axios.get(ADMIN_BASE_REST_API_URL + '/all')
  }

  delete(id) {
    return axios.delete(ADMIN_BASE_REST_API_URL + "/" + id);
  }

  create(equipment) {
    return axios.post(ADMIN_BASE_REST_API_URL, equipment)
  }

  getById(id) {
    return axios.get(ADMIN_BASE_REST_API_URL + '/getById?id=' + id)
  }

  update(id,equipment){
    return axios.put(ADMIN_BASE_REST_API_URL + "/" + id,equipment)
  }

}

export default new EquipmentService();