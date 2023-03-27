<template>
    <Transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <slot name="icon">
            <div class="modal-animete circle w3-animate-zoom">
              <v-icon
                class="icon"
                color="white"
                size="60"
                icon="mdi-check-bold"
              ></v-icon>
            </div>
          </slot>
            <div>
              <slot name="header"><h1 class="text-center text-green font-weight-medium">Confirmation</h1></slot>
            </div>
  
            <div>
              <p class="text-center text-secon font-weight-medium">Activity: <span class="font-weight-regular">{{ useStore.dataRoom.name }}</span></p>
            </div>
            <div>
                <p class="text-center text-secon font-weight-medium">Date: <span class="font-weight-regular">
                  {{formatDate(useStore.dataRoom.startdate) + " - " + formatDate(useStore.dataRoom.enddate)}}
                </span>
                </p>
            </div>
            <div>
                <p class="text-center text-secon font-weight-medium">Time: <span class="font-weight-regular">
                  {{formatTime(useStore.dataRoom.startdate) + " - " + formatTime(useStore.dataRoom.enddate)}}</span>
                </p>
            </div>
            <div>
              <p class="text-center text-secon font-weight-medium">Username: <span class="font-weight-regular">
                {{ useStore.dataConfirm.ID }}</span></p>
            </div>
            <div>
              <p class="text-center text-secon font-weight-medium">Email: <span class="font-weight-regular">
                {{ useStore.dataConfirm.Email }}</span></p>
            </div>
            <div>
              <h4 class="text-center text-secon font-weight-medium" >We've sent a confirmation to your e-mail for verification.</h4>
            </div>
  
            <div class="d-btn-ok">
              <slot name="button">
                <v-btn
                  color="green-darken-1"
                  width="150"
                  @click="$router.push('/Mainroom')"
                >
                  OK
                </v-btn>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script>
import { useDataStore } from "@/store/useDataStore";
import moment from 'moment-timezone';

  export default {
    data() {
      return {
        useStore: useDataStore(),
        ID: "",
        Email: ""
      };
    },
    methods: {
        formatDate(value) {
        return moment(value,'YYYY-MM-DD HH:mm:ss').format("DD/MM/YYYY");
        },
        formatTime(value) {
        return moment(value,'YYYY-MM-DD HH:mm:ss').format("HH:mm");
        },
    },
  };
  </script>
  
  <style>
  .text-secon{
    color: #6C6F93;
  }

  .d-btn-ok {
    display: flex;
    justify-content: center;
  }
  .icon {
    margin-top: 18%;
    margin-left: 20%;
  }
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 530px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  
  .modal-enter-from {
    opacity: 0;
  }
  
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  
  .circle {
    margin-left: 40%;
    height: 100px;
    width: 100px;
    background-color: #18ab56;
    border-radius: 50%;
    display: inline-block;
  }
  .modal-animete {
    -webkit-animation: fall-in 0.75s;
    -moz-animation: fall-in 0.75s;
    -o-animation: fall-in 0.75s;
    animation: fall-in 0.75s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  @-webkit-keyframes fall-in {
    0% {
      -ms-transform: scale(3, 3);
      -webkit-transform: scale(3, 3);
      transform: scale(3, 3);
      opacity: 0;
    }
    50% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    60% {
      -ms-transform: scale(1.1, 1.1);
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }
    100% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  @-moz-keyframes fall-in {
    0% {
      -ms-transform: scale(3, 3);
      -webkit-transform: scale(3, 3);
      transform: scale(3, 3);
      opacity: 0;
    }
    50% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    60% {
      -ms-transform: scale(1.1, 1.1);
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }
    100% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  @-o-keyframes fall-in {
    0% {
      -ms-transform: scale(3, 3);
      -webkit-transform: scale(3, 3);
      transform: scale(3, 3);
      opacity: 0;
    }
    50% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    60% {
      -ms-transform: scale(1.1, 1.1);
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }
    100% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  @-moz-keyframes fall-in {
    0% {
      -ms-transform: scale(3, 3);
      -webkit-transform: scale(3, 3);
      transform: scale(3, 3);
      opacity: 0;
    }
    50% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    60% {
      -ms-transform: scale(1.1, 1.1);
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }
    100% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  @-webkit-keyframes fall-in {
    0% {
      -ms-transform: scale(3, 3);
      -webkit-transform: scale(3, 3);
      transform: scale(3, 3);
      opacity: 0;
    }
    50% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    60% {
      -ms-transform: scale(1.1, 1.1);
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }
    100% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  @-o-keyframes fall-in {
    0% {
      -ms-transform: scale(3, 3);
      -webkit-transform: scale(3, 3);
      transform: scale(3, 3);
      opacity: 0;
    }
    50% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    60% {
      -ms-transform: scale(1.1, 1.1);
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }
    100% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  @keyframes fall-in {
    0% {
      -ms-transform: scale(3, 3);
      -webkit-transform: scale(3, 3);
      transform: scale(3, 3);
      opacity: 0;
    }
    50% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
      opacity: 1;
    }
    60% {
      -ms-transform: scale(1.1, 1.1);
      -webkit-transform: scale(1.1, 1.1);
      transform: scale(1.1, 1.1);
    }
    100% {
      -ms-transform: scale(1, 1);
      -webkit-transform: scale(1, 1);
      transform: scale(1, 1);
    }
  }
  </style>
  