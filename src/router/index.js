import Vue from 'vue';
import VueRouter from 'vue-router';
// import Permission from '../api/Permission';
import routes from './routes';

Vue.use(VueRouter);

let router = new VueRouter({
    routes,
    mode: 'history'
});

// 路由权限控制
router.beforeEach(async (to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('HTTP_ACCESS_TOKEN');
        if (token == undefined) {
            next('/login');
        } else {
            next();
        }
    }
});

// export const constantRoutes = routes;

export default router;
