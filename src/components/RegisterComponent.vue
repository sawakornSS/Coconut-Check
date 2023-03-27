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
            <p class="font-weight-bold mb-0 text-center" style="color: #009780">
              CREATE ACCOUNT
            </p>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" class="pl-9 pr-9 pb-0">
                  <v-text-field
                    v-model="register.username"
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
                <v-col cols="12" class="pl-9 pr-9 pb-0 pt-0">
                  <v-text-field
                    v-model="register.firstname"
                    :rules="firstnameRules"
                    type="text"
                    label="First name"
                    placeholder="First name"
                    variant="outlined"
                    clearable
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pl-9 pr-9 pb-0 pt-0">
                  <v-text-field
                    v-model="register.lastname"
                    :rules="lastnameRules"
                    type="text"
                    label="Last name"
                    placeholder="Last name"
                    variant="outlined"
                    clearable
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pl-9 pr-9 pb-0 pt-0">
                  <v-text-field
                    v-model="register.password"
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
                <v-col cols="12" class="pl-9 pr-9 pb-0 pt-0">
                  <v-text-field
                    v-model="register.confirmPassword"
                    :rules="confirmPasswordRules"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    variant="outlined"
                    clearable
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="pl-9 pr-9 pb-5 pt-0">
                  <v-text-field
                    v-model="register.email"
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
                <v-col cols="6" class="pl-9">
                  <v-btn
                    color="#009780"
                    variant="outlined"
                    block
                    height="40"
                    @click="$router.push('/login')"
                  >
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
                    Create
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <dialogSubmit v-if="showModal"> </dialogSubmit>
</template>

<script>
import modal from "./ModelSubmit.vue";
import userDataService from "../services/userDataService.js";

export default {
  data() {
    return {
      register: {
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmPassword: "",
        email: "",
      },
      showModal: false,
      valid: true,
      usernameRules: [(v) => !!v || "Username is required"],
      firstnameRules: [(v) => !!v || "Firstname is required"],
      lastnameRules: [(v) => !!v || "Lastname is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password minimum 6 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Password is required",
        (v) => v === this.register.password || "Password do not match",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {

        userDataService.create(this.register)
          .then((response) => {
            this.showModal = true;
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },

  components: {
    dialogSubmit: modal,
  },
};
</script>
