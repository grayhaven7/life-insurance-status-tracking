# Quick Reference Card
## Life Insurance Status Tracking App

---

## 🔑 Login URLs

| Role | URL | Purpose |
|------|-----|---------|
| Admin | `/admin/login` | Access client management dashboard |
| Client | `/login` | View personal application progress |

---

## 👔 Admin Features at a Glance

### Dashboard (`/admin/dashboard`)
- 📊 View statistics (total clients, in progress, completed, new this week)
- 🔍 Search clients by name or email
- ➕ Add new clients
- 📋 View all clients in sortable table

### Add Client (`/admin/clients/new`)
- ✏️ Enter client name, email, phone
- 🔐 Generate or set temporary password
- 📧 Send welcome email with credentials

### Client Detail (`/admin/clients/[id]`)
- 👤 View client info (name, email, phone, join date)
- 📈 Update status to any of 17 stages
- 📝 Add notes to status updates
- 📜 View complete status history
- 🗑️ Delete client (with confirmation)

---

## 👥 Client Features at a Glance

### Dashboard (`/dashboard`)
- 👋 Personalized welcome message
- 📊 Visual progress bar with percentage
- 📍 Current stage details and description
- ✅ Full 17-stage timeline view
- 🕐 Recent activity (last 5 updates)
- 📞 Contact advisor (email/phone links)

---

## 📈 The 17 Stages

```
1.  Submitted
2.  Part 2 Sent
3.  Part 2 Completed
4.  Medical Exam Booked
5.  Medical Exam Completed
6.  Records Ordered
7.  Records Received
8.  Procedure / Report Outstanding
9.  Procedure / Report Completed
10. News To Deliver To Client
11. Zoom Call Scheduled (Review)
12. Zoom Call Completed (Review)
13. Paperwork Delivered
14. Zoom Call Scheduled (Signing)
15. Zoom Call Completed (Signing)
16. Paperwork Signed
17. Tax-Free Pension In Force ✅
```

---

## 📧 Email Notifications

Clients receive automatic emails when:
- ✨ Account is created (welcome email with credentials)
- 🔄 Status is updated (includes stage name and admin notes)

---

## 🎨 Key UI Elements

| Element | Description |
|---------|-------------|
| Progress Bar | Gradient blue-to-orange, shows % complete |
| Stage Timeline | Green ✓ = done, Orange = current, Gray = pending |
| Stats Cards | 4 cards showing key metrics on admin dashboard |
| Client Table | Sortable list with avatars, status badges, progress bars |
| Delete Confirmation | Two-step process to prevent accidents |

---

## 🚀 Common Tasks

### Create a new client
1. Login as admin → Dashboard → "Add Client"
2. Fill form → Generate password → Create

### Update client progress
1. Login as admin → Find client → Click "View"
2. Select new stage → Add note (optional) → Update

### Check application status (as client)
1. Login with provided credentials
2. View dashboard for current stage and progress

---

*Emerald Tide Financial - Life Insurance Status Tracking*
