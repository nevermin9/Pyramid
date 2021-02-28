import Vue from 'vue';
import VueRouter from 'vue-router';
import { HomePageRoute } from '@/views/HomePage';

Vue.use(VueRouter);

const routes = [
    HomePageRoute,
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;