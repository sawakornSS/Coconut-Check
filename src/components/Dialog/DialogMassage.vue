<template>
  <v-dialog v-model="dialog" activator="parent" width="500" persistent>
    <v-card>
      <v-card-title>
        <div class="circle-error">
          <v-icon
            class="icon"
            color="white"
            size="60"
            icon="mdi-window-close"
          ></v-icon>
        </div>
        <p class="text-center">Code Room Not Found!!</p>
      </v-card-title>
      <v-card-actions>
        <v-btn color="error" block @click="$router.push('/Mainroom')"
          >Back to MainRoom</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
<style>
  .circle-error {
    margin-left: 40%;
    height: 100px;
    width: 100px;
    background-color:red;
    border-radius: 50%;
    display: inline-block;
  }
</style>