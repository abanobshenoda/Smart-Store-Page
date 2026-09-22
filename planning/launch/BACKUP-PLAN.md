# Backup & Data Management Plan

## Overview
All data is stored in **Neon (PostgreSQL)**. This plan covers how to protect your data.

---

## 1. Neon Built-in Backups

### What Neon Does Automatically:
- **Point-in-Time Recovery (PITR)**: Keeps 7 days of history
- **Branching**: Creates isolated copies of your database
- **All Free** on the free tier

### How to Access:
1. Go to https://neon.tech → Your Project
2. **Backups tab**: View recovery points
3. **Branches tab**: Create test/environment branches

---

## 2. Manual Dumps (pg_dump)

### Before Major Changes / Weekly:
```bash
# Install PostgreSQL tools locally (or use Neon CLI)
# https://neon.tech/docs/manage/database-admin

# Export your database
pg_dump "postgresql://user:pass@ep-xxx.aws.neon.tech/dbname?sslmode=require" \
  -f backup_$(date +%Y-%m-%d).sql

# Restore (if needed)
psql "postgresql://user:pass@ep-xxx.aws.neon.tech/dbname?sslmode=require" \
  -f backup_2024-01-01.sql
```

### Automated Weekly via Script:
Create `scripts/backup.js` (using `pg_dump` or Neon's REST API):
```bash
# Simple Windows PowerShell backup script
$env:DATABASE_URL = "postgresql://user:pass@ep-xxx.aws.neon.tech/dbname?sslmode=require"
$date = Get-Date -Format "yyyy-MM-dd"
pg_dump $env:DATABASE_URL -f "backups\backup_$date.sql"
```

---

## 3. Drizzle Migrations (Schema Backup)

Drizzle automatically creates migration files you can commit to Git:

```bash
# Create migration
npx drizzle-kit generate

# Apply migration
npx drizzle-kit migrate
```

Migration files: `drizzle/` folder → **Commit these to GitHub!**
They act as a record of your schema changes over time.

---

## 4. File Storage Backups

### UploadThing / Cloudinary:
- **UploadThing**: No automatic backup of files. Download important media manually.
- **Cloudinary**: Has backup options in paid tiers.
- **Recommendation**: Keep originals on Google Drive/OneDrive.

---

## 5. Kimble Secrets & .env

- **Never commit** `.env.local` to GitHub
- Keep a copy in a **password manager** (Bitwarden/LastPass)
- Add `.env.local` to `.gitignore`

---

## 6. Disaster Recovery Plan

### If Database Is Deleted/Corrupted:

| Scenario | Solution |
|----------|----------|
| Accidental data deletion | Neon PITR (restore to before deletion time) |
| Broken migration | Drizzle migration rollback (git revert + migrate) |
| Full database loss | Restore from pg_dump backup |
| Local env loss | Password manager copy |

### Recovery Steps:
1. Access Neon dashboard
2. Create a **branch** from a point-in-time snapshot
3. Point your app to the branch URL (temporarily)
4. Verify data integrity
5. Fix the issue
6. Switch back to main branch

---

## 7. Production Checklist

- [ ] Test migration on branch before applying to production
- [ ] Weekly automated backup (pg_dump)
- [ ] Store backup files in GitHub private repo or cloud
- [ ] .env.local stored securely in password manager
- [ ] Test restore procedure at least once before launch
- [ ] Enable Neon PITR (default, free)
