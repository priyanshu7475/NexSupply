require("dotenv").config();

const pool = require("./src/config/db");

async function generateProductionPlan() {
    try {
        /*
         * Read weekly demand forecast.
         * 48 rows = 12 weeks × 4 SKUs
         */
        const forecastResult = await pool.query(`
            SELECT
                forecast_date,
                sku_id,
                forecast_quantity
            FROM demand_forecast
            ORDER BY forecast_date, sku_id;
        `);

        let inserted = 0;
        let skipped = 0;

        /*
         * Factory mapping
         */
        const factoryMap = {
            1: 1,
            2: 1,
            3: 2,
            4: 2
        };

        for (const row of forecastResult.rows) {

            const skuId = Number(row.sku_id);
            const factoryId = factoryMap[skuId];

            if (!factoryId) {
                console.log(
                    `Skipping SKU ${skuId}: no factory mapping`
                );
                skipped++;
                continue;
            }

            const forecastDate = new Date(row.forecast_date);

            /*
             * The forecast represents a WEEK.
             *
             * Existing production can happen on any day
             * inside that 7-day period.
             */
            const weekStart = new Date(forecastDate);

            const weekEnd = new Date(forecastDate);
            weekEnd.setDate(weekEnd.getDate() + 7);

            /*
             * Calculate how much production already exists
             * for this SKU during this forecast week.
             */
            const existing = await pool.query(
                `
                SELECT COALESCE(SUM(planned_quantity), 0) AS planned_quantity
                FROM production_orders
                WHERE sku_id = $1
                  AND planned_date >= $2::date
                  AND planned_date < $3::date;
                `,
                [
                    skuId,
                    weekStart.toISOString().split("T")[0],
                    weekEnd.toISOString().split("T")[0]
                ]
            );

            const existingQuantity =
                Number(existing.rows[0].planned_quantity);

            const forecastQuantity =
                Number(row.forecast_quantity);

            /*
             * Only create the missing quantity.
             */
            const remainingQuantity =
                forecastQuantity - existingQuantity;

            if (remainingQuantity <= 0) {
                skipped++;

                console.log(
                    `Skipped: ${row.forecast_date} | SKU ${skuId} | ` +
                    `Forecast ${forecastQuantity} | ` +
                    `Existing ${existingQuantity}`
                );

                continue;
            }

            /*
             * Put additional production at the beginning
             * of the forecast week.
             */
            const plannedDate =
                weekStart.toISOString().split("T")[0];

            await pool.query(
                `
                INSERT INTO production_orders
                (
                    factory_id,
                    sku_id,
                    planned_quantity,
                    planned_date,
                    status,
                    actual_quantity
                )
                VALUES ($1, $2, $3, $4, 'PLANNED', NULL);
                `,
                [
                    factoryId,
                    skuId,
                    remainingQuantity,
                    plannedDate
                ]
            );

            inserted++;

            console.log(
                `Created: ${plannedDate} | ` +
                `SKU ${skuId} | ` +
                `Qty ${remainingQuantity} | ` +
                `Forecast ${forecastQuantity} | ` +
                `Existing ${existingQuantity}`
            );
        }

        console.log("\n--------------------------------");
        console.log("Production plan generation done");
        console.log("--------------------------------");
        console.log(`Inserted : ${inserted}`);
        console.log(`Skipped  : ${skipped}`);
        console.log(`Forecast : ${forecastResult.rows.length}`);
        console.log("--------------------------------");

    } catch (error) {
        console.error("Production plan error:", error);
    } finally {
        await pool.end();
    }
}

generateProductionPlan();