import Dashboard from '../pages/Dashboard';
import Member from '~/pages/Member';
import Sms from '~/pages/Sms';
import Revenue from '~/pages/Revenue';

import config from '~/config';

export const routes = [
    {
        path: config.routes.dashboard,
        component: Dashboard,
    },
    {
        path: config.routes.member,
        component: Member,
    },
    {
        path: config.routes.sms,
        component: Sms,
    },
    {
        path: config.routes.revenue,
        component: Revenue,
    },
];
