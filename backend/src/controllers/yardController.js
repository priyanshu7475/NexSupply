const pool = require("../config/db");

const getYardStatus = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                yard_location_id,
                location_name,
                capacity,
                occupancy,
                status
            FROM yard_locations
            ORDER BY yard_location_id
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Yard status error:", error);

        res.status(500).json({
            error: "Failed to fetch yard status"
        });
    }
};

module.exports = {
    getYardStatus
};
