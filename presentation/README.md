# Presentation Folder

This folder contains the demo presentation for the Life Insurance Status Tracking App.

---

## 🎬 INTERACTIVE DEMO PRESENTATION

### **Open `demo.html` in your browser to start the presentation!**

This is a 15-slide interactive presentation that walks through all features with:
- Arrow key navigation (← →) or click the buttons
- Live demo prompts telling you exactly what to show
- Test credentials displayed on relevant slides
- Professional, polished design

---

## 📁 All Files

| File | Description |
|------|-------------|
| **`demo.html`** | ⭐ **Interactive slideshow presentation** - Open in browser! |
| `DEMO_GUIDE.md` | Text version of the demo walkthrough |
| `CLIENT_HANDOUT.md` | One-page handout to give clients with test login credentials |
| `OVERVIEW.md` | Complete feature documentation |
| `QUICK_REFERENCE.md` | One-page quick reference card |
| `screenshots/` | Folder for screenshot images |

---

## 🔑 Test Login Credentials

**Admin Account:**
- URL: `/admin/login`
- Email: `admin@test.com`
- Password: `test123`

**Client Account:**
- URL: `/login`
- Email: `client@test.com`
- Password: `test123`

---

## 💡 How to Run the Demo

1. **Start your app** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open the presentation**:
   - Double-click `demo.html` or open it in Chrome/Safari/Firefox

3. **Have the app open** in another browser window side-by-side

4. **Follow the prompts** on each slide to show live features

5. **Pro tip**: Use two browser windows side-by-side:
   - One logged in as admin
   - One logged in as client
   - Show how updates appear in real-time!

## 📸 Taking Screenshots

To complete the presentation, you'll need to take screenshots and save them in the `screenshots/` folder.

### Prerequisites

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Seed the database with sample data (if not already done):
   ```bash
   npx prisma db seed
   ```

### Recommended Screenshots

#### Admin Screenshots
1. **admin-login.png** - `/admin/login` (empty login form)
2. **admin-dashboard.png** - `/admin/dashboard` (with some clients)
3. **admin-new-client.png** - `/admin/clients/new` (empty form)
4. **admin-client-detail.png** - `/admin/clients/[id]` (with a mid-progress client)
5. **admin-status-history.png** - Close-up of status history section

#### Client Screenshots
1. **client-login.png** - `/login` (empty login form)
2. **client-dashboard.png** - `/dashboard` (mid-progress view)
3. **client-dashboard-complete.png** - `/dashboard` (stage 17, completed)
4. **client-progress.png** - Close-up of progress section
5. **client-activity.png** - Close-up of recent activity

### Tips for Great Screenshots

- Use a clean browser with no extensions showing
- Set browser width to ~1280px for desktop shots
- Set browser width to ~375px for mobile shots
- Clear any personal bookmarks from the bookmark bar
- Use incognito/private mode to avoid cached logins

### Screenshot Tools

**Mac:**
- `Cmd + Shift + 4` - Select area
- `Cmd + Shift + 5` - Screenshot toolbar

**Windows:**
- `Win + Shift + S` - Snipping Tool
- Or use Snip & Sketch app

**Browser Extensions:**
- GoFullPage (Chrome) - Full page screenshots
- Fireshot (Firefox/Chrome) - Scrolling screenshots

## 🎯 Viewing the Presentation

Open `OVERVIEW.md` in any Markdown viewer or:

1. **VS Code**: Install "Markdown Preview Enhanced" extension
2. **GitHub**: Push to repo and view on github.com
3. **Obsidian**: Open folder as vault
4. **Web**: Use a Markdown-to-HTML converter

---

*Financial Planning Group - Life Insurance Status Tracking App*
