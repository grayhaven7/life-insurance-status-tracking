# Life Insurance Status Tracking App
## Feature Overview & Presentation Guide

---

## 📋 Table of Contents

1. [Application Overview](#application-overview)
2. [Admin Features](#admin-features)
3. [Client Features](#client-features)
4. [The 17 Application Stages](#the-17-application-stages)
5. [Screenshot Guide](#screenshot-guide)

---

## Application Overview

The **Life Insurance Status Tracking App** is a modern web application built for **Financial Planning Group** that enables:

- **Administrators** to manage clients and track their Tax-Free Pension application progress through 17 stages
- **Clients** to view their application status in real-time and receive email notifications on updates

### Technology Stack
- **Frontend**: Next.js 15 with React
- **Styling**: Tailwind CSS (modern, responsive design)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Email Notifications**: Automated emails on status updates

---

## Admin Features

### 1. 🔐 Admin Login
**URL**: `/admin/login`

![Admin Login](screenshots/admin-login.png)

**Features:**
- Secure login portal for administrators
- Email and password authentication
- Branded header with "Financial Planning Group - Admin Portal"
- Link to switch to client login if needed

---

### 2. 📊 Admin Dashboard
**URL**: `/admin/dashboard`

![Admin Dashboard](screenshots/admin-dashboard.png)

**Features:**
- **Statistics Overview Cards:**
  - Total Clients count
  - In Progress applications (stages 2-16)
  - Completed applications (stage 17)
  - New clients added this week

- **Client Search**: Real-time search with debounce to find clients by name/email

- **Add Client Button**: Quick access to create new clients

- **Client List Table:**
  - Client name with initials avatar
  - Email address
  - Phone number
  - Current status badge
  - Progress bar (visual percentage)
  - Last updated date
  - "View" action link

---

### 3. ➕ Add New Client
**URL**: `/admin/clients/new`

![Add New Client](screenshots/admin-new-client.png)

**Features:**
- **Form Fields:**
  - Full Name (required)
  - Email Address (required)
  - Phone Number (optional)
  - Temporary Password (required)
  
- **Password Generator**: One-click button to generate secure 12-character password

- **Email Option**: Checkbox to send welcome email with login credentials

- **Actions**: Cancel and Create Client buttons

---

### 4. 👤 Client Detail Page
**URL**: `/admin/clients/[id]`

![Client Detail](screenshots/admin-client-detail.png)

**Features:**

#### Left Column:
- **Client Info Card:**
  - Large initials avatar
  - Full name
  - "Client since" date
  - Clickable email link
  - Clickable phone link
  - Delete Client option (with confirmation)

- **Status Update Form:**
  - Dropdown to select any of the 17 stages
  - Optional note field (included in client email)
  - "Update Status & Notify Client" button
  - Success confirmation message

#### Right Column:
- **Progress Visualization:**
  - Percentage complete (large number)
  - Gradient progress bar
  - Current stage highlight box with:
    - Step X of 17 badge
    - Stage name
    - Stage description

- **All Stages Timeline:**
  - Visual list of all 17 stages
  - ✓ Checkmark for completed stages
  - Highlighted current stage
  - Pending stages grayed out

- **Status History:**
  - Timeline of all status changes
  - Date and time of each update
  - Notes added by admin
  - "Updated by [Admin Name]" attribution

---

### 5. 🗑️ Delete Client
**Location**: Client Detail Page

![Delete Confirmation](screenshots/admin-delete-client.png)

**Features:**
- Confirmation prompt: "Are you sure? This cannot be undone."
- "Yes, Delete" and "Cancel" buttons
- Redirects to dashboard after successful deletion

---

## Client Features

### 1. 🔐 Client Login
**URL**: `/login`

![Client Login](screenshots/client-login.png)

**Features:**
- Beautiful gradient background (blue theme)
- Branded header: "Financial Planning Group - Client Portal"
- Email and password fields
- Loading spinner during authentication
- Link to admin login
- Footer message: "Your credentials were provided by your financial advisor"

---

### 2. 📈 Client Dashboard
**URL**: `/dashboard`

![Client Dashboard](screenshots/client-dashboard.png)

**Features:**

- **Personalized Welcome:**
  - "Hello, [First Name]!"
  - Subtitle: "Track your Tax-Free Pension application progress below."

- **Progress Section:**
  - Large percentage display
  - Animated gradient progress bar
  - Current stage highlight box with:
    - "STEP X OF 17" badge
    - Stage name in large text
    - Stage description

- **All Stages Timeline:**
  - Complete list of 17 stages
  - Visual indicators:
    - ✓ Green checkmark for completed
    - Orange highlight for current
    - Gray for pending
  - "Done", "Current", "Pending" badges

- **Recent Activity Section:**
  - Last 5 status updates
  - Each entry shows:
    - Stage number
    - Admin note (if any)
    - Date, time, and who updated

- **Contact Help Section:**
  - Gradient blue card
  - "Need Help?" message
  - Email Us button (mailto link)
  - Call Us button (tel link)

---

## The 17 Application Stages

| Stage | Name | Description |
|-------|------|-------------|
| 1 | **Submitted** | Application has been submitted and is being processed |
| 2 | **Part 2 Sent** | Part 2 of the application has been sent to client |
| 3 | **Part 2 Completed** | Client has completed Part 2 |
| 4 | **Medical Exam Booked** | Medical examination has been scheduled |
| 5 | **Medical Exam Completed** | Medical examination has been completed |
| 6 | **Records Ordered** | Medical records have been requested |
| 7 | **Records Received** | Medical records have been received |
| 8 | **Procedure / Report Outstanding** | Additional procedures or reports are pending |
| 9 | **Procedure / Report Completed** | All required procedures and reports are complete |
| 10 | **News To Deliver To Client** | Update ready to share with client |
| 11 | **Zoom Call Scheduled (Review)** | Review Zoom call has been scheduled |
| 12 | **Zoom Call Completed (Review)** | Review Zoom call has been completed |
| 13 | **Paperwork Delivered** | Final paperwork has been delivered |
| 14 | **Zoom Call Scheduled (Signing)** | Signing Zoom call has been scheduled |
| 15 | **Zoom Call Completed (Signing)** | Signing Zoom call has been completed |
| 16 | **Paperwork Signed** | All paperwork has been signed |
| 17 | **Tax-Free Pension In Force** | 🎉 Congratulations! Tax-Free Pension is now in force |

---

## Screenshot Guide

To complete this presentation, capture the following screenshots:

### Admin Screenshots

| Filename | URL/Action | What to Capture |
|----------|------------|-----------------|
| `admin-login.png` | `/admin/login` | Full login page |
| `admin-dashboard.png` | `/admin/dashboard` | Dashboard with stats and client list |
| `admin-dashboard-search.png` | `/admin/dashboard` | Type in search box to show filtering |
| `admin-new-client.png` | `/admin/clients/new` | Empty form for new client |
| `admin-new-client-filled.png` | `/admin/clients/new` | Form with sample data filled in |
| `admin-client-detail.png` | `/admin/clients/[id]` | Client detail page (mid-progress client) |
| `admin-status-update.png` | `/admin/clients/[id]` | Status update form section |
| `admin-status-history.png` | `/admin/clients/[id]` | Status history timeline section |
| `admin-delete-client.png` | `/admin/clients/[id]` | Delete confirmation prompt |

### Client Screenshots

| Filename | URL/Action | What to Capture |
|----------|------------|-----------------|
| `client-login.png` | `/login` | Full login page |
| `client-dashboard-early.png` | `/dashboard` | Dashboard at stage 1-3 |
| `client-dashboard-mid.png` | `/dashboard` | Dashboard at stage 8-10 |
| `client-dashboard-complete.png` | `/dashboard` | Dashboard at stage 17 (complete) |
| `client-progress-bar.png` | `/dashboard` | Close-up of progress section |
| `client-activity.png` | `/dashboard` | Recent activity section |
| `client-help.png` | `/dashboard` | Help/contact section |

### Mobile Screenshots (Optional)

Resize browser to mobile width and capture:
- `mobile-admin-dashboard.png`
- `mobile-client-dashboard.png`
- `mobile-login.png`

---

## Key User Flows

### Flow 1: Admin Creates New Client
```
1. Admin logs in at /admin/login
2. Clicks "Add Client" button on dashboard
3. Fills in client details (name, email, phone)
4. Clicks "Generate" for password or enters custom password
5. Ensures "Send welcome email" is checked
6. Clicks "Create Client"
7. Redirected to new client's detail page
8. Client receives email with login credentials
```

### Flow 2: Admin Updates Client Status
```
1. Admin logs in at /admin/login
2. Searches for client or clicks from list
3. On client detail page, selects new stage from dropdown
4. Optionally adds a note
5. Clicks "Update Status & Notify Client"
6. Success message appears
7. Client receives email notification with new status
```

### Flow 3: Client Checks Progress
```
1. Client logs in at /login (using credentials from welcome email)
2. Sees personalized dashboard with current progress
3. Views progress bar and current stage information
4. Reviews recent activity for updates
5. Can contact advisor via email/phone if questions
```

---

## Design Highlights

### Color Scheme
- **Primary Blue**: Professional, trustworthy (#1E3A8A - Navy Blue)
- **Accent Orange**: Warm, action-oriented (#F97316)
- **Success Green**: Completion, progress (#22C55E)
- **Neutral Grays**: Clean, modern interface

### UI/UX Features
- Responsive design (desktop & mobile)
- Smooth animations and transitions
- Clear visual hierarchy
- Accessible color contrast
- Loading states with spinners
- Form validation feedback
- Success/error notifications

---

## Summary

| Role | Key Capabilities |
|------|------------------|
| **Admin** | Login, View Dashboard Stats, Search Clients, Add New Clients, View Client Details, Update Status (17 stages), Add Notes, Delete Clients |
| **Client** | Login, View Personal Dashboard, Track Progress (17 stages), View Activity History, Contact Advisor |

---

*This presentation was generated for the Life Insurance Status Tracking App by Financial Planning Group*
