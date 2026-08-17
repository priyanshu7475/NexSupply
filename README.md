# NexSupply
Integrated S&amp;OP and Intelligent Yard &amp; Dock Management

Frontend deployed link : https://nex-supply.vercel.app/

## What is NexSupply?

NexSupply is a proposed **SmartSupply Command Center** for TrendWear Apparel. It combines two supply-chain use cases into one connected planning and execution platform:

- **E2 — “Where’s My Truck?”**: truck and shipment visibility, ETA monitoring, yard management, dock-door planning, and delivery execution.
- **P2 — Integrated S&OP**: demand forecasting, supply planning, constraint-aware decisions, and rapid what-if scenario analysis.

The central idea is to close the gap between what the business plans and what is actually happening in the yard, at the docks, and on the road. Planning should account for real execution constraints, while execution changes—such as truck delays, dock unavailability, or yard congestion—should feed back into the plan.

## The problem we are solving

Traditional planning and logistics operations often work in silos. Warehouse teams may not know where trucks are or which dock to assign, while planning teams may build forecasts without current information about truck availability, dock capacity, or yard space. This causes manual scheduling, congestion, missed delivery windows, slow replanning, and inefficient use of people and facilities.

This is especially challenging for apparel supply chains, where demand changes quickly across styles, sizes, colors, and seasonal collections.

## What the project is intended to accomplish

NexSupply is intended to provide one operational view across the complete flow:

**Forecast → Plan → Procure → Produce → Ship → Track → Assign yard and dock → Receive → Deliver → Learn and replan**

The long-term solution will use shared master and operational data—such as products/SKUs, suppliers, shipments, carriers, locations, trucks, trailers, appointments, yard slots, and dock doors—to support:

- Real-time shipment, truck, trailer, yard, and dock visibility.
- ETA monitoring, delay detection, and operational impact assessment.
- Recommended dock-door assignments and alternative assignments when constraints change.
- Priority-based handling for urgent shipments and upcoming arrivals.
- Demand and supply plans that consider dock capacity, truck availability, and yard space.
- What-if analysis for demand surges, dock disruptions, and capacity constraints.
- A bidirectional feedback loop where execution constraints trigger planning updates and impact analysis.

## What is implemented in the current HTML prototype

The current frontend is a navigable SmartSupply Command Center demonstration with four views:

### Overview

- Explains the E2 and P2 problem statements.
- Presents the E2 execution module, P2 planning module, and bidirectional integration concept.
- Shows intended impact metrics and links to the dashboard and planning views.

### Live Dashboard

- KPI cards for active trucks, dock utilization, yard occupancy, and average wait time.
- A visual yard map showing available, occupied, and loading slots.
- Live-alert examples for truck delays, dock capacity, arrivals, plan updates, and demand spikes.
- Dock-door status with truck, action, ETA, and status information.
- Fleet status with routes and arrival states.
- Dock throughput progress and hourly truck-arrival charts.

### S&OP Planning

- Forecast accuracy, plan-versus-actual, replanning time, and active-SKU KPIs.
- A 12-week demand forecast compared with capacity.
- Weekly S&OP unit plans and supply-versus-demand balance.
- Interactive scenarios for a baseline plan, a 30% demand surge, and a dock disruption.
- Example scenario outcomes such as extra truck requirements, rerouting, and delay impact.

### Team

- Team members, roles, institute, mentors, and the E2 + P2 project combination.

The current HTML uses simulated data and charts to communicate the workflow and business value. It is a frontend proof of concept; live tracking feeds, persistent data, backend APIs, recommendation logic, authentication, and external-system integrations are future implementation work.

## Planned future implementation

The next stages are intended to move the prototype toward a working product:

1. **Core data model and APIs** — model trucks, trailers, shipments, appointments, carriers, yard locations, dock doors, products, inventory, and planning constraints.
2. **Operational decision engine** — recommend dock doors, suggest reassignment, detect delays, identify conflicts, and assess operational impact.
3. **Live integrations** — connect transportation, warehouse, ERP, and tracking systems through bidirectional APIs.
4. **Planning and replanning engine** — connect forecasts and S&OP plans to real capacity, yard, dock, and transportation constraints.
5. **Search and exception management** — search by tracking number, trailer ID, or shipment reference and provide actionable alerts.
6. **Advanced visualization** — add live maps, route progress, delivery tracking, and facility-level operational views.
7. **AI/Copilot assistance** — support natural-language questions, recommendations, impact analysis, and planning support once reliable operational data is available.

## Suggested demonstration scenarios

- **Normal arrival:** a truck arrives on time and receives its planned dock assignment.
- **Delayed truck:** the ETA changes, the reserved dock is impacted, and an alternative assignment is recommended.
- **High-priority load:** an urgent shipment enters the queue and receives priority handling.
- **Dock unavailable:** an assigned dock goes offline and the system recommends another suitable dock.
- **Demand surge:** a seasonal demand increase triggers a capacity check and rapid replanning.

## Team

This project was prepared for the NPN SCM Hackathon by the Computer Science and Business Systems team at Academy of Technology:

- Priyanshu Kumar — Team Leader, Frontend & ML
- Tushar Paul — Full-Stack Development
- Souvik Sinha — Backend & Database
- Supratik Sarkar — Architecture
- Raj Jaiswal — Data & Planning


## Project status

The repository currently contains the frontend concept and project documentation. The deployed frontend link above is the primary way to explore the current prototype. The PDFs used as project and mentor reference material are intentionally not part of this README update or the project documentation flow.
