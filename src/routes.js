import HomePage from '@/pages/HomePage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import CardPage from '@/pages/CardPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/:usernameGitHub',
    component: ProfilePage,
    props: true,
  },
  {
    path: '/:usernameGitHub/card',
    component: CardPage,
    props: true,
  },
]

export default routes