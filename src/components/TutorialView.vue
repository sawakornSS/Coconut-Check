<template>
  <v-btn @click="emitEvent(id, data)"> click </v-btn>
  <p>{{ useDataStore2.dataParticipant }}</p>
</template>

<script>
import { useDataStore } from "@/store/useDataStore";
import { useSocketIo } from "../services/socket.js";
import { sendSocketData } from "../services/socket.js";

export default {
  setup() {
    const useDataStore2 = useDataStore();
    const socket =  sendSocketData();
    return { useDataStore2, socket };
  },
  data() {
    return {
      data: {
        No: 1,
        ID: "62160083",
        Name: "นางสาวณัฐนิช เพิ่มพูล",
        Time: "18:00",
        Device: "198.168.1.51",
        Email: "62160083@go.buu.ac.th",
        Status: true,
      },
      id: 60
    };
  },
  methods: {
    emitEvent(id, data) {
      const socket = useSocketIo();
      socket.emit('inputData', id, data)
    },
  },
};
</script>

<style></style>
