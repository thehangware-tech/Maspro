# Sports Wholesale Monorepo Plan

This file tracks the implementation progress of our hybrid B2B/B2C sports e-commerce platform monorepo workspace.

## Progress Checklist

- [x] **Phase 1: Workspace Infrastructure**
  - [x] Root `package.json` with Bun workspace configuration
  - [x] Root `turbo.json` task pipeline config
  - [x] Shared configuration packages (`config-typescript`, `config-eslint`)
  - [x] Global `.env` template file

- [ ] **Phase 2: Shared Packages**
  - [ ] Shared database package `@sports/db` (`package.json`, `drizzle.config.ts`)
  - [ ] Drizzle ORM client initialization (`packages/db/src/index.ts` with Neon pooling and `prepare: false`)
  - [ ] Database schemas (`packages/db/src/schema.ts` defining `users`, `products` with JSONB wholesale tiers, and `orders`)
  - [ ] Shared auth package `@sports/auth` placeholder (Clerk helpers)

- [ ] **Phase 3: Applications Scaffolding**
  - [ ] Ingest `@sports/db` inside `apps/customer-web`
  - [ ] Configure `apps/customer-web/package.json` and workspaces linking

---

## Architectural Decisions Reference

### 1. Database & ORM

- **Provider:** Neon PostgreSQL
- **ORM:** Drizzle ORM
- **Driver:** `postgres` (postgres-js) TCP driver.
- **Pooling:** Pooled connections string with `prepare: false` configured in the driver options to avoid PgBouncer session pooling issues.

### 2. Authentication

- **Provider:** Clerk
- **Syncing:** Next.js Clerk webhook receiver endpoint dynamically updates the local `users` table.
- **Roles:** Admin panel access is guarded by verifying `user.publicMetadata.role === "admin"`.

### 3. Wholesale (B2B) Pricing & Checkout

- **Rule:** Wholesale pricing and payment split rules are globally triggered if a customer's cart value is $\ge$ ₹20,000 OR total item count is $\ge$ 10.
- **B2C Checkout:** Pay flat ₹150 delivery fee upfront via Razorpay, pay remaining balance on delivery.
- **B2B Checkout:** Pay 30% advance fee upfront via Razorpay, pay remaining balance on delivery.

### 4. Logistics

- **Aggregation:** NimbusPost
- **Routing Rules:** Under 2kg is routed via Air courier. Heavy items ($\ge$ 2kg) are routed via Surface freight. Shipping rates are dynamically queried via API and added to the customer invoice at checkout.

### 5. Applications & User Interfaces

- **Customer UI:** Dedicated Next.js web application (`apps/customer-web`) and an Expo mobile application (`apps/customer-app`) for end customers.
- **Admin UI:** Dedicated Expo universal application (`apps/admin-app`) serving as the administrative dashboard and management portal.
- **UI Components:** There is no shared UI package. UI components and styling (Tailwind CSS / NativeWind) will be defined and maintained independently within each application (`customer-web`, `customer-app`, `admin-app`) to allow for maximum flexibility and dedicated layouts.
