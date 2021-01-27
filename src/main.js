import 'regenerator-runtime'
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import searchData from './plugins/searchData'
import fetchData from "./plugins/fetchData";

Vue.use(searchData)
Vue.use(fetchData)

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})

// new Vue({
//     el: '#app',
//     store,
//     render: fuction (createElement) {
//         return createElement
// }
// })