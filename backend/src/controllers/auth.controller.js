import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';

export async function register(req, res) {
  try {
    const { name, email, password, roleName } = req.body;
    const role = await Role.findOne({ name: roleName }) || await Role.findOne({ name: 'Sales Representative' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role: role._id });
    return res.json({ id: user._id });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate('role');
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id, roleId: user.role._id, roleName: user.role.name, name: user.name }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role.name } });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}