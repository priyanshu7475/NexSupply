const fs = require("fs");

const skus = [
    { id: 1, base: 4200 },
    { id: 2, base: 2800 },
    { id: 3, base: 1900 },
    { id: 4, base: 1500 }
];

const startDate = new Date("2026-08-24T00:00:00Z");

let sql = `
-- 12-WEEK S&OP DEMAND FORECAST
-- Generated development data

INSERT INTO demand_forecast
(forecast_id, sku_id, location_id, forecast_date,
 forecast_quantity, actual_quantity, forecast_method, confidence_score)
VALUES
`;

let forecastId = 5;
const rows = [];

for (let week = 0; week < 12; week++) {

    const date = new Date(startDate);
    date.setDate(date.getDate() + week * 7);

    const dateString = date.toISOString().split("T")[0];

    skus.forEach(sku => {

        // Gradual demand variation across the planning horizon
        const growth = 1 + week * 0.025;

        const variation = [
            1.00,
            1.04,
            0.98,
            1.07
        ][week % 4];

        const forecast = Math.round(
            sku.base * growth * variation
        );

        const actual = Math.round(
            forecast * (0.92 + (week % 3) * 0.02)
        );

        const confidence = (
            0.87 + ((week + sku.id) % 5) * 0.01
        ).toFixed(2);

        rows.push(
            `(${forecastId}, ${sku.id}, 1, '${dateString}', ${forecast}, ${actual}, 'Moving Average', ${confidence})`
        );

        forecastId++;
    });
}

sql += rows.join(",\n") + ";\n";

fs.writeFileSync(
    "./data/12_week_forecast.sql",
    sql
);

console.log(
    `Generated ${rows.length} forecast records.`
);