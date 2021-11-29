import { Dashboard, Collection, Marketplace, Play } from 'pages'

export const routes = [
  { path: '/', component: Dashboard, authRequired: true, exact: true },
  {
    path: '/collection',
    component: Collection,
    authRequired: true,
  },
  {
    path: '/marketplace',
    component: Marketplace,
    authRequired: true,
  },
  {
    path: '/play',
    component: Play,
    authRequired: true,
  },
]
