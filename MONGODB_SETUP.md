# MongoDB Setup — Private Messages

Messages sent via the portfolio "Leave a note" form are saved to MongoDB Atlas
and forwarded to your email as a backup.

## Step-by-step (10 minutes, free)

### 1. Create a MongoDB Atlas account
- Go to https://cloud.mongodb.com
- Sign up for free (M0 cluster is free forever)

### 2. Create a cluster
- Click "Create" → Choose "M0 Free" → Pick any region
- Wait ~2 minutes for it to provision

### 3. Create a database user
- Go to Security → Database Access
- Add a new user (username + password)
- Role: "Read and write to any database"

### 4. Whitelist IP addresses
- Go to Security → Network Access
- Click "Add IP Address" → "Allow access from anywhere" (0.0.0.0/0)
  (For production, restrict to your server's IP)

### 5. Get your connection string
- Go to Deployment → Database → Connect
- Choose "Drivers" → Node.js → Copy the connection string
- It looks like: `mongodb+srv://username:password@cluster0.xxx.mongodb.net/`

### 6. Configure your portfolio
- Copy `.env.local.example` → `.env.local`
- Paste your connection string as `MONGODB_URI`
- Replace `<password>` with your actual password
- Add `palak_portfolio` as the database name in the URI
- Set `ADMIN_SECRET` to any secret string you'll remember

### 7. Restart the dev server
```bash
npm run dev
```

## Reading your messages

### In MongoDB Atlas (GUI)
- MongoDB Atlas → Browse Collections → palak_portfolio → messages
- Each message has: name, email, message, timestamp, read (true/false)

### Via API (JSON)
```
GET /api/messages?secret=YOUR_ADMIN_SECRET
```
Returns the 50 most recent messages.

### Mark as read
Currently messages are stored with `read: false`.
You can update them in Atlas UI or add a PATCH endpoint later.

## Message schema
```json
{
  "_id": "ObjectId",
  "name": "Visitor name or Anonymous",
  "email": "visitor@email.com or empty",
  "message": "Their note to you",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "read": false
}
```
