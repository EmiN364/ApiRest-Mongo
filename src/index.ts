import express, { Request, Response } from 'express';
import issueRoutes from './routes/issues';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/users';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/tasks', taskRoutes);

app.use('/users', userRoutes);

app.use('/issues', issueRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

// Catch errors
app.use((err: Error, req: Request, res: Response) => {
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});