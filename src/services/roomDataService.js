import http from "../http-common";

class roomDataService {
  create(data) {
    return http.post("/room/createRoom", data);
  }
  getRoom_userID(user_id){
    return http.get(`/room/getRoom_userID/${user_id}`);
  }
  findRoom(id) {
    return http.get(`/room/${id}`);
  }
  saveParticipants(id, data) {
    return http.put(`/room/saveData/${id}`, data);
  }
  checkCodeRoom(id){
    // console.log("CheckDataService"+id)
    return http.get(`/room/checkRoom/${id}`);
  }
}

export default new roomDataService; 
