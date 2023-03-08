import App from './App.vue'

const routes = [
  {
    path: '/:usernameGitHub',
    component: App,
    props: true,
  },
]

export default routes