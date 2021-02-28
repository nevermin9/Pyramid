import Vue from 'vue';
import Vuex from 'vuex';
import { HomePageStore } from '@/views/HomePage'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        HomePageStore,
    }
});