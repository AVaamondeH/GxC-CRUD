import express from 'express';
import bodyParser from 'body-parser';
import routes from './infrastructure/routes/userRoutes.routes';
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));
// Define tus rutas CRUD aquí
app.use('/api/users', routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
