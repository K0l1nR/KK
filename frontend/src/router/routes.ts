import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/register',
  },
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      { path: 'register', component: () => import('src/pages/UserRegister.vue') },
      { path: 'login', component: () => import('src/pages/UserLogin.vue') },
      { path: 'events', component: () => import('src/pages/Events.vue') },
      { path: 'events/create', component: () => import('src/pages/EventForm.vue') },
      { path: 'events/:id', component: () => import('src/pages/EventDetails.vue') },
      { path: 'events/:id/edit', component: () => import('src/pages/EventForm.vue') },
      { path: 'events/:eventId/participants', component: () => import('src/pages/EventParticipants.vue') },
      { path: 'register-to-event', component: () => import('src/pages/ParticipantRegisterToEvent.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/Error404.vue')
  }
];

export default routes;
