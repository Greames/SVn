# Estimator V1 — Product Scope

## Purpose

Build a client-facing estimation platform for **Electrical, Plumbing and Painting work only**. Civil construction cost is explicitly out of scope.

The product should feel like a professional engineering/design estimation platform, not a local contractor quotation form.

## Core flow

1. Client creates a project.
2. Client uploads a floor plan (PDF/image/CAD when supported).
3. System extracts or assists with floor dimensions and room information.
4. System generates a **default estimate automatically** from the detected plan and configurable engineering rules.
5. Client can review every calculated quantity and replace/add/remove individual items.
6. Price and quantities recalculate immediately after changes.
7. Client can select Standard, Premium or Luxury packages where applicable.
8. System generates a professional quotation/report showing quantities, materials, labour, assumptions and optional items.
9. Final execution/order decisions require human review/approval.

## Services in scope

### 1. Electrical

The estimator should derive a starting configuration from room type and dimensions, including:

- Light points
- Fan points
- 5A/general sockets
- 15A/power sockets
- AC points
- Geyser/water-heater points
- Kitchen appliance points
- Switch boards
- Distribution board/panel requirements
- Wiring/cable quantities
- Circuit grouping
- Labour quantities

The system should calculate an estimated connected load and provide engineering guidance for:

- Total connected load (kW)
- Approximate demand/diversity load
- Single-phase vs three-phase recommendation
- Indicative main cable size
- Indicative circuit cable sizes
- Indicative MCB/RCCB/DB configuration
- Estimated monthly energy consumption and indicative cost

These are estimation/advisory calculations and must clearly state assumptions. Final electrical design must be verified by a qualified professional.

### 2. Plumbing

Room type and fixture configuration should generate a default plumbing schedule.

Examples:

- WC/commode
- Indian/manual WC vs Western/seat commode
- Wash basin
- Shower
- Health faucet
- Kitchen sink
- Floor drains
- Geyser connections
- Water inlet points
- Hot/cold water points
- Waste/drain points
- Other configurable fixtures

Every fixture must be editable individually. If a client changes a fixture, its reference material price and resulting estimate must update immediately.

Optional additions must be supported, for example:

- Glass shower partition
- Premium mixer
- Premium sanitaryware
- Additional fixture
- Custom plumbing point

### 3. Painting

Painting quantities should be calculated from the plan/room dimensions and configured wall/ceiling assumptions.

The estimate should support:

- Putty coats
- Primer coat
- Interior paint coats
- Exterior paint coats where applicable
- Ceiling paint
- Standard emulsion
- Premium/emulsion upgrades
- Royal/luxury finish upgrades
- Material quantity
- Labour quantity

The default number of coats must come from configurable business rules, not hard-coded UI text. Users must be able to choose an upgrade and see the price difference immediately.

## Packages

Use packages as a starting configuration, not a locked bundle:

### Standard

Basic practical specification for Electrical, Plumbing and Painting.

### Premium

Higher-quality fixtures/materials and enhanced specifications.

### Luxury

High-end fixtures/materials and additional features where appropriate.

**Important:** The client must be able to change any individual item after selecting a package. Package selection must never prevent item-level customization.

## Catalog / inventory model

For V1, supplier websites are the source for material/product pricing and catalogue information. The estimator should use supplier website data where available rather than inventing prices. Pricing is dynamic and should not be treated as a permanently hard-coded rate card.

Use a general product/catalogue model. Products can represent items commonly available from brands such as Cera, Jaquar, Havells, Polycab, etc.

Each catalogue item should support:

- Category
- Subcategory
- Brand
- Product name/model
- Specification
- Unit
- Reference price
- Package/tier
- Availability status
- Image/product URL when available
- Supplier/source reference where available
- Pricing retrieval/update timestamp where available

The estimator can present alternatives when a selected item is unavailable. A customer executive can then discuss alternatives with the client.

The system should not imply that catalogue availability is real-time unless the relevant supplier data is current and verified.

The exact supplier retrieval/integration mechanism is an implementation detail and is not otherwise fixed by this requirement.

## Quantity and recalculation rules

The calculation engine must separate:

- Detected quantities
- Engineering/default rules
- User overrides
- Catalogue selection
- Material price
- Labour price
- Optional additions
- Final calculated amount

Changing one item should update only the affected calculations and totals.

Example:

- Default room requires 4 light points.
- Client changes it to 6.
- Electrical point quantity becomes 6.
- Related material/labour totals update.
- Overall estimate updates immediately.

The same pattern must work for plumbing fixtures and painting specifications.

## Floor-plan intelligence

The plan is the primary input to the estimator.

V1 should be designed so that the system can identify or receive:

- Floor dimensions
- Room boundaries
- Room names/types
- Room dimensions
- Doors/windows where detectable
- Floor area
- Wall/ceiling area assumptions

If automatic detection is uncertain, show the detected value and allow the user to correct it before calculation.

Never silently treat an uncertain AI-detected dimension as exact.

## Client-facing experience

The UI should communicate:

> "We understand your plan, calculate the requirement, explain the engineering, and let you control every choice."

The main estimation screen should show:

- Floor-plan viewer
- Detected rooms/dimensions
- Service points overlaid on the plan
- Electrical / Plumbing / Painting tabs
- Current estimate amount
- Package selector
- Item-level edit controls
- Add-item controls
- Engineering summary
- Assumptions
- Generate quotation button

Avoid displaying civil construction cost anywhere in the estimator V1 flow.

## Optional Solar module

Solar is an optional advisory module, not one of the three core estimating categories.

If enabled, show:

- Recommended system size
- Estimated generation
- Approximate installation cost
- Estimated savings
- Indicative payback/ROI

Solar calculations must use location, estimated consumption, tariff and roof-area assumptions where available. Clearly label subsidy and ROI figures as estimates until verified.

## Quotation structure

The generated client quotation should contain:

1. Project information
2. Floor/area summary
3. Electrical estimate
4. Plumbing estimate
5. Painting estimate
6. Optional additions
7. Optional solar advisory
8. Material selections/catalogue references
9. Labour charges
10. Taxes if configured
11. Total estimate
12. Assumptions and exclusions
13. Revision/version number
14. Human review/approval note

Civil construction must be listed as **Excluded** rather than included as a zero-priced construction component.

## Architecture guidance

Keep calculation logic separate from presentation components. Prefer a domain calculation layer with explicit rules and typed inputs/outputs so that future changes to pricing, regional rules, package definitions or plan-recognition providers do not require rewriting the UI.

The initial prototype may use sample data, but sample values must be clearly distinguishable from production calculations.

## Acceptance criteria for V1

- No civil construction pricing.
- Electrical, plumbing and painting are the primary services.
- Default quote is generated automatically after project/plan information is available.
- Every major quantity can be edited.
- Users can add custom items.
- Package selection changes defaults but does not lock the client.
- Item changes recalculate affected prices immediately.
- Plan dimensions/rooms drive starting quantities where possible.
- Engineering assumptions are visible.
- Uncertain plan detection can be corrected manually.
- Catalogue data is generic and supplier website data is used as the approved pricing/catalogue source.
- Final quotation clearly separates included work, optional work and exclusions.
