import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: !!localStorage.getItem('accessToken'),
  },
  mutations: {
    setAuthenticated(state, value) {
      state.isAuthenticated = value;
    },
  },
  actions: {
    login({ commit }, token) {
      localStorage.setItem('accessToken', token);
      commit('setAuthenticated', true);
    },
    logout({ commit }) {
      localStorage.removeItem('accessToken');
      commit('setAuthenticated', false);
    },
  },
});
