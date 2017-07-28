import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/main/home'
import abc from '@/components/main/abc'
import book from '@/components/main/book'
import about from '@/components/main/about'
import cart from '@/components/main/section/cart'
import checkout from '@/components/main/section/checkout'
import payment from '@/components/main/section/payment'
import alipay from '@/components/main/section/payment/alipay'
import wechat from '@/components/main/section/payment/wechat'

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
			path: '/cart',
      name: 'cart',
      component: cart
		},
		{
			path: '/checkout',
			name: 'checkout',
			component: checkout
		},
		{
			path: '/payment/:way',
			name: 'payment',
			component: payment,
			children:[
				{
					path: '/payment/alipay',
					name: 'alipay',
					component: alipay
				},
				{
					path: '/payment/wechat',
					name: 'wechat',
					component: wechat
				}
			]
		},
    {
      path: '/about',
      name: 'about',
      component: about
    }, 
  ]
})
