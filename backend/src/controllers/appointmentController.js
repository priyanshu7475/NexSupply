const pool = require("../config/db");

const getHourlyArrivals = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                TO_CHAR(scheduled_arrival, 'HH24:00') AS hour,
                COUNT(*) AS truck_count
            FROM appointments
            GROUP BY TO_CHAR(scheduled_arrival, 'HH24:00')
            ORDER BY hour;
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Hourly arrivals error:", error);

        res.status(500).json({
            error: "Failed to fetch hourly truck arrivals"
        });
    }
};

module.exports = {
    getHourlyArrivals
};