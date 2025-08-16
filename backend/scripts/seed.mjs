import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import Role from '../src/models/role.model.js'
import LeadStatus from '../src/models/status.model.js'
import User from '../src/models/user.model.js'

dotenv.config()

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI missing in .env')
  process.exit(1)
}

async function main() {
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  // Roles
  const roles = ['Admin', 'Sales Head', 'Sales Team Lead', 'Sales Representative']
  const roleDocs = {}
  for (const name of roles) {
    const doc = await Role.findOneAndUpdate({ name }, { name }, { upsert: true, new: true })
    roleDocs[name] = doc
  }
  console.log('Roles ensured:', roles.join(', '))

  // Lead Statuses
  const statuses = ['Registered','Contacted','Call Back','Follow-Up','Not Interested','Enrolled']
  for (const name of statuses) {
    await LeadStatus.findOneAndUpdate({ name }, { name }, { upsert: true })
  }
  console.log('Lead statuses ensured:', statuses.join(', '))

  // Admin user
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@skycrm.local'
  const adminPass = process.env.SEED_ADMIN_PASSWORD || 'Admin@123'
  const existing = await User.findOne({ email: adminEmail })
  if (!existing) {
    const passwordHash = await bcrypt.hash(adminPass, 10)
    await User.create({
      name: 'System Admin',
      email: adminEmail,
      passwordHash,
      role: roleDocs['Admin']._id
    })
    console.log(`Admin created: ${adminEmail} / ${adminPass}`)
  } else {
    console.log('Admin user already exists:', adminEmail)
  }

  await mongoose.disconnect()
  console.log('Seed complete.')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})