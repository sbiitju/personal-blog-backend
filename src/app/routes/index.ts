import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { ClientRoutes } from '../modules/political/political.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { BiographRoutes } from '../modules/biograph/biograph.route';
import { ContentRoutes } from '../modules/content/content.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BannerRoutes } from '../modules/banner/banner.route';

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
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
