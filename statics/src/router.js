import React from 'react';

import DefaultLayout from '@/layouts/DefaultLayout'

const layoutConfig = [
  //员工管理
  { auth: '/manager/index', path: '/manager/index', component: React.lazy(() => import('@/pages/manager/Manager')) },
  { auth: '/manager/add', path: '/manager/add', component: React.lazy(() => import('@/pages/manager/Add')) },
  { auth: '/manager/edit', path: '/manager/edit/:id', component: React.lazy(() => import('@/pages/manager/Add')) },
  //角色管理
  { auth: '/role/index', path: '/role/index', component: React.lazy(() => import('@/pages/role/Role')) },
  { auth: '/role/add', path: '/role/add', component: React.lazy(() => import('@/pages/role/Add')) },
  { auth: '/role/edit', path: '/role/edit/:id', component: React.lazy(() => import('@/pages/role/Add')) },

  //角色管理
  { auth: '/auth/index', path: '/auth/index', component: React.lazy(() => import('@/pages/auth/Auth')) },
  { auth: '/auth/add', path: '/auth/add/:pid', component: React.lazy(() => import('@/pages/auth/Add')) },
  { auth: '/auth/edit', path: '/auth/edit/:id', component: React.lazy(() => import('@/pages/auth/Add')) },

  { component: React.lazy(() => import('@/components/NotFound')) }
];

const config = [
  { path: '/login', component: React.lazy(() => import('@/pages/login/UserLogin')) },
  { path: '/logout', redirect : '/login', logout : true },
  { auth: 'index', authFail : '/login', path: '/', component : DefaultLayout, child : layoutConfig },
  { component: React.lazy(() => import('@/components/NotFound')) }
]

export default config;
