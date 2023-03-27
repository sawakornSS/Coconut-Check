<template>
  <v-container>
    <v-row>
      <v-img
        src="@/assets/image/new-logo-removebg-preview.png"
        aspect-ratio="7"
      >
      </v-img>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto my-12 mb-3"
          max-width="450"
          elevation="5"
          rounded="3"
        >
          <v-card-title class="pt-3 pb-3">
            <p class="font-weight-bold mb-0 text-center" style="color: #009751">
              Room Code:
              <span class="font-weight-regular">{{
                dataStore.dataRoom.codeRoom
              }}</span>
            </p>
            <p class="font-weight-bold mb-0 text-center" style="color: black">
              Activity:
              <span class="font-weight-regular">
                {{ dataStore.dataRoom.name }}</span
              >
            </p>
            <p class="font-weight-bold mb-0 text-center" style="color: black">
              Date:
              <span class="font-weight-regular"
                >{{ formatDate(dataStore.dataRoom.startdate) }} -
                {{ formatDate(dataStore.dataRoom.enddate) }}</span
              >
            </p>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <v-text-field
                    v-model="dataUser.ID"
                    :rules="usernameRules"
                    type="text"
                    label="Username"
                    placeholder="Username"
                    variant="outlined"
                    clearable
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pl-9 pr-9 pb-5">
                  <v-text-field
                    v-model="dataUser.Email"
                    :rules="emailRules"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    variant="outlined"
                    clearable
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0 mb-2">
                <v-col cols="12" class="pl-12 pr-12">
                  <v-btn
                    color="#009751"
                    class="text-white"
                    block
                    height="40"
                    @click="validate"
                  >
                    CONFIRM
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <p class="text-center" style="margin-top: 40px">
          Developed by Software Engineering <br />
          Faculty of Informatics, Burapah University
        </p>
      </v-col>
    </v-row>
  </v-container>
  <DialogMassageVue v-if="showModal"> </DialogMassageVue>
  <DialogJoinSuccessVue v-if="showModalSuccess">
    <template #icon v-if="checkIP">
      <div>
      </div>
    </template>
    <template #header v-if="checkIP">
      <h1 class="text-center text-orange font-weight-medium">
        Warning!! <br />
        Already Sent Information
      </h1>
    </template>
    <template #button v-if="checkIP">
      <v-btn color="warning" width="150" @click="$router.push('/Mainroom')">
        OK
      </v-btn>
    </template>
  </DialogJoinSuccessVue>
</template>

<script>
import { useDataStore } from "../store/useDataStore";
import moment from 'moment-timezone';
import { useSocketIo } from "../services/socket.js";
import DialogMassageVue from "./Dialog/DialogMassage.vue";
import DialogJoinSuccessVue from "./Dialog/DialogJoinSuccess.vue";

export default {
  data() {
    return {
      dataStore: useDataStore(),
      valid: true,
      dataUser: {
        ID: "",
        Time: moment(Date()).format("HH:mm:ss"),
        Device: "",
        Email: "",
        Status: true,
      },
      dataEmail: {},

      usernameRules: [(v) => !!v || "Username is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      showModal: false,
      showModalSuccess: false,
      checkIP: false,
    };
  },

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        // sent user Participant to Status screen
        const roomId = this.dataStore.dataRoom.id;

        useDataStore().dataConfirm = this.dataUser;
        (this.dataEmail = {
          name: useDataStore().dataRoom.name,
          palce: useDataStore().dataRoom.place,
          owner: useDataStore().dataRoom.owner,
          startDate: moment(useDataStore().dataRoom.startdate,'YYYY-MM-DD HH:mm:ss').format(
            "DD MMM YYYY"
          ),
          endDate: moment(useDataStore().dataRoom.enddate,'YYYY-MM-DD HH:mm:ss').format(
            "DD MMM YYYY"
          ),
          startTime: moment(useDataStore().dataRoom.startdate,'YYYY-MM-DD HH:mm:ss').format(
            "HH:mm"
          ),
          endTime: moment(useDataStore().dataRoom.enddate,'YYYY-MM-DD HH:mm:ss').format("HH:mm"),
        }),
          this.joinEvent(roomId, this.dataUser, this.dataEmail); // send roonid and User to status
        this.showModalSuccess = true;
      }
    },
    validateRoomCode(paramID) {
      this.emitEvent(paramID); // send codeRoom by paramiter id to socket Event"CodeRoom"
      this.receiveEvent();
    },
    emitEvent(codeRoom) {
      const socket = useSocketIo();
      socket.emit("CodeRoom", codeRoom);
    },
    receiveEvent() {
      const socket = useSocketIo();

      socket.on("sendData_socketRoom", (socketRoom) => {
        if (socketRoom != null) {
          useDataStore().setRoomdata(socketRoom);
          this.checkCodeRoom(true);
        } else {
          this.checkCodeRoom(false);
        }
      });
      socket.on("sendData_device", (device) => {
        if (useDataStore().checkIP == device) {
          this.checkIP = true;
        }else{
          useDataStore().checkIP = device
        }
      });
    },
    joinEvent(roomId, dataUser, dataRoom) {
      const socket = useSocketIo();
      socket.emit("inputData", roomId, dataUser, dataRoom);
    },
    checkCodeRoom(boolean) {
      if (!boolean) {
        this.showModal = true;
      } else {
        this.showModal = false;
      }
    },
    formatDate(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY");
    },
    formatTime(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("HH:mm:ss");
    },
  }, // method

  mounted() {
    this.validateRoomCode(this.$route.params.codeRoom); //check codeRoom by paramiter id
  },
  components: {
    DialogMassageVue,
    DialogJoinSuccessVue,
  },
};
</script>

