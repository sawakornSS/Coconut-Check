import openSocket from "socket.io-client";
import { useDataStore } from "@/store/useDataStore";

export function useSocketIo() {
  const socketioURL = "http://localhost:8080/";
  return openSocket(socketioURL, {
    transports: ["websocket", "polling"],
  });
}

export function receiveSocketData() {
  const socket = useSocketIo();
  socket.on("sendData", (id, data) => {
    if (data != null) {
      useDataStore().checkData(id, data);
    }
  });
}
export function sendSocketData(id, data) {
  const socket = useSocketIo();
  socket.emit("inputData", id, data);
}

export function receiveSocketData_codeRoom() {
  const socket = useSocketIo();
  socket.on("sendData_CodeRoom", (codeRoom) => {
    if (codeRoom != null) {
      const socketRoom = useDataStore().checkData_CodeRoom(codeRoom);
      socket.emit("socketRoom", socketRoom);
    }
  });
}
export function sendSocketData_codeRoom(codeRoom) {
  const socket = useSocketIo();
  socket.emit("CodeRoom", codeRoom);
}

export function receiveSocketData_socketRoom() {
  const socket = useSocketIo();

  socket.on("sendData_socketRoom", (socketRoom) => {
    if (socketRoom != null) {
      useDataStore().setRoomdata(socketRoom);
      useDataStore().setCheck(true);
    } else {
      useDataStore().setCheck(false);
    }
  });
  return Promise.resolve("Success");
}

// ===check user ก่อนจะเพิ่มข้อมูล
  // export function receivejoinCheckEvent() {
  //   const socket = useSocketIo();

  //   socket.on("sendData_checkUser", (roomID, dataUser) => {
  //     if (roomID != null) {
  //       useDataStore().checkUser(roomID , dataUser);
  //       useDataStore().setCheck(true);
  //     } else {
  //       useDataStore().setCheck(false);
  //     }
  //   });

  //   return Promise.resolve("Success");
  // }
// ===check user ก่อนจะเพิ่มข้อมูล


// export function useSocketName(socket) {
//   const name = ref("");

//   socket.on("name", (serverName) => {
//     name.value = serverName;
//   });

//   function setDisplayName(value) {
//     socket.emit("updateName", value);
//   }

//   return [name, setDisplayName];
// }
