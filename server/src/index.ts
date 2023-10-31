import express from 'express';
import bodyParser from 'body-parser';
import routes from './infrastructure/routes/userRoutes.routes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Define tus rutas CRUD aquí
app.use('/api/users', routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
