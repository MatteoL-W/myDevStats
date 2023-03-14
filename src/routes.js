import HomePage from '@/page/HomePage.vue'
import ProfilePage from '@/page/ProfilePage.vue'
import CardPage from '@/page/CardPage.vue'

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