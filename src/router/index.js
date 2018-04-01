import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import blog from '@/components/blog'
import me from '@/components/me'
import artical from '@/components/artical'
import write from '@/components/write'
import contact from '@/components/contact'
import app from '@/App'
Vue.use(Router)

export default new Router({
	mode: 'history',
	linkActiveClass:'active',
	routes: [{
			path: '/',
			component: HelloWorld

		},
		{  
			path: '/hello',
			component: HelloWorld
		}, {
			
			path: '/blog',
			component:blog
		},{
			path: '/me',
			component:me
		},{
			path:'/artical/:id',
			name:'artical',
			component:artical
		},{
			path:'/write',
			component:write
		},{
			path:'/contact',
			component:contact
		}]
})
