const pool = require("../config/db");

const getAlerts = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                alert_id,
                alert_type,
                message,
                severity,
                created_at,
                status,
                truck_id,
                shipment_id,
                dock_id
            FROM alerts
            WHERE status = 'OPEN'
            ORDER BY created_at DESC
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Alerts error:", error);

        res.status(500).json({
            error: "Failed to fetch alerts"
        });
    }
};

module.exports = {
    getAlerts
};