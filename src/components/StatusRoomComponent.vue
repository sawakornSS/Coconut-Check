<template>
  <v-container>
    <v-toolbar color="#28965A" rounded="4">
      <v-icon class="ml-5 mr-2" color="white" size="30"
        >mdi-clipboard-text-outline</v-icon
      >
      <h5 class="text-center mb-0 text-white">Detail Room</h5>
      &nbsp;
      <v-spacer></v-spacer>
      <v-btn icon @click="cardcheck = !cardcheck">
        <v-icon color="white" size="30" v-if="cardcheck">mdi-view-grid</v-icon>
        <v-icon color="white" size="30" v-else>mdi-view-list</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card class="mt-5" rounded="4">
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <div
              class="bg-green lighten-2 text-no-wrap rounded-pill text-center pa-1 mb-2 mr-3 ml-3"
            >
              <h5 class="mb-0">Code Room: {{ detailRoom.codeRoom }}</h5>
            </div>
            <div class="text-center" style="cursor: pointer">
              <qrcode-vue :value="value" :size="size" level="H" id="qrcode" />
              <dialogQRCode> </dialogQRCode>
            </div>
            <div class="text-center">
              <v-btn color="success" variant="outlined" @click="printQRCODE()"
                >Print QR Code</v-btn
              >
            </div>
          </v-col>
          <v-col cols="4">
            <h5>Room:</h5>
            <p>{{ detailRoom.name }}</p>
            <h5>Date:</h5>
            <p>
              {{
                formatDate(detailRoom.startdate) +
                " - " +
                formatDate(detailRoom.enddate)
              }}
            </p>
            <h5>Time:</h5>
            <p>
              {{
                formatTime(detailRoom.startdate) +
                " - " +
                formatTime(detailRoom.enddate)
              }}
            </p>
            <p id="time" class="text-h5 d-inline"></p>
            <v-btn
              class="d-inline mb-4 ml-3"
              color="success"
              variant="outlined"
              @click="onClickEndTime()"
              >End Time</v-btn
            >
            <h5>Owner:</h5>
            <p>{{ detailRoom.owner }}</p>
          </v-col>
          <v-col cols="4">
            <h5>Place:</h5>
            <p>
              {{ detailRoom.place }}
            </p>
            <h5>Attendance Detail:</h5>
            <p>{{ detailRoom.detail }}</p>
            <h5>File:</h5>
            <download-excel
              class="btn btn-default pa-0"
              :data="dataStore.dataParticipant"
              :fields="fieldData"
              :name="fileName"
            >
              <p>
                <v-icon color="green">mdi-download-circle-outline</v-icon>
                {{ detailRoom.name + ".xls" }}
              </p>
            </download-excel>
            <br /><v-icon size="35" class="mb-3">mdi-account-group</v-icon>
            <p
              class="d-inline text-h5 align-self-end"
              v-if="!detailRoom.prefer"
            >
              &nbsp; {{ numberOfParticipants() }}
            </p>
            <p class="d-inline text-h5 align-self-end" v-else>
              &nbsp;
              {{
                numberOfParticipants() +
                " / " +
                dataStore.dataParticipant.length
              }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-5" rounded="4" v-if="cardcheck">
      <v-data-table
        v-model:sort-by="sortBy"
        :headers="computedHeaders"
        :items="itemsWithIndex"
        class="elevation-1"
      >
        <template v-slot:[`column.ID`]="{ column }" v-if="!detailRoom.prefer">
          {{ (column.title = "Username") }}
        </template>
        <template v-slot:no-data>
          <p class="pl-10">--- No Participant Information ---</p>
        </template>
        <template v-slot:[`item.Status`]="{ item }">
          <v-chip
            :color="getColor(item.raw.Status)"
            v-if="item.raw.Status == true"
          >
            Joined
          </v-chip>
          <v-chip :color="getColor(item.raw.Status)" v-else>
            Not Joined
          </v-chip>
        </template>
        <template v-slot:[`item.Device`]="{ item }">
          <b v-if="checkDevice(item.raw.Device) == true">{{ item.raw.Device }}</b>
          <p v-else>{{ item.raw.Device }}</p>
        </template>
      </v-data-table>
    </v-card>
    <v-card class="mt-5" rounded="4" v-else>
      <v-item-group selected-class="bg-primary">
        <v-container>
          <v-row>
            <v-col
              v-for="item in dataStore.dataParticipant"
              :key="item"
              cols="2"
            >
              <v-item>
                <v-card height="70" width="170" :color="getColor(item.Status)">
                  <h3 class="text-center mt-4">{{ item.ID }}</h3>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-card>
  </v-container>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import dialogQRCode from "./Dialog/DialogQRCode.vue";
import { useDataStore } from "@/store/useDataStore";
import roomDataService from "../services/roomDataService.js";
import moment from 'moment';
import {
  receiveSocketData,
  receiveSocketData_codeRoom,
} from "../services/socket.js";

export default {
  data() {
    return {
      sortBy: [{ key: "Status", order: "asc" }],
      time: "",
      dataStore: useDataStore(),
      detailRoom: {},
      fileName: "",
      dialog: false,
      cardcheck: true,
      value: "",
      size: 220,
      itemsPerPage: 10,
      headers: [
        {
          title: "No.",
          key: "No",
          align: "center",
        },
        { title: "ID", align: "start", key: "ID" },
        { title: "Name", align: "start", key: "Name" },
        { title: "Time Attendance", align: "start", key: "Time" },
        { title: "Email", align: "start", key: "Email" },
        { title: "Device", align: "start", key: "Device" },
        { title: "Status", align: "start", key: "Status" },
      ],
      fieldData: {
        Username: "ID",
        Name: "Name",
        Time: "Time",
        Status: {
          field: "Status",
          callback: (value) => {
            return value ? 1 : 0;
          },
        },
      },
      saveData: {
        participants: "",
        data: {},
      },
      tempDevice: "",
    };
  },
  methods: {
    getRoom(id) {
      roomDataService
        .findRoom(id)
        .then((response) => {
          // random number
          this.random_number = Math.floor(100000 + Math.random() * 900000);
          response.data[0].codeRoom = this.random_number;
          this.detailRoom = response.data[0]; //set detailRoom
          this.value =
            "http://dekdee2.informatics.buu.ac.th:8031/JoinRoom/" + this.detailRoom.codeRoom; // set Value QR Code
          this.fileName = this.detailRoom.name; //set filename download excel
          
          receiveSocketData();
          receiveSocketData_codeRoom();
          useDataStore().setAllData(response.data); //set local dataRoom
          useDataStore().time = setInterval(this.countDown, 1000); //run time
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getColor(status) {
      if (status == 1) {
        return "green";
      } else return "red";
    },
    formatDate(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("LL");
    },
    formatTime(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("HH:mm:ss");
    },
    numberOfParticipants() {
      let participants = 0;
      for (let i = 0; i < this.dataStore.dataParticipant.length; i++) {
        if (this.dataStore.dataParticipant[i].Status == 1) {
          participants += 1;
        }
      }
      return participants;
    },
    setDataPerticipants() {
      //set Data to saveData
      this.saveData.participants = this.numberOfParticipants();
      this.saveData.data = this.dataStore.dataParticipant;
      //insert and update data in database
      roomDataService.saveParticipants(this.$route.params.id, this.saveData).then((response) => {
        console.log(response)
        //route to history page by id
        this.$router.replace({ path: "/history/" + this.$route.params.id })
      }
      );
      //reset data
      this.dataStore.resetData();
    },
    onClickEndTime() {
      clearInterval(useDataStore().time);
      this.setDataPerticipants();
    },
    countDown() {
      // var countDownDate = new Date(this.detailRoom.enddate).getTime();
      var countDownDate = moment(this.detailRoom.enddate, 'YYYY-MM-DD HH:mm:ss');
      // Get today's date and time
      // var now = new Date().getTime();
      var now = moment();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      console.log(new Date(this.detailRoom.enddate))
      console.log(this.detailRoom.enddate)
      console.log(new Date())
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="time"
      document.getElementById("time").innerHTML =
        "( " +
        days +
        "D " +
        hours +
        "H " +
        minutes +
        "M " +
        seconds +
        "S " +
        ")";
      // If the count down is over, write some text
      if (distance < 0) {
        clearInterval(useDataStore().time);
        document.getElementById("time").innerHTML = "( TIME UP )";
        this.setDataPerticipants();
      }
    },
    printQRCODE() {
      // Generate download with use canvas and stream
      const canvas = document.getElementById("qrcode");
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    checkDevice(device) {
      if ((this.tempDevice == device)) {
        return true;
      } else {
        this.tempDevice = device;
        return false;
      }
    },
  },

  computed: {
    computedHeaders() {
      if (this.detailRoom.prefer == false) {
        return this.headers.filter((header) => header.title !== "Name");
      }
      return this.headers;
    },
    itemsWithIndex() {
      return this.dataStore.dataParticipant.map((items, index) => ({
        ...items,
        No: index + 1,
      }));
    },
  },
  mounted() {
    this.dataStore.resetData();
    this.getRoom(this.$route.params.id);

    // this.detailRoom = useDataStore().dataRoom;
  },
  components: {
    QrcodeVue,
    dialogQRCode,
  },
};
</script>

<style></style>
