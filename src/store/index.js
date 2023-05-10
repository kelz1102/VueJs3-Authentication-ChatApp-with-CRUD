import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    //auth
    authUser: [],
    authenticated: localStorage.getItem("token") ? true : false,

    // Chats //
    chatUser: [],
    userSender: [],
    userRecepient: [],
    userMessages: [],
    searchedUser: [],

    //css
    toggleRightNav: true,
    toggleDeleteModal: false,
    toggleSearchShow: false,
    isPageLoading: true,
  },
  getters: {},
  mutations: {
    //auth
    setUser(state, data) {
      state.authUser = data;
    },

    //chats
    setChatUser(state, data1) {
      state.chatUser = data1;
    },
    setUserMessages(state, data) {
      state.userMessages = data;
    },
    setUserRecepient(state, data) {
      state.userRecepient = data;
    },
    setUserSender(state, data) {
      state.userSender = data;
    },
    setSearchUser(state, data) {
      state.searchedUser = data;
    },
  },
  actions: {
    fetchUser({ commit }) {
      axios
        .get("http://chat-app-api.test/api/user")
        .then((response) => {
          commit("setUser", response.data.user);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        });
    },

    //chats
    fetchChatUser({ commit, dispatch }, id) {
      axios
        .get(`http://chat-app-api.test/api/chat/${id}`)
        .then((response) => {
          commit("setChatUser", response.data.chat);
          dispatch("fetchUsersMessages", id);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        });
    },
    fetchUsersMessages({ commit }, id) {
      axios
        .get(`http://chat-app-api.test/api/messages/${id}`)
        .then((response) => {
          commit("setUserMessages", response.data.messages);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        });
    },
    fetcHasMessages({ commit }) {
      axios
        .get("http://chat-app-api.test/api/chats")
        .then((response) => {
          commit("setUserSender", response.data.sent_to);
          commit("setUserRecepient", response.data.receive_from);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        });
    },
    searchUser({ commit }, query) {
      axios
        .get("http://chat-app-api.test/api/users/search?q=" + query)
        .then((response) => {
          commit("setSearchUser", response.data.searched);
        })
        .catch((error) => {
          if (error.response.status == 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        });
    },
  },
  modules: {},
});
