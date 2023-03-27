<template>
  <v-dialog v-model="dialog" activator="parent" height="800" width="1000">
    <v-card class="overflow-visible">
      <v-card-text>
        <div
          class="bg-green lighten-2 text-no-wrap rounded-pill text-center pa-1 mb-5"
        >
          <h1>Code Room: {{ useStore.dataRoom[0].codeRoom }}</h1>
        </div>
        <p class="text-h5 text-center text-green font-weight-bold" id="time">
        </p>
        <div class="text-center mb-5">
          <qrcode-vue :value="'http://localhost:8080/JoinRoom/' + useStore.dataRoom[0].codeRoom" :size="400" level="H" />
        </div>
        <v-row>
          <v-col col="6">
           <p class="d-inline text-h5"><b>Room:</b> {{ useStore.dataRoom[0].name }}</p>
          </v-col>
          <v-col col="6">
            <p class="d-inline text-h5"><b>Place:</b> {{ useStore.dataRoom[0].place }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="6">
            <p class="d-inline text-h5">
              <b>Date:</b>
              {{
                formatDate(useStore.dataRoom[0].startdate) +
                " - " +
                formatDate(useStore.dataRoom[0].enddate)
              }}
            </p>
          </v-col>
          <v-col col="6">
            <p class="d-inline text-h5">
              <b>Attendance Detail:</b> {{ useStore.dataRoom[0].detail }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="6">
            <p class="d-inline text-h5">
              <b>Time:</b>
              {{
                formatTime(useStore.dataRoom[0].startdate) +
                " - " +
                formatTime(useStore.dataRoom[0].enddate)
              }}
            </p>
          </v-col>
          <v-col col="6">
            <p class="d-inline text-h5"><b>Owner:</b> {{ useStore.dataRoom[0].owner }}</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false"
          >close dialog</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { useDataStore } from "@/store/useDataStore";
import moment from 'moment-timezone';
export default {
  data() {
    return {
      useStore: useDataStore(),
      dialog: false,
    };
  },
  components: {
    QrcodeVue,
  },
  methods: {
    formatDate(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("LL");
    },
    formatTime(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("HH:mm:ss");
    },
  },
};
</script>
