<template>
  <v-container class="grey lighten-5 mt-5">
    <v-row>
      <v-col cols="6">
        <v-toolbar color="#009751" rounded="4" flat>
          <v-icon class="ml-5 mr-2" color="white" size="30">mdi-pencil</v-icon>
          <h5 class="text-center mb-0 text-white">Create Room</h5>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card class="mt-5" rounded="4">
          <v-card-text>
            <v-form ref="form" v-model="form" lazy-validation>
              <v-row>
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <span class="font-weight-bold">Room Name</span>
                  <v-text-field
                    ref="roomName"
                    v-model="Room.roomName"
                    :rules="[(v) => !!v || 'Item is required']"
                    type="text"
                    placeholder="Room Name"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    required
                    rounded
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <span class="font-weight-bold">Place</span>
                  <v-text-field
                    ref="place"
                    v-model="Room.place"
                    :rules="[(v) => !!v || 'Item is required']"
                    type="text"
                    placeholder="place"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <span class="font-weight-bold">Attendance Detail</span>
                  <v-text-field
                    ref="detail"
                    v-model="Room.detail"
                    :rules="[(v) => !!v || 'Item is required']"
                    type="text"
                    placeholder="Attendance Detail"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pl-9 pr-1 pb-0">
                  <span class="font-weight-bold">Start Date</span>
                  <v-text-field
                    ref="Date"
                    v-model="Room.startDate"
                    :rules="[(v) => !!v || 'Item is required']"
                    type="datetime-local"
                    placeholder="Attendance Detail"
                    variant="outlined"
                    density="comfortable"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="pl-1 pr-9 pb-0">
                  <span class="font-weight-bold">End Date</span>
                  <v-text-field
                    ref="Date"
                    v-model="Room.endDate"
                    :rules="[(v) => !!v || 'Item is required']"
                    type="datetime-local"
                    placeholder="Attendance Detail"
                    variant="outlined"
                    density="comfortable"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <span class="font-weight-bold">Owner</span>
                  <v-text-field
                    v-model="Room.owner"
                    :rules="[(v) => !!v || 'Item is required']"
                    type="text"
                    placeholder="Author"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    required
                    hide-details
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <div class="d-flex justify-space-between mb-2">
                    <div class="text-black">
                      <v-checkbox
                        v-model="Room.checkbox"
                        ref="checkbox"
                        color="success"
                        hide-details
                      >
                        <template v-slot:label>
                          <div class="font-weight-bold">
                            Participants pre-assign
                          </div>
                        </template>
                      </v-checkbox>
                    </div>

                    <div class="download-center">
                      <a
                        :href="'/files/Participant_Template.xlsx'"
                        download
                        class="text-decoration-none black"
                      >
                        <v-icon class="ml-5 mr-2" color="#18AB56" size="30"
                          >mdi-download-circle-outline</v-icon
                        >
                        <span class="font-weight-bold text-black"
                          >Download Template File</span
                        >
                      </a>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <div v-if="Room.checkbox">
                    <span class="font-weight-bold"
                      >Upload File
                      <span class="font-weight-regular"
                        >(Please use template file to upload)</span
                      ></span
                    >
                    <v-file-input
                      multiple
                      v-model="fileInput"
                      ref="fileInput"
                      :rules="rulesFile"
                      clearable
                      density="compact"
                      label="File input"
                      @change="onChange"
                    >
                    </v-file-input>
                    <xlsx-read :file="file">
                      <xlsx-json @parsed="onParsed"> </xlsx-json>
                    </xlsx-read>
                  </div>
                </v-col>
              </v-row>

              <v-row class="mt-2 mb-2">
                <v-col cols="6" class="px-9">
                  <v-btn
                    color="error"
                    class="primary"
                    height="40"
                    variant="outlined"
                    width="100%"
                    @click="reset"
                  >
                    Reset
                  </v-btn>
                </v-col>
                <v-col cols="6" class="px-9">
                  <v-btn
                    color="#009751"
                    class="text-white"
                    height="40"
                    width="100%"
                    @click="validate"
                  >
                    Create
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-spacer></v-spacer>
      <!-- Right content -->
      <v-col cols="6">
        <v-toolbar color="#009751" rounded="4" flat>
          <v-icon class="ml-5 mr-2" color="white" size="30">mdi-history</v-icon>
          <h5 class="text-center mb-0 text-white">
            Room History ( {{ tempList.length }} )
          </h5>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card rounded="4" class="mx-auto mt-5">
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <div v-for="item in tempList" :key="item">
                  <v-card
                    class="font-weight-bold pl-5 pt-3 pb-2 mb-3 elevation-3 setposition-card"
                    :to="clickHistory(item.status) + item.id"
                  >
                    <v-row>
                      <v-col cols="1" :class="checkTimeHistory(item.status)">
                      </v-col>
                      <v-col cols="11">
                        <p>
                          Room :
                          <span class="font-weight-regular">{{
                            item.name
                          }}</span>
                        </p>
                        <p>
                          Date :
                          <span class="font-weight-regular"
                            >{{ formatDate(item.startdate) }} -
                            {{ formatDate(item.enddate) }}
                          </span>
                        </p>
                        <div class="d-flex justify-space-between">
                          <div>
                            <p>
                              Time :
                              <span class="font-weight-regular"
                                >{{ formatTime(item.startdate) }} -
                                {{ formatTime(item.enddate) }}
                              </span>
                            </p>
                          </div>
                          <div>
                            <v-icon size="35" class="pr-5"
                              >mdi-account-group</v-icon
                            >
                            <span class="mr-6 font-weight-bold">{{
                              item.participants
                            }}</span>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
                <v-pagination
                  :length="length"
                  @update:model-value="updatePage($event)"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import roomDataService from "../services/roomDataService.js";
