import dns from "dns";
import mongoose from "mongoose";
import env from "../Config/env.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGO_URI);

        console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("ERROR NAME:", error.name);
        console.log("ERROR MESSAGE:", error.message);
        console.log("ERROR CAUSE:", error.cause);

        process.exit(1);
    }
};

export default connectDB;

