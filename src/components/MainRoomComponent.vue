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
          max-width="350"
          elevation="5"
          rounded="3"
          color = "#28965A"
        >
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" class="pl-12 pr-12 pb-0 mt-5">
                  <v-text-field
                    v-model="codeRoom"
                    :rules="coderoomRules"
                    type="text"
                    label="code Room"
                    placeholder="Code Room"
                    variant="outlined"
                    bg-color="white"
                    clearable
                    required          
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0 mb-2">
                <v-col cols="12" class="pl-12 pr-12">
                  <v-btn
                    color="black"
                    class="text-white"
                    block
                    height="50"
                    x-large
                    @click="validate"
                    style="font-size: 24px; font-weight: bold;"
                  >
                    Join
                  </v-btn>
                
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
         <p class="text-h6 text-center mt-3">
          Create your own room 
          <RouterLink to="/Login" class="text-decoration-underline"
            >click</RouterLink
          >
        </p>
        <p class="text-center" style="margin-top: 40px;">
          Developed by Software Engineering <br>
          Faculty of Informatics, Burapah University
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { useDataStore } from "../store/useDataStore";
// import { useSocketIo,  receiveSocketData_codeRoom ,receiveSocketData_socketRoom } from "../services/socket.js";
// import {   receiveSocketData_codeRoom  } from "../services/socket.js";



export default {
  data() {
    return {
      // dataStore: useDataStore(),
      codeRoom: "",
      coderoomRules: [(v) => !!v || "coderoom is required"],
    };
  },

  methods: {
    async validate() {
        const { valid } = await this.$refs.form.validate();

      if(valid){
        this.$router.push('/JoinRoom/'+ this.codeRoom)
      }
    }
  },//method
};
</script>
