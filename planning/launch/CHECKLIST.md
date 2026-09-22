# Pre-Launch Checklist - Smart Store

## Phase 6: Testing & Launch (7-10 days)

---

## 1. Functional Testing

### Authentication
- [ ] Register (customer)
- [ ] Login with email/password
- [ ] Login with Google/Facebook
- [ ] Forgot password flow
- [ ] Session persists across refresh
- [ ] Admin/POS/Manager roles work
- [ ] Logout clears session

### Products
- [ ] Product listing loads with pagination
- [ ] Filters work (category, brand, size, color, price)
- [ ] Sort works (newest, price, rating)
- [ ] Product search works
- [ ] Product detail shows all info
- [ ] 3D viewer loads & rotates
- [ ] Color/size variants switch correctly
- [ ] Reviews display & can be added
- [ ] Wishlist add/remove works

### Cart & Checkout
- [ ] Add to cart works with variants
- [ ] Update quantity in cart
- [ ] Remove item from cart
- [ ] Coupon code applies
- [ ] VAT calculated correctly (14%)
- [ ] Free shipping threshold works
- [ ] Address selection/entry works
- [ ] All payment methods display
- [ ] COD (الدفع عند الاستلام) works
- [ ] Order confirmation page shows
- [ ] Email confirmation sent

### Account
- [ ] Order history shows
- [ ] Order tracking timeline works
- [ ] Address book add/edit/delete
- [ ] Wishlist page
- [ ] Loyalty points display
- [ ] Account settings update

### Admin Dashboard
- [ ] Dashboard stats load
- [ ] Charts render
- [ ] Product CRUD works
- [ ] Image upload works
- [ ] 3D model upload works
- [ ] Order status update works
- [ ] Customer management
- [ ] Inventory adjustment
- [ ] Store transfers
- [ ] Promotion creation
- [ ] Static pages editor

### POS
- [ ] Login as POS staff
- [ ] Product search/barcode scan
- [ ] Add items to cart
- [ ] Apply discount
- [ ] Split payment
- [ ] Process payment
- [ ] Receipt prints
- [ ] Offline mode works (IndexedDB)
- [ ] X/Z reports

---

## 2. Security Testing

- [ ] Passwords hashed (bcrypt)
- [ ] JWT tokens expire
- [ ] Admin routes protected
- [ ] API endpoints authenticated
- [ ] SQL injection safe (Drizzle params)
- [ ] XSS protection (React escaping)
- [ ] CSRF protection (NextAuth)
- [ ] Rate limiting on login/register
- [ ] No sensitive data in client bundle
- [ ] .env.local not committed
- [ ] HTTPS enabled (Vercel auto)
- [ ] File upload validated (image only)

---

## 3. Performance Testing

### Page Speed (Target: < 3s mobile)
- [ ] Home page loads fast
- [ ] Product listing optimized
- [ ] Product images lazy-loaded
- [ ] 3D models load only on PDP
- [ ] Admin dashboard fast
- [ ] POS responsive

### Lighthouse Scores (Target)
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 95

---

## 4. Mobile & Responsive Testing

- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Tablet (iPad)
- [ ] Desktop 1920px
- [ ] Desktop 1366px
- [ ] Mobile 375px
- [ ] RTL correct on all devices
- [ ] Touch targets ≥ 44px (POS)

---

## 5. Payment Testing

- [ ] Stripe test card (4242 4242 4242 4242)
- [ ] Fawry test flow
- [ ] InstaPay test
- [ ] COD flow
- [ ] Failed payment handling
- [ ] Refund flow
- [ ] Webhook events received

---

## 6. SEO & Analytics

- [ ] Robots.txt correct
- [ ] Sitemap.xml generated
- [ ] Canonical URLs
- [ ] Arabic meta titles/descriptions
- [ ] Product schema valid
- [ ] Google Search Console connected
- [ ] Google Analytics installed
- [ ] Open Graph images
- [ ] Twitter cards

---

## 7. Email Testing

- [ ] Welcome email
- [ ] Order confirmation
- [ ] Order shipped
- [ ] Order delivered
- [ ] Forgot password email
- [ ] Abandoned cart email
- [ ] Newsletter subscription
- [ ] Email renders well (mobile)

---

## 8. Backup & Recovery

- [ ] Automated backup running
- [ ] Test restore procedure
- [ ] .env.local backed up
- [ ] Neon PITR enabled

---

## 9. Content Check

- [ ] All Arabic text correct
- [ ] All English translations (if enabled)
- [ ] No placeholder text (lorem ipsum)
- [ ] Images have alt text
- [ ] Broken links checked
- [ ] 404 page works nicely

---

## 10. Final Launch Steps

- [ ] Set NEXTAUTH_URL to production URL
- [ ] Switch Stripe to live keys
- [ ] Switch Fawry to production
- [ ] Final backup before launch
- [ ] Set up Vercel environment variables
- [ ] Configure custom domain
- [ ] Enable analytics
- [ ] Submit sitemap to Search Console
- [ ] Upload OG images to Vercel
- [ ] Create Google Business Profile
- [ ] Post on social media
- [ ] Monitor first 24 hours

---

## Post-Launch Monitoring (First Week)
- [ ] Check Vercel logs daily
- [ ] Monitor Stripe transactions
- [ ] Watch error rates
- [ ] Check abandoned carts
- [ ] Monitor orders flow
- [ ] Track loading times
- [ ] Review customer feedback
- [ ] Fix critical bugs immediately
