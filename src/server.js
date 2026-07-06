import app from "./app.js";
import connectDB from "./database/index.js";
import env from "./config/env.js"

const startServer = async () => {
    await connectDB()

    app.listen(env.PORT , () => {
        console.log(`Server is running at PORT ${env.PORT}`)
    })
}

startServer();