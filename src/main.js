// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// mathjax
function onMathJaxReady() {
    const el = document.getElementById("elementId");
    renderByMathjax(el);
  }
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
initMathJax({}, onMathJaxReady);
// end


import VueCookies from 'vue-cookies'



import { createApp } from 'vue'
import App from './App.vue'

const app =  createApp(App)
app.config.globalProperties.$cookies = VueCookies
$cookies.config("1d")

app.use(MathJax).mount('#app')