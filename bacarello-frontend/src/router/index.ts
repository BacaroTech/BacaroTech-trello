import { createRouter, createWebHistory } from 'vue-router'
import UserView from '@/views/UserView.vue'
import AppHome from '@/views/AppHome.vue'
import Search from '@/views/Search.vue'
import BoardView from '@/views/BoardView.vue'
import CardDetail from '@/components/CardDetail.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome,
    },
    {
      path: '/board/:id',
      name: 'board',
      component: BoardView,
      children: [
        {
          path: 'card/:cardId',
          name: 'card',
          component: CardDetail,
        },
      ],
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserView,
      /* children: [
        {
          path: 'profile',
          component: UserProfile,
        },
        {
          path: 'posts',
          component: UserPosts,
        },
      ], */
    },
  ],
})

export default router
