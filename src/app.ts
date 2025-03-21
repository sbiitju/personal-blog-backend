import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandlers';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: '*' }));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// application routes
app.use('/api', router);

// Test route
app.get('/', async (req: Request, res: Response) => {
  const message = 'Personal Blog server is running';
  res.send(message);
});

// Catch-all route for client-side routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
