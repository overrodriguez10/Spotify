const { sequelize, User } = require('./models');
const bcrypt = require('bcryptjs');

async function syncDb() {
  try {
    console.log('Synchronizing database...');
    await sequelize.sync({ alter: true });
    
    const adminExists = await User.findOne({ where: { email: 'admin@admin.com' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Administrator',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Default admin created: admin@admin.com / admin123');
    } else {
      console.log('Admin already exists.');
    }
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

module.exports = syncDb;
