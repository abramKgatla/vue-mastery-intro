import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '../views/EventList.vue'
import EventCreate from '../views/EventCreate.vue'
import EventShow from '../views/EventShow.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/:id',
    name: 'event-show',
    component: EventShow,
    props: true
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  }
]

const router = new VueRouter({
  //removing the # in our url
  mode: 'history',
  routes
})

export default router
