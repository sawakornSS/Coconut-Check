import { createWebHistory, createRouter } from "vue-router";
import LoginComponent from "@/components/LoginComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import TutorialView from "@/components/TutorialView.vue";
import StatusRoomComponent from "@/components/StatusRoomComponent.vue";
import JoinRoomComponent from "@/components/JoinRoomComponent.vue";
import MainRoomComponent from "@/components/MainRoomComponent.vue";
import CreateRoomComponent from "@/components/CreateRoomComponent.vue";
import HistoryComponent from "@/components/HistoryComponent.vue";

import { useUserStore } from "@/store/useUserStore";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => LoginComponent,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterComponent,
  },
  {
    path: "/statusroom/:id",
    name: "statusroom",
    component: StatusRoomComponent,
  },
  {
    path: "/TutorialView",
    name: "TutorialView",
    component: TutorialView,
  },
  {
    path: "/JoinRoom/:codeRoom",
    name: "JoinRoom",
    component: JoinRoomComponent,
  },
  {
    path: "/MainRoom",
    name: "MainRoom",
    component: MainRoomComponent,
  },
  {
    path: "/CreateRoom/:id",
    name: "CreateRoom",
    component: CreateRoomComponent,
  },
  {
    path: "/history/:id",
    name: "history",
    component: HistoryComponent,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (!useUserStore().isAuthenticated && (to.name !== "login" && to.name !== "MainRoom" && to.name !== "JoinRoom" && to.name !== "register")) {
    // redirect the user to the login page
    return { name: "MainRoom" };
  }else if(useUserStore().isAuthenticated && (to.name == "login" || to.name == "register")){
    useUserStore().isAuthenticated = false
  }
});

export default router;
