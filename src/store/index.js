import Vue from 'vue';
import Vuex from 'vuex';
import MetaData from './meta.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listing: MetaData.listing,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});
