import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { ClientRoutes } from '../modules/political/political.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
