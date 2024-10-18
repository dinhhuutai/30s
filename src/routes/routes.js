import Dashboard from '../pages/Dashboard';
import Member from '~/pages/Member';
import Sms from '~/pages/Sms';
import Revenue from '~/pages/Revenue';
import BotTelegram from '~/pages/BotTelegram';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

import AdminAnalytics from '~/pagesAdmin/Menu/Dashboards/Analytics';
import AdminChartArea from '~/pagesAdmin/Menu/Dashboards/ChartArea';
import AdminExplore from '~/pagesAdmin/Menu/Pages/Explore';
import AdminHub from '~/pagesAdmin/Menu/Pages/Hub';
import AdminMailBox from '~/pagesAdmin/Menu/Applications/Mailbox';
import AdminChat from '~/pagesAdmin/Menu/Applications/Chat';
import AdminSection from '~/pagesAdmin/Menu/Applications/FAQSection';

import AdminUser from '~/pagesAdmin/Manage/User/List';
import AdminUserCreate from '~/pagesAdmin/Manage/User/Create';
import AdminKQXS from '~/pagesAdmin/Manage/KQXS/List';
import AdminKQXSCreate from '~/pagesAdmin/Manage/KQXS/Create';

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
        path: config.routes.botTelegram,
        component: BotTelegram,
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

export const routesAdmin = [
    {
        path: config.routes.adminAnalytics,
        component: AdminAnalytics,
        login: true,
    },
    {
        path: config.routes.adminChartArea,
        component: AdminChartArea,
        login: true,
    },
    {
        path: config.routes.adminExplore,
        component: AdminExplore,
        login: true,
    },
    {
        path: config.routes.adminHub,
        component: AdminHub,
        login: true,
    },
    {
        path: config.routes.adminMailBox,
        component: AdminMailBox,
        login: true,
    },
    {
        path: config.routes.adminChat,
        component: AdminChat,
        login: true,
    },
    {
        path: config.routes.adminSection,
        component: AdminSection,
        login: true,
    },
    {
        path: config.routes.adminUser,
        component: AdminUser,
        login: true,
    },
    {
        path: config.routes.adminUserCreate,
        component: AdminUserCreate,
        login: true,
    },
    {
        path: config.routes.adminKQXS,
        component: AdminKQXS,
        login: true,
    },
    {
        path: config.routes.adminKQXSCreate,
        component: AdminKQXSCreate,
        login: true,
    },
];
