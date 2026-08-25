const pool = require("../config/db");

const getTruckStatus = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                t.truck_id,
                t.status AS truck_status,
                s.shipment_reference,
                s.status AS shipment_status,
                tt.eta,
                tt.speed
            FROM trucks t
            LEFT JOIN shipments s
                ON t.shipment_id = s.shipment_id
            LEFT JOIN LATERAL (
                SELECT eta, speed
                FROM truck_tracking
                WHERE truck_id = t.truck_id
                ORDER BY timestamp DESC
                LIMIT 1
            ) tt ON true
            ORDER BY t.truck_id
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Truck status error:", error);

        res.status(500).json({
            error: "Failed to fetch truck status"
        });
    }
};

module.exports = {
    getTruckStatus
};