import { useUserStore } from "../store/useUserStore";
import { useDataStore } from "../store/useDataStore";
import moment from 'moment-timezone';
import { XlsxRead, XlsxJson } from "vue3-xlsx";
// // socket
// import { useSocketIo } from "../services/socket.js";
// import { sendSocketData } from "../services/socket.js";

export default {
  components: {
    XlsxRead,
    XlsxJson,
  },
  // setup(){
  //   const socket =  sendSocketData();
  //   return { socket };
  // },
  data() {
    // const date = ref();

    // // For demo purposes assign range from the current date
    // onMounted(() => {
    //   const startDate = new Date();
    //   const endDate = new Date(new Date().setDate(startDate.getDate() + 1));
    //   date.value = [startDate, endDate];
    // });
    return {
      rulesFile: [
        (v) => !!v || "File is required",
        (v) => (v && v.length > 0) || "File is required",
      ],
      statusHistory: false,
      detailRoom: [],
      tempList: [],
      length: "",
      pageSize: "4",
      page: "1",
      Room: {
        roomName: "",
        place: "",
        detail: "",
        checkbox: false,
        owner: useUserStore().user.fname + " " + useUserStore().user.lname, //get Author name from usename Login
        user_id: useUserStore().user.id,
        Date: "",
        startDate: "",
        endDate: "",
      },
      random_number: 0,
      fileInput: [],
      fileImport: [],
    };
  },

  methods: {
    formatDate(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY");
    },
    formatTime(value) {
      return moment(value,'YYYY-MM-DD HH:mm:ss').format("HH:mm");
    },
    reset() {
      this.$refs.roomName.reset();
      this.$refs.place.reset();
      this.$refs.detail.reset();
      this.$refs.checkbox.reset();
    },
    getRoom_userID(ID) {
      roomDataService
        .getRoom_userID(ID) // pass userID to api
        .then((response) => {
          this.detailRoom = response.data;
          this.length = this.detailRoom.length / 4;
          this.length = Math.ceil(this.length);
          this.checkTimeHistory();
          this.initPage();
          this.updatePage(this.page);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        roomDataService
          .create(this.Room)
          .then((response) => {
            useDataStore().addDataRoom(response.data);
            useDataStore().setImportData(this.fileImport, response.data.id);
            this.$router.push("/statusroom/" + response.data.id);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    onParsed(array) {
      // data from excel Data Type object -> target Array(n)
      this.fileImport = array;
    },
    initPage() {
      let Count = this.detailRoom.length;
      if (Count < this.pageSize) {
        this.tempList = this.detailRoom;
      } else {
        this.tempList = this.detailRoom.slice(0, this.pageSize);
      }
    },
    updatePage(pageIndex) {
      let start = (pageIndex - 1) * this.pageSize;
      let end = pageIndex * this.pageSize;
      this.tempList = this.detailRoom.slice(start, end);
      this.page = pageIndex;
    },
    checkTimeHistory(status) {
      if (status) {
        return "bg-success setcolor-card";
      } else {
        return "bg-warning setcolor-card";
      }
    },
    clickHistory(status) {
      if (status) {
        return "/history/";
      } else {
        return "/statusroom/";
      }
    },
  }, //method

  mounted() {
    this.getRoom_userID(this.$route.params.id);
    clearInterval(useDataStore().time); //หยุดการเดินของเวลา
    // this.getRoom_userID(useUserStore().user.id);
    // console.log(this.$route.params.id)
    // console.log(useUserStore().user)
  },
};
</script>


<style>
.download-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.setcolor-card {
  position: relative;
  left: -32px;
}
.setposition-card {
  position: relative;
}
</style>
