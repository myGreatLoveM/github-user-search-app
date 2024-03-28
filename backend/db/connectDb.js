import mongoose from 'mongoose'

export async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        console.log('Database connection established')
    } catch (error) {
        console.log('Error connecting to database')
        process.exit(1)
    }
}