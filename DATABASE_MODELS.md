# ClipCoreBot Database Models

## Overview
ClipCoreBot uses MongoDB to store user data, download history, and request tracking for analytics and user management.

---

## Models

### 1. User Model
**File**: `src/models/User.js`

Tracks user information and statistics.

**Schema**:
```javascript
{
  telegramId: String (unique, required),    // Telegram user ID
  username: String,                          // Telegram username
  joinedAt: Date,                           // When user first used bot
  totalDownloads: Number,                   // Count of successful downloads
  lastUsedAt: Date,                         // Last time user interacted with bot
}
```

**Example**:
```javascript
{
  "_id": "507f1f77bcf86cd799439011",
  "telegramId": "123456789",
  "username": "john_doe",
  "joinedAt": "2026-06-15T10:30:00Z",
  "totalDownloads": 42,
  "lastUsedAt": "2026-06-15T15:45:00Z"
}
```

---

### 2. Download Model
**File**: `src/models/Download.js`

Tracks successful and failed downloads (legacy, being phased out in favor of Request model).

**Schema**:
```javascript
{
  userId: String (required),                 // Telegram user ID
  platform: String (enum),                   // 'instagram' or 'tiktok'
  url: String (required),                    // The URL that was downloaded
  createdAt: Date,                          // When download was initiated
  status: String (enum),                     // 'pending', 'success', 'failed'
  errorMessage: String,                      // Error details if failed
}
```

---

### 3. Request Model (NEW!)
**File**: `src/models/Request.js`

Tracks all user requests for analytics, including:
- Video downloads
- MP3 conversions
- Command usage

**Schema**:
```javascript
{
  userId: String (indexed, required),        // Telegram user ID
  username: String,                          // Telegram username
  requestType: String (enum, required),      // 'download', 'mp3_conversion', 'command'
  platform: String (enum),                   // 'instagram', 'tiktok', 'youtube', 'local', null
  url: String,                               // URL being processed
  command: String (enum),                    // '/start', '/help', '/mp3', null
  status: String (enum),                     // 'pending', 'processing', 'success', 'failed'
  errorMessage: String,                      // Error description if failed
  processingTime: Number,                    // Milliseconds to complete
  fileSize: Number,                          // File size in bytes
  fileType: String,                          // mp4, mp3, etc
  createdAt: Date (indexed),                 // When request was made
  updatedAt: Date,                           // Last update timestamp
  metadata: {
    userAgent: String,                       // User agent (future use)
    ipAddress: String,                       // IP address (future use)
  }
}
```

**Example - Download Request**:
```javascript
{
  "_id": "507f1f77bcf86cd799439012",
  "userId": "123456789",
  "username": "john_doe",
  "requestType": "download",
  "platform": "instagram",
  "url": "https://www.instagram.com/reel/DY6bkPRtaWK/",
  "status": "success",
  "processingTime": 5432,
  "fileSize": 2048576,
  "fileType": "mp4",
  "createdAt": "2026-06-15T10:30:00Z",
  "updatedAt": "2026-06-15T10:30:05Z"
}
```

**Example - Command Request**:
```javascript
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "123456789",
  "username": "john_doe",
  "requestType": "command",
  "command": "/start",
  "status": "success",
  "createdAt": "2026-06-15T10:30:00Z",
  "updatedAt": "2026-06-15T10:30:00Z"
}
```

**Example - MP3 Conversion Request**:
```javascript
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "123456789",
  "username": "john_doe",
  "requestType": "mp3_conversion",
  "platform": "tiktok",
  "url": "https://vm.tiktok.com/...",
  "status": "success",
  "processingTime": 8234,
  "fileSize": 3145728,
  "fileType": "mp3",
  "createdAt": "2026-06-15T10:30:00Z",
  "updatedAt": "2026-06-15T10:30:08Z"
}
```

---

## Utilities

### Request Tracker (`src/utils/requestTracker.js`)

Helper functions for managing requests:

#### `saveRequest(requestData)`
Saves a new request to the database.

**Usage**:
```javascript
const { saveRequest } = require('./utils/requestTracker');

const request = await saveRequest({
  userId: '123456789',
  username: 'john_doe',
  requestType: 'download',
  platform: 'instagram',
  url: 'https://www.instagram.com/reel/...',
  status: 'processing',
});
```

#### `updateRequestStatus(requestId, status, errorMessage, processingTime)`
Updates an existing request status.

**Usage**:
```javascript
const { updateRequestStatus } = require('./utils/requestTracker');

await updateRequestStatus(
  requestId,
  'success',
  null,
  5432  // milliseconds
);
```

#### `getUserRequests(userId, limit)`
Retrieves recent requests for a user (default limit: 50).

**Usage**:
```javascript
const requests = await getUserRequests('123456789', 10);
```

#### `getRequestStats(userId)`
Gets aggregated statistics for a user.

**Usage**:
```javascript
const stats = await getRequestStats('123456789');
// Returns: [
//   { _id: 'download', count: 42, successCount: 40, failedCount: 2 },
//   { _id: 'mp3_conversion', count: 15, successCount: 15, failedCount: 0 },
//   { _id: 'command', count: 3, successCount: 3, failedCount: 0 }
// ]
```

---

## Data Flow

### Download Request Flow
```
User sends Instagram link
  ↓
URL validation & saveRequest() → status: 'processing'
  ↓
Download starts
  ↓
Success → updateRequestStatus(id, 'success', null, processingTime)
  ↓
Send to user
  ↓
Delete temp file
```

### MP3 Conversion Flow
```
User sends /mp3
  ↓
saveRequest() → requestType: 'command', command: '/mp3'
  ↓
User sends video/link
  ↓
saveRequest() → requestType: 'mp3_conversion', status: 'processing'
  ↓
Convert video
  ↓
Success → updateRequestStatus(id, 'success', null, processingTime)
  ↓
Send MP3 to user
```

---

## Analytics Queries

### Get User Activity
```javascript
// Find all requests for a user, ordered by date
const requests = await Request.find({ userId: '123456789' })
  .sort({ createdAt: -1 })
  .limit(50);
```

### Get Download Success Rate
```javascript
const stats = await Request.aggregate([
  { $match: { userId: '123456789', requestType: 'download' } },
  {
    $group: {
      _id: '$platform',
      total: { $sum: 1 },
      successful: { $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] } },
      failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } },
    },
  },
]);
```

### Get Average Processing Time
```javascript
const avgTime = await Request.aggregate([
  { $match: { userId: '123456789', status: 'success' } },
  { $group: { _id: null, avgTime: { $avg: '$processingTime' } } },
]);
```

### Get Most Used Features
```javascript
const features = await Request.aggregate([
  { $group: { _id: '$requestType', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);
```

---

## Indexing

For optimal query performance, the following indexes are created:

- `User`: `telegramId` (unique)
- `Request`: `userId, createdAt` (compound index for efficient user history queries)
- `Request`: `userId` (for user lookups)
- `Request`: `createdAt` (for time-based queries)

---

## Future Enhancements

- Add download history views in bot
- Track user preferences (preferred platform, etc)
- Analytics dashboard
- User activity reports
- Spam detection based on request patterns
- Rate limiting based on request frequency

---

**Last Updated**: 2026-06-15
