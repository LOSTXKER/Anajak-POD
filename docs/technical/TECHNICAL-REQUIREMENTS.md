# ⚙️ Technical Requirements
## Anajak POD - Print on Demand Platform

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Context / Zustand
- **Forms:** React Hook Form + Zod
- **UI Components:** Custom + shadcn/ui

### Backend
- **API:** Next.js API Routes / Node.js
- **Database:** PostgreSQL / Supabase
- **Authentication:** NextAuth.js + LINE Login
- **File Storage:** AWS S3 / Cloudinary
- **Email:** Resend / SendGrid

### Designer/Canvas
- **Canvas Library:** Fabric.js / Konva.js
- **Image Processing:** Sharp (Node.js)
- **PDF Generation:** jsPDF / Puppeteer

### Infrastructure
- **Hosting:** Vercel / AWS
- **CDN:** Vercel Edge / Cloudflare
- **Monitoring:** Vercel Analytics / Sentry

---

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Width | Devices |
|------------|-------|---------|
| `sm` | 640px | Mobile (landscape) |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large Desktop |
| `2xl` | 1536px | Extra Large |

### Mobile-First Approach

- Design for mobile first, enhance for larger screens
- Sticky CTA button on mobile
- Simplified navigation (hamburger menu)
- Touch-friendly elements (min 44px tap target)
- Fast loading (optimize images)

### Designer/Canvas on Mobile

- Touch-friendly controls
- Pinch to zoom
- Simplified toolbar
- Bottom sheet for tools
- Save and continue on desktop option

---

## ⚡ Performance Requirements

### Core Web Vitals Targets

| Metric | Target | Description |
|--------|--------|-------------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |
| **TTFB** | < 600ms | Time to First Byte |

### Lighthouse Score Targets

| Category | Target |
|----------|--------|
| Performance | > 80 |
| Accessibility | > 90 |
| Best Practices | > 90 |
| SEO | > 90 |

### Optimization Strategies

#### Images
- [ ] Next.js Image optimization (next/image)
- [ ] WebP format with fallback
- [ ] Lazy loading for below-fold images
- [ ] Responsive images (srcset)
- [ ] Blur placeholder (LQIP)

#### Code
- [ ] Code splitting (dynamic imports)
- [ ] Tree shaking
- [ ] Bundle analysis
- [ ] Critical CSS inline
- [ ] Defer non-critical JS

#### Caching
- [ ] Static generation (SSG) where possible
- [ ] ISR for semi-static content
- [ ] CDN caching headers
- [ ] Browser caching (Cache-Control)
- [ ] Service Worker (optional PWA)

---

## 📊 Analytics & Tracking

### Google Analytics 4 (GA4)

**Events to Track:**

| Event | Trigger | Parameters |
|-------|---------|------------|
| `page_view` | Every page | page_title, page_location |
| `design_started` | User starts designing | product_type |
| `design_completed` | User completes design | product_type, has_image |
| `add_to_cart` | Add to cart | product_id, price |
| `begin_checkout` | Start checkout | cart_value |
| `purchase` | Complete purchase | transaction_id, value |
| `sign_up` | Create account | method (email/line/google) |
| `login` | User logs in | method |

### Conversion Funnels

**Buyer Funnel:**
```
Landing Page → Catalog → Designer → Cart → Checkout → Purchase
```

**Seller Funnel:**
```
Landing Page → Sign Up → Create First Design → Publish → First Sale
```

### Other Tracking

- [ ] **Facebook Pixel** - For FB/IG ads retargeting
- [ ] **LINE Tag** - For LINE OA integration
- [ ] **Google Tag Manager** - Central tag management
- [ ] **Hotjar/Clarity** - Heatmaps, session recordings

---

## 🔐 Authentication

### Supported Methods

| Method | Priority | Library |
|--------|----------|---------|
| Email/Password | High | NextAuth.js |
| LINE Login | High | NextAuth.js + LINE Provider |
| Google Login | Medium | NextAuth.js |
| Facebook Login | Low | NextAuth.js |

### Session Management

- JWT tokens for API authentication
- HTTP-only cookies for session
- Session expiry: 7 days (remember me: 30 days)
- Refresh token rotation

### Guest Checkout

- Allow checkout without account
- Prompt to create account post-purchase
- Save design progress in localStorage

---

## 🎨 Designer/Canvas Technical Spec

### Canvas Library: Fabric.js

**Features Required:**
- [ ] Image upload and manipulation
- [ ] Text with custom fonts (Thai support)
- [ ] Multiple layers (z-index)
- [ ] Resize, rotate, flip objects
- [ ] Undo/Redo stack
- [ ] Export to PNG/PDF
- [ ] Print area guides
- [ ] Preview on product mockup

### File Handling

| Aspect | Requirement |
|--------|-------------|
| **Upload formats** | JPG, PNG, SVG, WebP |
| **Max file size** | 10MB |
| **Min resolution** | 300 DPI for print area |
| **Image validation** | Check DPI, dimensions |
| **Storage** | S3/Cloudinary with CDN |

### Print-Ready Export

- Export at 300 DPI
- CMYK color profile (for production)
- Transparent background option
- Bleed area handling
- File naming convention

