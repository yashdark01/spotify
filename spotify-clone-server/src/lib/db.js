import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
        console.log('Database connected!');
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}