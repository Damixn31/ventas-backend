import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import  { verifyToken, isAdmin } from './middleware/auth.middleware.js';
import productosRoutes from './routes/productos.routes.js';
import authRoutes from './routes/auth.routes.js';
import ventasRoutes from './routes/ventas.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// el cors tiene que ir primero que las rutas
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],  // los puertos de tu frontend
  method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  // solo si vas a usar cookies o auth headers
}));

app.use(cookieParser());

// RUTAS
app.use('/api/productos', productosRoutes); //, verifyToken, isAdmin
app.use('/api', authRoutes);
app.use('/api', ventasRoutes);




//app.options('*', cors()); //maneja OPTIONS explicitamente

app.get('/ping', (req, res) => {
   res.json({ message: 'pong' });
});
//app.get('/ping', (req, res) => {
// db.query('SELECT 1', (err, result) => {
// if (err) return res.status(500).json({ conectado: false, error: err.message });
// res.json({ conectado: true});
// });
//});


//inicio servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   console.log('Servidor corriendo en el puerto 4000');
});
