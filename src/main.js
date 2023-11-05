// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


import VueCookies from 'vue-cookies'


import { createApp } from 'vue'
import App from './App.vue'

import MarkdownIt from 'markdown-it';
import MarkdownItMathJax from 'markdown-it-mathjax3';
const markjax = new MarkdownIt()
  .use(MarkdownItMathJax)

const app =  createApp(App)
app.config.globalProperties.$cookies = VueCookies
app.config.globalProperties.$markjax = markjax
$cookies.config("1d")
app.mount('#app')

// // mathjax
// function onMathJaxReady() {
//   const el = document.getElementById("elementId");
//   renderByMathjax(el);
// }
// import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
// initMathJax({}, onMathJaxReady);
// // end
// app.use(MathJax).mount('#app')