<template>
  <div v-if="navbar.isAuthenticated">
    <v-toolbar color="white">
      <v-img src="@/assets/image/new-logo-removebg-preview.png"></v-img>

      <v-spacer></v-spacer>
      <p class="text-h6 text-center mb-0">
        {{ navbar.user.fname + " " + navbar.user.lname }}
      </p>
      &nbsp;
      <v-btn variant="outlined" color="red" @click="logout()"> Logout </v-btn>
    </v-toolbar>
  </div>
  <router-view></router-view>
</template>

<script>
import { useUserStore } from "./store/useUserStore";
import { useSocketIo} from "./services/socket.js";

export default {
  setup() {
    const socket = useSocketIo();
    return socket
    // const [displayName, setDisplayName] = useSocketName(socket); 
  },
  data() {
    return {
      navbar: useUserStore(),
      // socket: null,
      // socketioURL: "http://localhost:8080/",
    };
  },
  methods: {
    logout() {
      this.navbar.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
body {
  background-image: url("@/assets/image/gray-abstract-wireframe-technology-background.jpg");
}
</style>
