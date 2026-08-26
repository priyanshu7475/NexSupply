const pool = require("../config/db");

const getDockStatus = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT ON (d.dock_id)
                d.dock_number,
                t.truck_id,
                s.shipment_reference,
                a.scheduled_arrival,
                d.status AS dock_status,
                s.status AS shipment_status
            FROM dock_doors d
            LEFT JOIN appointments a
                ON d.dock_id = a.dock_id
            LEFT JOIN trucks t
                ON a.truck_id = t.truck_id
            LEFT JOIN shipments s
                ON a.shipment_id = s.shipment_id
            ORDER BY
                d.dock_id,
                CASE
                    WHEN a.status = 'IN_PROGRESS' THEN 1
                    WHEN a.status = 'ARRIVED' THEN 2
                    WHEN a.status = 'SCHEDULED' THEN 3
                    ELSE 4
                END,
                a.scheduled_arrival ASC;
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Dock status error:", error);

        res.status(500).json({
            error: "Failed to fetch dock status"
        });
    }
};

module.exports = {
    getDockStatus
};