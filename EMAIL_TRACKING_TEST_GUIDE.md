# Email Tracking Testing Guide

This guide explains how to test and debug the email open tracking feature.

## Quick Start

1. **Access the Debug Page**: Navigate to `/admin/debug/email-tracking` in the admin portal
2. **Create a Test Tracking**: Select a client and click "Create Test Email Tracking"
3. **Test the Pixel**: Click "Test Tracking Pixel" to simulate an email open
4. **Verify Results**: Check that the open count increased and timestamps were updated

## Testing Methods

### Method 1: Using the Debug Page (Recommended)

1. Go to `/admin/debug/email-tracking`
2. Select a client from the dropdown
3. Click "Create Test Email Tracking"
4. Click "Test Tracking Pixel" button
5. Refresh the page to see updated counts

### Method 2: Manual API Testing

#### Create a tracking record:
```bash
curl -X POST http://localhost:3000/api/debug/email-tracking \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{
    "clientId": "client-id-here",
    "emailType": "status_update",
    "subject": "Test Email"
  }'
```

#### Test the tracking pixel:
```bash
curl http://localhost:3000/api/track/TRACKING-ID-HERE -v
```

### Method 3: Real Email Testing

1. **Send a real email** by updating a client's status in the admin portal
2. **Check the email HTML** - it should contain a tracking pixel at the bottom:
   ```html
   <img src="https://yourdomain.com/api/track/[trackingId]" width="1" height="1" style="display:none;" />
   ```
3. **Open the email** in an email client (Gmail, Outlook, etc.)
4. **Check the debug page** to see if the open was tracked

## What to Check

### ✅ Successful Tracking

- Tracking record is created in the database
- `openCount` increments when pixel is loaded
- `firstOpenedAt` is set on first open
- `lastOpenedAt` updates on each open
- Console logs show tracking events

### ❌ Common Issues

1. **Tracking ID not found**
   - Check that the tracking record exists in the database
   - Verify the tracking ID matches exactly

2. **Open count not incrementing**
   - Check browser console for errors
   - Verify the tracking endpoint is accessible
   - Check database connection

3. **Email pixel not loading**
   - Some email clients block images by default
   - Check email client settings
   - Verify the tracking URL is correct

## Debug Endpoints

### GET `/api/debug/email-tracking`
View all email tracking records (admin only)

Query params:
- `clientId` (optional): Filter by client ID

### POST `/api/debug/email-tracking`
Create a test email tracking record (admin only)

Body:
```json
{
  "clientId": "string (required)",
  "emailType": "status_update" | "welcome" | "admin_invitation",
  "subject": "string (optional)"
}
```

### GET `/api/track/[trackingId]`
The tracking pixel endpoint (public, no auth required)

Returns: 1x1 transparent GIF

## Database Queries

### View all email opens:
```sql
SELECT * FROM email_opens ORDER BY created_at DESC;
```

### View opens for a specific client:
```sql
SELECT * FROM email_opens WHERE client_id = 'client-id' ORDER BY created_at DESC;
```

### View unopened emails:
```sql
SELECT * FROM email_opens WHERE open_count = 0;
```

## Console Logging

The tracking endpoint logs detailed information:

```
[Email Tracking] Pixel requested: {
  trackingId: "...",
  userAgent: "...",
  referer: "...",
  ip: "...",
  timestamp: "..."
}

[Email Tracking] Email opened: {
  trackingId: "...",
  clientId: "...",
  clientName: "...",
  clientEmail: "...",
  emailType: "...",
  wasFirstOpen: true,
  previousCount: 0,
  newCount: 1,
  timestamp: "..."
}
```

## Testing Checklist

- [ ] Can create test tracking records
- [ ] Tracking pixel loads correctly
- [ ] Open count increments
- [ ] First open timestamp is set
- [ ] Last open timestamp updates
- [ ] Multiple opens are tracked correctly
- [ ] Real emails include tracking pixels
- [ ] Admin dashboard shows email status
- [ ] Client detail page shows email activity
- [ ] Console logs are working

## Notes

- Tracking only works when email clients load images
- Some privacy-focused email clients block tracking pixels
- The tracking pixel is invisible (1x1px, display:none)
- Each email gets a unique tracking ID
- Opens are tracked even if the email is opened multiple times

