export const HomePageRoute = {
    path: '/',
    name: 'pressure_page',
    component: () => import(/* webpackChunkName "Home" */ '@/views/HomePage/HomePage.vue'),
};