import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create Roles
  console.log('Creating roles...');
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      description: 'System administrator with full access',
      isSystem: true,
    },
  });

  const moderatorRole = await prisma.role.upsert({
    where: { name: 'moderator' },
    update: {},
    create: {
      name: 'moderator',
      description: 'Moderator with limited administrative access',
      isSystem: true,
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      description: 'Regular user with basic access',
      isSystem: true,
    },
  });

  // Create Permissions
  console.log('Creating permissions...');
  const permissions = [
    // User permissions
    { name: 'user:create', description: 'Create users', resource: 'user', action: 'create' },
    { name: 'user:read', description: 'Read users', resource: 'user', action: 'read' },
    { name: 'user:update', description: 'Update users', resource: 'user', action: 'update' },
    { name: 'user:delete', description: 'Delete users', resource: 'user', action: 'delete' },
    
    // Role permissions
    { name: 'role:create', description: 'Create roles', resource: 'role', action: 'create' },
    { name: 'role:read', description: 'Read roles', resource: 'role', action: 'read' },
    { name: 'role:update', description: 'Update roles', resource: 'role', action: 'update' },
    { name: 'role:delete', description: 'Delete roles', resource: 'role', action: 'delete' },
    
    // File permissions
    { name: 'file:upload', description: 'Upload files', resource: 'file', action: 'create' },
    { name: 'file:read', description: 'Read files', resource: 'file', action: 'read' },
    { name: 'file:delete', description: 'Delete files', resource: 'file', action: 'delete' },
    
    // System permissions
    { name: 'system:analytics', description: 'View system analytics', resource: 'system', action: 'read' },
    { name: 'system:logs', description: 'View system logs', resource: 'system', action: 'read' },
  ];

  const createdPermissions = [];
  for (const permission of permissions) {
    const createdPermission = await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
    createdPermissions.push(createdPermission);
  }

  // Assign permissions to roles
  console.log('Assigning permissions to roles...');
  
  // Admin gets all permissions
  const adminPermissions = createdPermissions.map(permission => ({
    roleId: adminRole.id,
    permissionId: permission.id,
  }));

  // Moderator gets limited permissions
  const moderatorPermissionNames = [
    'user:read', 'user:update', 'file:read', 'file:delete', 'system:logs'
  ];
  const moderatorPermissions = createdPermissions
    .filter(p => moderatorPermissionNames.includes(p.name))
    .map(permission => ({
      roleId: moderatorRole.id,
      permissionId: permission.id,
    }));

  // User gets basic permissions
  const userPermissionNames = ['file:upload', 'file:read'];
  const userPermissions = createdPermissions
    .filter(p => userPermissionNames.includes(p.name))
    .map(permission => ({
      roleId: userRole.id,
      permissionId: permission.id,
    }));

  // Create role permissions (delete existing first to avoid duplicates)
  await prisma.rolePermission.deleteMany({});
  await prisma.rolePermission.createMany({
    data: [...adminPermissions, ...moderatorPermissions, ...userPermissions],
  });

  // Create Admin User
  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash('Admin123!', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@devlink.com' },
    update: {},
    create: {
      email: 'admin@devlink.com',
      password: hashedPassword,
      name: 'System Administrator',
      firstName: 'System',
      lastName: 'Administrator',
      isEmailVerified: true,
      isActive: true,
      roleId: adminRole.id,
    },
  });

  // Create admin user preferences
  await prisma.userPreference.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      theme: 'dark',
      language: 'en',
      timezone: 'UTC',
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      twoFactorNotifications: true,
    },
  });

  // Create Demo Users
  console.log('Creating demo users...');
  const demoUsers = [
    {
      email: 'moderator@devlink.com',
      name: 'Demo Moderator',
      firstName: 'Demo',
      lastName: 'Moderator',
      roleId: moderatorRole.id,
    },
    {
      email: 'user@devlink.com',
      name: 'Demo User',
      firstName: 'Demo',
      lastName: 'User',
      roleId: userRole.id,
    },
  ];

  for (const userData of demoUsers) {
    const hashedUserPassword = await bcrypt.hash('Password123!', 12);
    
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        ...userData,
        password: hashedUserPassword,
        isEmailVerified: true,
        isActive: true,
      },
    });

    // Create user preferences
    await prisma.userPreference.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        theme: 'light',
        language: 'en',
        timezone: 'UTC',
        emailNotifications: true,
        pushNotifications: true,
        marketingEmails: false,
        twoFactorNotifications: true,
      },
    });
  }

  // Create Sample API Keys
  console.log('Creating sample API keys...');
  const apiKeyHash = await bcrypt.hash('dev-api-key-123', 12);
  
  await prisma.apiKey.upsert({
    where: { key: 'dev-key-001' },
    update: {},
    create: {
      name: 'Development API Key',
      key: 'dev-key-001',
      hashedKey: apiKeyHash,
      permissions: {
        endpoints: ['users:read', 'auth:verify'],
        rateLimit: 1000,
      },
      isActive: true,
    },
  });

  console.log('Database seeding completed successfully!');
  console.log('\nReady to use credentials:');
  console.log('Admin User: admin@devlink.com / Admin123!');
  console.log('Moderator User: moderator@devlink.com / Password123!');
  console.log('Regular User: user@devlink.com / Password123!');
  console.log('API Key: dev-key-001');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 