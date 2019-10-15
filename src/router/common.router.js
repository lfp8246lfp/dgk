import NoPermission from '../views/common/403.vue';
import NotFound from '../views/common/404.vue';
import ServerError from '../views/common/502.vue';
import Welcome from '../views/common/welcome.vue';

export default [
    {
        path: '/403',
        component: NoPermission,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/502',
        component: ServerError,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/404',
        component: NotFound,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/welcome',
        alias: '/',
        component: Welcome
    }
];
