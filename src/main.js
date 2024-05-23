import { createApp, render } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'






const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')


// new Vue({
//     router,
//     store,
//     render:h =>(App)
// }).$mount(('#app'))

