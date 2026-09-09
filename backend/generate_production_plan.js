require("dotenv").config();

const pool = require("./src/config/db");

async function generateProductionPlan() {
    try {
        /*
         * Read the weekly demand forecast.
         * We already have 48 rows = 12 weeks × 4 SKUs.
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
         * Existing factory mapping:
         * SKU 1 -> Factory 1
         * SKU 2 -> Factory 1
         * SKU 3 -> Factory 2
         * SKU 4 -> Factory 2
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
                console.log(`Skipping SKU ${skuId}: no factory mapping`);
                skipped++;
                continue;
            }

            /*
             * Don't create another production order if one
             * already exists for this SKU and planning date.
             */
            const existing = await pool.query(
                `
                SELECT production_order_id
                FROM production_orders
                WHERE sku_id = $1
                  AND planned_date = $2
                LIMIT 1;
                `,
                [skuId, row.forecast_date]
            );

            if (existing.rows.length > 0) {
                skipped++;
                continue;
            }

            /*
             * Planned production is based on forecast demand.
             * This gives the S&OP chart an actual supply plan.
             */
            const quantity = Number(row.forecast_quantity);

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
                    quantity,
                    row.forecast_date
                ]
            );

            inserted++;

            console.log(
                `Created: ${row.forecast_date} | SKU ${skuId} | Qty ${quantity}`
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