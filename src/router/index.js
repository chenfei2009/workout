import Vue from 'vue'
import VueRouter from 'vue-router'
// import AddPlan from '../views/addPlan'
// import AddByRecord from '../views/addByRecord'
// import PlanDetail from '../views/planDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/plan',
    name: 'Plan',
    component: () => import('@/views/plan/index.vue'),
    redirect: '/plan/list',
    children: [
      {
        path: 'list',
        name: 'PlanList',
        component: () => import('@/views/plan/planList/index.vue')
      },
      {
        path: 'moves',
        name: 'moveList',
        component: () => import('@/views/plan/moveList/index.vue')
      },
      {
        path: 'add',
        name: 'addPlan',
        component: () => import('@/views/plan/addPlan/index.vue')
      },
      {
        path: 'add/record',
        name: 'addFromRecord',
        component: () => import('@/views/plan/addFromRecord/index.vue')
      }
    ]
  },
  {
    path: '/calendar',
    name: 'Cale',
    component: () => import('@/views/cale/index.vue'),
    meta: {
      keepAlive: false // 需要被缓存
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue')
  },
  {
    path: '/part',
    name: 'Part',
    component: () => import('@/views/part/index.vue')
  },
  {
    path: '/movement',
    name: 'Movement',
    component: () => import('@/views/movement/index.vue'),
    redirect: '/movement/list/:pid/:part',
    children: [
      {
        path: 'list/:pid/:part',
        name: 'ChooseMove',
        component: () => import('@/views/movement/chooseMove/index.vue')
      },
      {
        path: 'edit/:pid/:part',
        name: 'EditMove',
        component: () => import('@/views/movement/editMove/index.vue')
      }
    ]
  },
  {
    path: '/addMove',
    name: 'AddMove',
    component: () => import('@/views/addMove/index.vue')
  },
  {
    path: '/workout',
    name: 'Workout',
    component: () => import('@/views/workout/index.vue')
  },
  {
    path: '/break',
    name: 'Break',
    component: () => import('@/views/break/index.vue')
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('@/views/record/index.vue'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import('@/views/statistics/index.vue')
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path.includes('part')) {
//     from.meta.keepAlive = true
//   } else {
//     from.meta.keepAlive = false
//   }
//   next()
// })

export default router
