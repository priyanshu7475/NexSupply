const pool = require("../config/db");

const getDashboardKPIs = async (req, res) => {
    try {
        const activeTrucksResult = await pool.query(`
            SELECT COUNT(*) AS count
            FROM trucks
            WHERE status IN ('IN_TRANSIT', 'ARRIVED', 'LOADING')
        `);

        const dockResult = await pool.query(`
            SELECT
                COUNT(*) AS total,
                COUNT(*) FILTER (WHERE status = 'OCCUPIED') AS occupied
            FROM dock_doors
        `);

        const yardResult = await pool.query(`
            SELECT
                COALESCE(SUM(capacity), 0) AS capacity,
                COALESCE(SUM(occupancy), 0) AS occupancy
            FROM yard_locations
        `);

        const activeTrucks = Number(activeTrucksResult.rows[0].count);

        const totalDocks = Number(dockResult.rows[0].total);
        const occupiedDocks = Number(dockResult.rows[0].occupied);

        const dockUtilization =
            totalDocks > 0
                ? Math.round((occupiedDocks / totalDocks) * 100)
                : 0;

        const yardCapacity = Number(yardResult.rows[0].capacity);
        const yardOccupancy = Number(yardResult.rows[0].occupancy);

        const yardUtilization =
            yardCapacity > 0
                ? Math.round((yardOccupancy / yardCapacity) * 100)
                : 0;

        res.json({
            activeTrucks,
            dockUtilization,
            yardUtilization
        });

    } catch (error) {
        console.error("Dashboard KPI error:", error);

        res.status(500).json({
            error: "Failed to fetch dashboard KPIs"
        });
    }
};

module.exports = {
    getDashboardKPIs
};