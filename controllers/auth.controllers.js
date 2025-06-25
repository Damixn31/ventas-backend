import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import Usuario from '../models/Usuario.js';

// 🟢 Registrar usuario
export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await argon2.hash(password);
    await Usuario.create({ username, password: hash, rol: 'admin' });

    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// 🔐 Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { username } });

    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const passwordValida = await argon2.verify(user.password, password);
    if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // cambiar a true si usás HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    });

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// 🚪 Logout
export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });
  res.json({ message: 'Logout exitoso' });
};

// 👤 GetMe (requiere middleware que decodifique token)
export const getMe = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    rol: req.user.rol
  });
};

