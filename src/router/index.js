import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MetaData from '../store/meta.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  ...MetaData.listing.map( ex =>({
    path: `/experiments/${ex.id}`,
    name: `exp-${ex.id}`,
    component: () => import(`../experiments/${ex.folder}/${ex.component}`)
  })),
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL, // Needs to be set since the vue.config.js publicpath has been changed according to: 
  routes,
});

export default router;
