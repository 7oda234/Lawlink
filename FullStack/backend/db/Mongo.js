import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        // الاتصال بقاعدة بيانات الشات
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/lawlink_chat';
        await mongoose.connect(mongoURI);
        console.log('🍃 MongoDB (Chat System) Connected Successfully!');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectMongoDB;