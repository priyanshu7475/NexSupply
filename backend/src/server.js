require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await pool.query("SELECT NOW()");

        console.log("Database connection successful");

        app.listen(PORT, () => {
            console.log(`NexSupply API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    }
}

startServer();