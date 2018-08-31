import Vue from 'vue'
import App from './App.vue'
import VRouter from 'vue-router'
import Vuex from 'vuex'
import Apple from './components/apple.vue'
import Banana from './components/banana.vue'
import FruitProfile from './components/fruitProfile.vue'

Vue.use(VRouter)
Vue.use(Vuex)



let router = new VRouter({
	model: 'history',
    routes: [
      {
    	path: '/apple/:color',
        component: Apple,
        children: [
        	{
        		path: 'profile/:province',
        		component: FruitProfile
        	}
        ]
      },
      {
        path: '/banana/:color',
        component: Banana
      }
    ]
})
new Vue({
  	el: '#app',
  	router: router,
  	render: h => h(App)
})