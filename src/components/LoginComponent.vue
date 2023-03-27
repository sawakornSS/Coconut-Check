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
            <p
              class="font-weight-bold mb-0 text-center align-center"
              style="color: #009780"
            >
              LOGIN
            </p>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <v-text-field
                    v-model="login.username"
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
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <v-text-field
                    v-model="login.password"
                    :rules="passwordRules"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    variant="outlined"
                    clearable
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-input :error-messages="errorMessages" class="pl-9"></v-input>
              <v-row class="mt-0 mb-2">
                <v-col cols="6" class="pl-9">
                  <v-btn color="#009780" variant="outlined" block height="40" @click="$router.push('/Mainroom')">
                    Cancel
                  </v-btn>
                </v-col>
                <v-col cols="6" class="pr-9">
                  <v-btn
                    color="#009780"
                    class="text-white"
                    block
                    height="40"
                    @click="validate"
                  >
                    Log in
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <p class="text-h6 text-center">
          Create your account
          <RouterLink to="/register" class="text-decoration-underline"
            >click</RouterLink
          >
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userDataService from "../services/userDataService.js";

import { useUserStore } from "@/store/useUserStore";

export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      errorMessages: "",
      valid: true,
      username: "",
      usernameRules: [(v) => !!v || "Username is required"],
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        var data = {
          username: this.login.username,
          password: this.login.password,
        };

        userDataService.findUser(data)
          .then((response) => {
            if (response.data == "") {
              this.errorMessages = "Your Username or Password Invalid";
            } else {
              //เก็บข้อมูล login เอาไว้
              useUserStore().login(response.data)
              
              this.$router.push('/CreateRoom/'+ response.data.id)
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>
