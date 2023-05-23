import HomePage from '@/pages/HomePage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import CardPage from '@/pages/CardPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { title: 'Home' }
  },
  {
    path: '/:usernameGitHub',
    component: ProfilePage,
    props: true,
    meta: { title: `Profiles` }
  },
  {
    path: '/:usernameGitHub/card',
    component: CardPage,
    props: true,
    name: 'card',
    meta: { title: `Card` }
  },
]

export default routes