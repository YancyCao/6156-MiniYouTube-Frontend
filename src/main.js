//import './assets/main.css'

//import Vue from 'vue'
import { createApp,computed,watch,ref } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import VueRouter from 'vue-router'
import VideoDisplay from '@/components/VideoDisplay.vue';
import VideoDetails from '@/components/VideoDetails.vue';
import PersonalPage from '@/components/PersonalPage.vue';
import LoginView from '@/components/LoginView.vue';
import UploadView from '@/components/UploadView.vue';
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import router from './router'

//Vue.use(VueAxios, axios);
//createApp(App).mount('#app')

//Vue.use(VueRouter);

//Vue.config.productionTip = false;

//axios.defaults.baseURL = 'http://ec2-18-220-229-85.us-east-2.compute.amazonaws.com:1024/find-all-videos/test123';
// Set up Axios as a global property
const app = createApp(App);
app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$UserName = 'text456';
app.use(ElementPlus)

//console.log(SavedUserName)

const initialUsername = localStorage.getItem('username') || '';

const globalState = {
  origin: ref('/api'),
  username: ref(initialUsername),//''yc4138
  origin2: ref('https://cors-anywhere.herokuapp.com/'+'http://66.205.162.34.bc.googleusercontent.com:1024'),///api2
  //
  PersonalVideo:  computed(() => {
    return globalState.origin2.value + '/find-all-videos/' + globalState.username.value;
  }),
  findAllVideo:  computed(() => {
    return globalState.origin2.value + '/random-6/';
  }),
  deleteVideo: computed(() => {
    return globalState.origin2.value + '/delete-video/' + globalState.username.value;
  }),
  uploadVideo: computed(() => {
    return globalState.origin2.value + '/upload-video/' + '?username=' + globalState.username.value;
  })
  
};

//const totalVariable = {totalVariable: origin + '/find-all-videos/' + username,};

app.provide('globalState', globalState);//globalState


//

// Mount the app
//app.mount('#app');


const routes = [
  { path: '/', name: 'VideoDisplay',component: VideoDisplay },
  { path: '/video/:videoId', name: 'VideoDetails', component: VideoDetails },
  { path: '/PersonalPage/:UserName', name:'PersonalPage', component:PersonalPage},//
  { path: '/Login', name:'LoginView', component:LoginView},
  { path: '/Upload', name:'UploadView', component:UploadView}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach((to, from) => {
  if ((to.name !== 'LoginView' && to.name !== 'PersonalPage' && to.name !== 'VideoDisplay') && globalState.username.value === '') return { name: 'LoginView' }//
})

//createApp(App).use(router).mount('#app');
// Use VueAxios plugin if needed
app.use(VueAxios, axios);

// Mount the app with the router
app.use(router).mount('#app');


//new Vue({
   
//    render: (h) => h(App),
    //router : createRouter({routes}),
 // }).$mount('#app');
