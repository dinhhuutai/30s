import Dashboard from '../pages/Dashboard';
import Member from '~/pages/Member';
import Sms from '~/pages/Sms';
import Revenue from '~/pages/Revenue';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

import config from '~/config';

export const routes = [
    {
        path: config.routes.dashboard,
        component: Dashboard,
        login: true,
    },
    {
        path: config.routes.member,
        component: Member,
        login: true,
    },
    {
        path: config.routes.sms,
        component: Sms,
        login: true,
    },
    {
        path: config.routes.revenue,
        component: Revenue,
        login: true,
    },
    {
        path: config.routes.login,
        component: Login,
        isPageLogin: true,
    },
    {
        path: config.routes.register,
        component: Register,
        isPageLogin: true,
    },
];