### Fonts

**Thai Fonts to Support:**
- Sarabun
- Prompt
- Kanit
- Noto Sans Thai
- Custom brand fonts

**English Fonts:**
- Standard web fonts
- Custom uploaded fonts

---

## 🗄️ Database Schema (Key Tables)

```sql
-- Users
users (
  id, email, name, phone, role,
  line_id, google_id,
  tier, created_at
)

-- Products (Catalog)
products (
  id, name, slug, category,
  base_price, description,
  print_areas, mockup_images,
  sizes, colors, active
)

-- Designs
designs (
  id, user_id, product_id,
  canvas_data (JSON), preview_url,
  print_file_url, status,
  created_at, updated_at
)

-- Orders
orders (
  id, user_id, status,
  total, shipping_address,
  payment_method, payment_status,
  tracking_number, created_at
)

-- Order Items
order_items (
  id, order_id, design_id,
  product_id, size, color,
  quantity, unit_price
)

-- Sellers (for POD sellers)
sellers (
  id, user_id, store_name,
  store_slug, tier, commission_rate,
  balance, created_at
)
```

---

## 🔌 Third-Party Integrations

### Payment Gateways

| Gateway | Use Case | Priority |
|---------|----------|----------|
| **Omise** | Cards, PromptPay, TrueMoney | High |
| **2C2P** | Alternative, more options | Medium |
| **Stripe** | International cards | Low |

### Shipping

| Carrier | API Integration |
|---------|-----------------|
| Kerry Express | Track & Book API |
| Flash Express | Track & Book API |
| Thailand Post | EMS API |

### Marketplace Integrations (Phase 2+)

| Platform | Integration Type |
|----------|-----------------|
| Shopee | Open API |
| Lazada | Open API |
| TikTok Shop | API |
| LINE Shopping | LIFF |

---

## 🛡️ Security

### Data Protection

- [ ] HTTPS everywhere (SSL/TLS)
- [ ] Input validation (Zod schemas)
- [ ] SQL injection prevention (ORM)
- [ ] XSS prevention (sanitize outputs)
- [ ] CSRF tokens
- [ ] Rate limiting
- [ ] Secure headers (helmet)

### Sensitive Data

- [ ] Passwords: bcrypt hashing
- [ ] API keys: Environment variables
- [ ] User data: Encryption at rest
- [ ] PII: PDPA compliance

### File Upload Security

- [ ] File type validation (magic bytes)
- [ ] File size limits
- [ ] Virus scanning (optional)
- [ ] Signed URLs for private files

---

## 📧 Notification System

### Email Templates

| Template | Trigger |
|----------|---------|
| Welcome | User sign up |
| Order Confirmation | Order placed |
| Order Shipped | Tracking available |
| Password Reset | Reset requested |
| Abandoned Cart | Cart abandoned 1h, 24h, 72h |
| Review Request | 7 days after delivery |

### LINE Notifications

| Notification | Trigger |
|--------------|---------|
| Order Confirmation | Order placed |
| Production Update | Status change |
| Shipping Update | Tracking available |
| Promo | Scheduled campaigns |

---

## 🧪 Testing Strategy

### Unit Tests

- [ ] Utility functions
- [ ] Price calculations
- [ ] Validation logic
- [ ] API handlers

### Integration Tests

- [ ] Authentication flow
- [ ] Checkout flow
- [ ] Designer save/load

### E2E Tests (Playwright/Cypress)

- [ ] Happy path: Browse → Design → Checkout
- [ ] Seller flow: Sign up → Create → Publish
- [ ] Mobile responsive tests

---

## 📦 Deployment

### Environments

| Environment | URL | Branch |
|-------------|-----|--------|
| Development | localhost:3000 | feature/* |
| Staging | staging.anajak.com | develop |
| Production | anajak.com | main |

### CI/CD Pipeline

```
Push → Lint → Test → Build → Deploy
```

### Deployment Checklist

- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Static assets uploaded to CDN
- [ ] DNS configured
- [ ] SSL certificate valid
- [ ] Health check endpoints working
- [ ] Monitoring/alerting configured

---

## 📋 Technical Checklist Before Launch

### Core

- [ ] All pages render correctly
- [ ] Mobile responsive tested
- [ ] Cross-browser tested (Chrome, Safari, Firefox)
- [ ] Forms working correctly
- [ ] Error handling implemented
- [ ] Loading states implemented
- [ ] 404/500 pages styled

### Performance

- [ ] Lighthouse score > 80
- [ ] Images optimized
- [ ] Code split properly
- [ ] Caching configured

### Security

- [ ] HTTPS configured
- [ ] Security headers set
- [ ] Input validation everywhere
- [ ] Rate limiting configured

### Analytics

- [ ] GA4 setup and tested
- [ ] Conversion events tracking
- [ ] Facebook Pixel installed
- [ ] LINE Tag configured

### Integrations

- [ ] Payment gateway tested (sandbox + production)
- [ ] Email sending working
- [ ] LINE OA connected
- [ ] Shipping API tested

---

*Document Version: 1.0*
*Last Updated: December 2024*

