# Git Branch Strategy - Smart Store

## Strategy: Simple (main only)

بما أنك شغال لوحدك على المشروع، استخدمنا أبسط وأسرع استراتيجية بدون تعقيد.

---

## القواعد

### 1. الفرع الوحيد الوحيد: `main`
- كل الشغل يتم على فرع `main`
- لا فروع أخرى مطلوبة
- لا `develop`، لا `staging`، لا `feature/*`

### 2. Commit مباشرة على main
```bash
# الشغل كله يتم مباشرة
git add .
git commit -m "feat: add product listing page"
git push origin main
```

### 3. رسائل Commit (متّبعة Conventional Commits)

| Prefix | متى تستخدمه |
|--------|------------|
| `feat:` | ميزة جديدة (product card, cart, auth) |
| `fix:` | إصلاح خطأ |
| `docs:` | تعديل توثيق |
| `style:` | تعديل تنسيق/أسلوب بدون تغيير منطق |
| `refactor:` | إعادة هيكلة بدون تغيير سلوك |
| `test:` | إضافة/تعديل اختبارات |
| `chore:` | مهام عامة (اعتماد، إعداد) |
| `perf:` | تحسين أداء |
| `build:` | تغييرات بناء/اعتماديات |

#### أمثلة صحيحة:
```bash
# ميزة جديدة
git commit -m "feat: add 3D product viewer"

# إصلاح الخلل
git commit -m "fix: correct VAT calculation for shipping"

# تعديل توثيق
git commit -m "docs: update api endpoints list"

# مهام عامة
git commit -m "chore: setup initial project structure"
```

---

## سير العمل اليومي (Daily Workflow)

### شغل عادي (90% من الوقت)
```bash
# 1. اجلب آخر التغييرات
git pull origin main

# 2. اشتغل على الكود...

# 3. تحقق من التغييرات
git status
git diff

# 4. أضف واعمل commit
git add .
git commit -m "feat: add product card component"

# 5. ارفع
git push origin main
```

---

## متى نستخدم فرع مؤقت؟

في الحالات النادرة التالية، نعمل فرع مؤقت ثم نرجّعه:

### تجربة حاجة ممكن تفشل (مثلاً refactor كبير)
```bash
# 1. اعمل فرع تجربة
git checkout -b experiment/new-checkout

# 2. جرّب
# ... اشتغل ...

# 3a. لو نجحت - الدمج في main
git checkout main
git merge experiment/new-checkout
git push origin main

# 3b. لو فشلت - احذف بدون آثار
git checkout main
git branch -D experiment/new-checkout
```

### إصلاح طارئ بعد الإطلاق
```bash
git checkout -b hotfix/cart-bug
# اشتغل
git checkout main
git merge hotfix/cart-bug
git push origin main
git branch -d hotfix/cart-bug
```

---

## الأوامر الأساسية المرجعية

```bash
# أهم الأوامر
git status                         # حالة المشروع
git diff                           # التغييرات غير المحفوظة
git add .                          # أضف كل التغييرات
git commit -m "message"           # احفظ نقطة
git push origin main               # ارفع للـ GitHub
git pull origin main               # اجلب آخر تحديث
git log --oneline                  # سجل التحديثات
```

---

## القاعدة الذهبية
> **بما أنك لوحدك**: أبسط = أفضل. 
> التزم بـ `main` فقط، ورسائل commit واضحة، وستستفيد من Git كأداة نسخ احتياطي قوية بدون أي عبء إضافي.

## إعدادات يفضل تفعيلها
```bash
# اجلب تلقائياً عند الـ pull
git config --global pull.rebase true

# حدد الهوية (تعملها مرة واحدة)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
