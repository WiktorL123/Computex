import mongoose from 'mongoose'
export const coonectDB = async () => {

    try {
        const con = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connected to MongoDB");
        console.log(`MongoDB connected: ${con.connection.host}, DB name: ${con.connection.name}`);

    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }

}