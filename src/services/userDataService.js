import http from "../http-common";

class userDataService {
  create(data) {
    return http.post("/user/register/create", data);
  }
  findUser(data) {
    return http.post("/user/findUser", data);
  }
}

export default new userDataService;
