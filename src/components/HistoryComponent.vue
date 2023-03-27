<template>
  <v-container>
    <v-toolbar color="#28965A" rounded="4">
      <v-icon class="ml-5 mr-2" color="white" size="30"
        >mdi-clipboard-text-outline</v-icon
      >
      <h5 class="text-center mb-0 text-white">Room History</h5>
    </v-toolbar>
    <v-card class="mt-5" rounded="4">
      <v-card-text>
        <v-row>
          <v-col cols="6">
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
            <h5>Owner:</h5>
            <p>{{ detailRoom.owner }}</p>
          </v-col>
          <v-col cols="6">
            <h5>Place:</h5>
            <p>
              {{ detailRoom.place }}
            </p>
            <h5>Attendance Detail:</h5>
            <p>{{ detailRoom.detail }}</p>
            <h5>File:</h5>
            <download-excel
              class="btn btn-default pa-0"
              :data="participant"
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
              &nbsp; {{ detailRoom.participants }}
            </p>
            <p class="d-inline text-h5 align-self-end" v-else>
              &nbsp; {{ numberOfParticipants() + " / " + participant.length }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-5" rounded="4">
      <v-data-table
        v-model:sort-by="sortBy"
        :headers="computedHeaders"
        :items="itemsWithIndex"
        class="elevation-1"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="getColor(item.raw.status)"
            v-if="item.raw.status == true"
          >
            Joined
          </v-chip>
          <v-chip :color="getColor(item.raw.status)" v-else>
            Not Joined
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import roomDataService from "../services/roomDataService.js";
import moment from 'moment-timezone';

export default {
  data() {
    return {
      sortBy: [{ key: "status", order: "asc" }],
      detailRoom: {},
      fileName: "",
      itemsPerPage: 5,
      headers: [
        {
          title: "No.",
          key: "index",
          align: "center",
        },
        { title: "ID", align: "start", key: "username" },
        { title: "Name", align: "start", key: "name" },
        { title: "Time Attendance", align: "start", key: "time" },
        { title: "Email", align: "start", key: "email" },
        { title: "Device", align: "start", key: "device" },
        { title: "Status", align: "start", key: "status" },
      ],
      participant: [],
      fieldData: {
        Username: "username",
        Name: "name",
        Time: "time",
        Status: {
          field: "status",
          callback: (value) => {
            return value ? 1 : 0;
          },
        },
      },
    };
  },
  methods: {
    getColor(status) {
      if (status == 1) return "green";
      else return "red";
    },
    getRoom(id) {
      roomDataService
        .findRoom(id)
        .then((response) => {
          this.detailRoom = response.data[0];
          this.participant = this.detailRoom.participant;
          this.fileName = this.detailRoom.name;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    formatDate(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("LL");
    },
    formatTime(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("HH:mm:ss");
    },
    numberOfParticipants() {
      let participants = 0;
      for (let i = 0; i < this.participant.length; i++) {
        if (this.participant[i].status == 1) {
          participants += 1;
        }
      }
      return participants;
    },
  },
  mounted() {
    this.getRoom(this.$route.params.id);
  },
  computed: {
    itemsWithIndex() {
      return this.participant.map((items, index) => ({
        ...items,
        index: index + 1,
      }));
    },
    computedHeaders() {
      if (this.detailRoom.prefer == false) {
        return this.headers.filter((header) => header.title !== "Name");
      }
      return this.headers;
    },
  },
};
</script>

<style></style>
