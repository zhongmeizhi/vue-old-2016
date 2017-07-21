import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import abc from '@/components/abc'
import book from '@/components/book'
import vr from '@/components/vr'
import about from '@/components/about'


Vue.use(Router)

export default new Router({
// 调用history模式，这样页面就没有#/了，跳转的链接用 :href
//	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/abc',
      name: 'abc',
      component: abc
    }, 
    {
      path: '/book',
      name: 'book',
      component: book
    }, 
    {
      path: '/vr',
      name: 'vr',
      component: vr
    }, 
    {
      path: '/about',
      name: 'about',
      component: about
    }, 
  ]
})
