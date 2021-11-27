import { Dashboard, Collection, Play } from 'pages'

export const routes = [
  { path: '/', component: Dashboard, authRequired: true, exact: true },
  {
    path: '/collection',
    component: Collection,
    authRequired: true,
  },
  {
    path: '/play',
    component: Play,
    authRequired: true,
  },
]
