const pool = require("../config/db");

const getForecast = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                forecast_date,
                SUM(forecast_quantity) AS forecast_quantity,
                SUM(actual_quantity) AS actual_quantity,
                ROUND(AVG(confidence_score) * 100, 0) AS confidence
            FROM demand_forecast
            GROUP BY forecast_date
            ORDER BY forecast_date ASC;
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Forecast error:", error);

        res.status(500).json({
            error: "Failed to fetch demand forecast"
        });
    }
};

const getSupplyDemand = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                d.forecast_date AS date,
                COALESCE(SUM(p.planned_quantity), 0) AS supply,
                MAX(d.forecast_quantity) AS demand
            FROM (
                SELECT
                    forecast_date,
                    SUM(forecast_quantity) AS forecast_quantity
                FROM demand_forecast
                GROUP BY forecast_date
            ) d
            LEFT JOIN production_orders p
                ON p.planned_date >= d.forecast_date
                AND p.planned_date < d.forecast_date + INTERVAL '7 days'
            GROUP BY
                d.forecast_date
            ORDER BY
                d.forecast_date ASC;
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Supply-demand error:", error);

        res.status(500).json({
            error: "Failed to fetch supply-demand data"
        });
    }
};

const getPlanningKPIs = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                ROUND(AVG(confidence_score) * 100, 0) AS forecast_accuracy,
                COUNT(DISTINCT sku_id) AS active_skus
            FROM demand_forecast;
        `);

        res.json(result.rows[0]);

    } catch (error) {
        console.error("Planning KPI error:", error);

        res.status(500).json({
            error: "Failed to fetch planning KPIs"
        });
    }
};

module.exports = {
    getForecast,
    getSupplyDemand,
    getPlanningKPIs
};