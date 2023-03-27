// import { ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useDataStore = defineStore("data", {
  state: () => {
    const time = "";
    const dataConfirm = "";
    const checkIP = "";
    const dataRoom = useLocalStorage("dataRoom", []);
    const dataImport = useLocalStorage("dataImport", []);
    const dataParticipant = useLocalStorage("dataParticipant", []);
    return { dataRoom, dataParticipant, time, dataImport, dataConfirm, checkIP};
  },
  actions: {
    checkData(id, data) {
      const index = this.dataRoom.findIndex((x) => x.id == id);
      if (this.dataRoom[index].prefer) {
        const index = this.dataParticipant.findIndex((x) => x.ID == data.ID);
        this.dataParticipant[index].Time = data.Time;
        this.dataParticipant[index].Email = data.Email;
        this.dataParticipant[index].Device = data.Device;
        this.dataParticipant[index].Status = data.Status;
      } else {
        this.dataParticipant.push(data);
      }
    },
    checkData_CodeRoom(codeRoom) {
      const index = this.dataRoom.findIndex((x) => x.codeRoom == codeRoom);
      if (index >= 0) {
        return this.dataRoom[index];
      }
    },
    addDataRoom(data) {
      this.dataRoom.push(data);
    },
    setRoomdata(data) {
      this.dataRoom = data;
    },
    setParticipantdata(data) {
      this.dataParticipant = data;
      // this.dataParticipant.push(data);
    },
    setAllData(data){
      this.dataRoom = data;
      const index = this.dataImport.findIndex((x) => x.id == this.dataRoom[0].id);
      this.dataParticipant = this.dataImport[index].data
    },
    setImportData(data, id){
      if(data == null){
        data = [];
      }
      const sum = {
        id: id,
        data: data
      }
      this.dataImport.push(sum)
    },
    resetData() {
      this.dataParticipant = []; 
      this.dataRoom = [];
    },
    // ===check user ก่อนจะเพิ่มข้อมูล
      // checkUser(roomID , dataUser){
      //   const indexRoom = this.dataRoom.findIndex((x) => x.id == roomID); //find room
      //   if(indexRoom >= 0){
      //     const indexUser = this.dataParticipant.findIndex((x) => x.ID == dataUser.ID); //find user
      //     if (indexUser >= 0) {
      //       return this.dataParticipant[indexUser];
      //     } 
      //   }
      // },
    // ===check user ก่อนจะเพิ่มข้อมูล

  },
});
