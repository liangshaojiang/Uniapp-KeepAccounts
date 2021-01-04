import Vue from 'vue'
import App from './App'
import store from './store' 


import basics from './pages/mbook/mbook.vue'
Vue.component('basics',basics)

import components from './pages/addmbook/addmbook.vue'
Vue.component('components',components)

import plugin from './pages/my/index.vue'
Vue.component('plugin',plugin)



import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
