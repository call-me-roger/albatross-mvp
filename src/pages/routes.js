import { Dashboard, Collection } from 'pages'

export const routes = [
  { path: '/', component: Dashboard, authRequired: true, exact: true },
  {
    path: '/collection',
    component: Collection,
    authRequired: true,
  },
]
