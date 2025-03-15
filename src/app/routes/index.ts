import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { ClientRoutes } from '../modules/political/political.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { BiographRoutes } from '../modules/biograph/biograph.route';
import { ContentRoutes } from '../modules/content/content.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/client',
    route: ClientRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/biograph',
    route: BiographRoutes,
  },
  {
    path: '/content',
    route: ContentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
