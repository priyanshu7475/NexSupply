require("dotenv").config();
const pool = require("./src/config/db");

async function checkAppointments() {
    try {
        const result = await pool.query(`
            SELECT
                a.appointment_id,
                a.dock_id,
                d.dock_number,
                a.truck_id,
                a.shipment_id,
                a.status,
                a.scheduled_arrival
            FROM appointments a
            JOIN dock_doors d
                ON a.dock_id = d.dock_id
            ORDER BY d.dock_id, a.scheduled_arrival;
        `);

        console.table(result.rows);

    } catch (error) {
        console.error(error);
    } finally {
        await pool.end();
    }
}

checkAppointments();