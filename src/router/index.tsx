import { Project, Detail, Monitor } from '../pages';
import { createBrowserRouter } from 'react-router-dom';

export const PAGE_NAME = {
    PROJECT: '/',
    DETAIL: '/detail',
    MONITOR: '/monitor',
};

export const router = createBrowserRouter([
    {
        path: PAGE_NAME.PROJECT,
        element: <Project />,
    },
    {
        path: PAGE_NAME.DETAIL,
        element: <Detail />,
    },
    {
        path: PAGE_NAME.MONITOR,
        element: <Monitor />,
    },
]);