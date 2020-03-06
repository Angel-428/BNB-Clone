import { createStore, action } from "easy-peasy";

export default createStore({
  user: {
    user: null,
    houseBooked: [],
    setUser: action((state, payload) => {
      state.user = payload;
    }),
    setHouseBooked: action((state, payload) => {
      state.houseBooked = payload;
    })
  },
  modals: {
    showModal: false,
    showLoginModal: false,
    showRegistration: false,

    setShowModal: action(state => {
      state.showModal = true;
    }),
    setHideModal: action(state => {
      state.showModal = false;
    }),
    setShowLoginModal: action(state => {
      state.showModal = true;
      state.showLoginModal = true;
      state.showRegistrationModal = false;
    }),
    setShowRegistrationModal: action(state => {
      state.showModal = true;
      state.showLoginModal = false;
      state.showRegistrationModal = true;
    })
  }
});
