import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import bookRouter from './routes/book.routes.js';

dotenv.config();

const app =express();
const PORT = process.env.PORT || 3000;

//Middleware para interpretar JSON en req.doby
app.use(express.json());

//conexion
app.use('/books',bookRouter);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
