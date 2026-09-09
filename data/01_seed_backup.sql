-- NexSupply Seed Data
-- Development / local environment only

BEGIN;

-- =========================
-- 1. MASTER DATA
-- =========================

INSERT INTO products (product_id, product_name, category, description)
VALUES
(1, 'Classic Cotton T-Shirt', 'Apparel', 'Basic cotton crew-neck t-shirt'),
(2, 'Slim Fit Denim', 'Apparel', 'Slim fit denim jeans'),
(3, 'Performance Hoodie', 'Apparel', 'Lightweight performance hoodie');

INSERT INTO locations (location_id, location_name, location_type, city, country)
VALUES
(1, 'Kolkata Distribution Center', 'WAREHOUSE', 'Kolkata', 'India'),
(2, 'Bengaluru Distribution Center', 'WAREHOUSE', 'Bengaluru', 'India'),
(3, 'Mumbai Factory', 'FACTORY', 'Mumbai', 'India'),
(4, 'Delhi Supplier Hub', 'SUPPLIER', 'Delhi', 'India'),
(5, 'Pune Factory', 'FACTORY', 'Pune', 'India');

INSERT INTO skus
(sku_id, product_id, sku_code, description, size, color)
VALUES
(1, 1, 'TSH-BLK-M', 'Classic Cotton T-Shirt', 'M', 'Black'),
(2, 1, 'TSH-WHT-L', 'Classic Cotton T-Shirt', 'L', 'White'),
(3, 2, 'DEN-BLU-32', 'Slim Fit Denim', '32', 'Blue'),
(4, 3, 'HOD-GRY-L', 'Performance Hoodie', 'L', 'Grey');

INSERT INTO suppliers
(supplier_id, supplier_name, location_id, contact_info, lead_time_days, moq)
VALUES
(1, 'Delhi Textile Suppliers', 4, 'contact@delhitextile.example', 7, 500),
(2, 'North India Fabrics', 4, 'sales@northfabrics.example', 10, 1000);

INSERT INTO factories
(factory_id, factory_name, location_id, production_capacity)
VALUES
(1, 'Mumbai Apparel Factory', 3, 10000),
(2, 'Pune Garment Factory', 5, 8000);

INSERT INTO carriers
(carrier_id, carrier_name, contact_info)
VALUES
(1, 'BlueDart Logistics', 'operations@bluedart.example'),
(2, 'Delhivery Freight', 'fleet@delhivery.example'),
(3, 'TCI Express', 'support@tci.example');

-- =========================
-- 2. PLANNING
-- =========================

INSERT INTO demand_forecast
(forecast_id, sku_id, location_id, forecast_date,
 forecast_quantity, actual_quantity, forecast_method, confidence_score)
VALUES
(1, 1, 1, '2026-08-24', 4200, 3950, 'Moving Average', 0.91),
(2, 2, 1, '2026-08-24', 2800, 2700, 'Moving Average', 0.89),
(3, 3, 1, '2026-08-24', 1900, 1750, 'Exponential Smoothing', 0.87),
(4, 4, 1, '2026-08-24', 1500, 1400, 'Exponential Smoothing', 0.90);

INSERT INTO production_orders
(production_order_id, factory_id, sku_id, planned_quantity,
 planned_date, status, actual_quantity)
VALUES
(1, 1, 1, 4000, '2026-08-24', 'IN_PROGRESS', 2200),
(2, 1, 2, 3000, '2026-08-25', 'PLANNED', NULL),
(3, 2, 3, 2200, '2026-08-25', 'PLANNED', NULL),
(4, 2, 4, 1800, '2026-08-26', 'PLANNED', NULL);

INSERT INTO inventory
(inventory_id, location_id, sku_id, quantity,
 reserved_quantity, inventory_date, stock_status)
VALUES
(1, 1, 1, 5200, 1200, '2026-08-24', 'HEALTHY'),
(2, 1, 2, 3100, 800, '2026-08-24', 'HEALTHY'),
(3, 1, 3, 1800, 600, '2026-08-24', 'LOW'),
(4, 1, 4, 2400, 500, '2026-08-24', 'HEALTHY');

INSERT INTO fabric_procurement
(procurement_id, supplier_id, factory_id, material,
 quantity, required_date, lead_time_days, status)
VALUES
(1, 1, 1, 'Cotton Fabric', 6000, '2026-08-27', 7, 'IN_TRANSIT'),
(2, 2, 2, 'Denim Fabric', 4000, '2026-08-29', 10, 'ORDERED'),
(3, 1, 2, 'Polyester Blend', 3000, '2026-08-30', 7, 'ORDERED');

-- =========================
-- 3. SHIPMENTS
-- =========================

INSERT INTO shipments
(shipment_id, shipment_reference, sku_id, quantity,
 origin_location_id, destination_location_id,
 planned_arrival, priority, status)
VALUES
(1, 'SHP-1001', 1, 1200, 3, 1,
 '2026-08-24 11:30:00', 'HIGH', 'IN_TRANSIT'),

(2, 'SHP-1002', 2, 900, 3, 1,
 '2026-08-24 12:15:00', 'MEDIUM', 'ARRIVED'),

(3, 'SHP-1003', 3, 700, 5, 1,
 '2026-08-24 13:00:00', 'HIGH', 'IN_TRANSIT'),

(4, 'SHP-1004', 4, 600, 5, 1,
 '2026-08-24 14:30:00', 'LOW', 'SCHEDULED'),

