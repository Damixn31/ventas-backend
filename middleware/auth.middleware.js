import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('❌ Token inválido:', err.message);
      return res.status(401).json({ error: 'Token inválido o expirado' });
    }

    req.user = decoded; // { id, username, rol }
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado: requiere rol admin' });
  }
  next();
};

