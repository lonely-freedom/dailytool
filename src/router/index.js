import Vue from 'vue'
import VueRouter from 'vue-router'
import Daily from '../components/Daily/Nav/Daily'
import Project from '../components/Daily/Nav/Project'
import Month from '../components/Daily/Nav/Month'
import Register from '../components/Register'
import Login from '../components/Login'
import Home from '../components/Home'
import Contact from '../components/DLL/Nav/Contact'

Vue.use(VueRouter);
export const dailyRouterMap=[
  {
    path: "/",
    component: Home,
  },{
    path: "/Daily",
    component: Daily,
  },
  {
    path: "/Project",
    component: Project,
  },
   {
    path: "/Month",
    component: Month,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/Register",
    component: Register,
  },
  {
    path: "/Contact",
    component: Contact,
  }
]



export default new VueRouter({
  routes: dailyRouterMap,
  mode: "history"
});