(5, 'SHP-1005', 1, 1500, 3, 1,
 '2026-08-24 16:00:00', 'HIGH', 'SCHEDULED');

-- =========================
-- 4. EXECUTION
-- =========================

INSERT INTO trailers
(trailer_id, carrier_id, load_type, priority, status)
VALUES
(1, 1, 'DRY VAN', 'HIGH', 'ATTACHED'),
(2, 2, 'DRY VAN', 'MEDIUM', 'ATTACHED'),
(3, 3, 'CONTAINER', 'HIGH', 'ATTACHED'),
(4, 1, 'DRY VAN', 'LOW', 'AVAILABLE'),
(5, 2, 'DRY VAN', 'HIGH', 'AVAILABLE');

INSERT INTO trucks
(truck_id, carrier_id, trailer_id, shipment_id, status)
VALUES
(1, 1, 1, 1, 'IN_TRANSIT'),
(2, 2, 2, 2, 'ARRIVED'),
(3, 3, 3, 3, 'IN_TRANSIT'),
(4, 1, 4, 4, 'SCHEDULED'),
(5, 2, 5, 5, 'SCHEDULED');

INSERT INTO dock_doors
(dock_id, dock_number, dock_type, capability, status)
VALUES
(1, 'D01', 'INBOUND', 'Standard pallet loads', 'OCCUPIED'),
(2, 'D02', 'INBOUND', 'Standard pallet loads', 'AVAILABLE'),
(3, 'D03', 'INBOUND', 'Heavy loads', 'MAINTENANCE'),
(4, 'D04', 'INBOUND', 'Standard pallet loads', 'AVAILABLE'),
(5, 'D05', 'OUTBOUND', 'Finished goods', 'OCCUPIED'),
(6, 'D06', 'OUTBOUND', 'Finished goods', 'AVAILABLE');

INSERT INTO yard_locations
(yard_location_id, location_name, capacity, occupancy, status)
VALUES
(1, 'Y01-A', 20, 16, 'OCCUPIED'),
(2, 'Y01-B', 20, 11, 'OCCUPIED'),
(3, 'Y02-A', 15, 15, 'FULL'),
(4, 'Y02-B', 15, 7, 'AVAILABLE'),
(5, 'Y03-A', 25, 14, 'OCCUPIED'),
(6, 'Y03-B', 25, 8, 'AVAILABLE');

-- =========================
-- 5. APPOINTMENTS
-- =========================

INSERT INTO appointments
(appointment_id, shipment_id, truck_id, dock_id,
 scheduled_arrival, status)
VALUES
(1, 1, 1, 1, '2026-08-24 11:30:00', 'IN_PROGRESS'),
(2, 2, 2, 2, '2026-08-24 12:15:00', 'ARRIVED'),
(3, 3, 3, 4, '2026-08-24 13:00:00', 'SCHEDULED'),
(4, 4, 4, 6, '2026-08-24 14:30:00', 'SCHEDULED'),
(5, 5, 5, 2, '2026-08-24 16:00:00', 'SCHEDULED');

-- =========================
-- 6. TRUCK TRACKING
-- =========================

INSERT INTO truck_tracking
(tracking_id, truck_id, latitude, longitude,
 speed, eta, timestamp)
VALUES
(1, 1, 19.0760, 72.8777, 48.50,
 '2026-08-24 11:25:00', '2026-08-24 10:55:00'),

(2, 3, 18.5204, 73.8567, 42.20,
 '2026-08-24 13:10:00', '2026-08-24 11:00:00'),

(3, 2, 22.5726, 88.3639, 0.00,
 '2026-08-24 12:15:00', '2026-08-24 11:05:00'),

(4, 4, 18.5204, 73.8567, 35.00,
 '2026-08-24 14:45:00', '2026-08-24 11:10:00');

-- =========================
-- 7. DOCK ASSIGNMENTS
-- =========================

INSERT INTO dock_assignments
(assignment_id, truck_id, dock_id, appointment_id,
 assigned_time, status, reason,
 recommended_dock, recommendation_reason, alternative_dock)
VALUES
(1, 1, 1, 1,
 '2026-08-24 10:50:00',
 'ACTIVE',
 'High priority inbound shipment',
 1,
 'Assigned because dock is compatible and available at appointment time',
 4),

(2, 2, 2, 2,
 '2026-08-24 11:00:00',
 'ACTIVE',
 'Standard inbound appointment',
 2,
 'Nearest available compatible inbound dock',
 4),

(3, 3, 4, 3,
 '2026-08-24 11:05:00',
 'PLANNED',
 'High priority shipment',
 4,
 'Dock D04 selected to avoid congestion at D02',
 2);

-- =========================
-- 8. ALERTS
-- =========================

INSERT INTO alerts
(alert_id, alert_type, truck_id, shipment_id, dock_id,
 message, severity, created_at, status)
VALUES
(1, 'ETA_DELAY', 3, 3, 4,
 'Truck TRK-003 is running approximately 10 minutes behind planned ETA.',
 'WARNING',
 '2026-08-24 11:05:00',
 'OPEN'),

(2, 'YARD_CONGESTION', NULL, NULL, NULL,
 'Yard zone Y02-A has reached full capacity.',
 'HIGH',
 '2026-08-24 10:45:00',
 'OPEN'),

(3, 'DOCK_MAINTENANCE', NULL, NULL, 3,
 'Dock D03 is unavailable due to scheduled maintenance.',
 'INFO',
 '2026-08-24 09:00:00',
 'OPEN');

COMMIT;