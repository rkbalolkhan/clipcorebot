const Request = require('../models/Request');
const logger = require('./logger');

const saveRequest = async (requestData) => {
  try {
    const request = new Request({
      userId: requestData.userId,
      username: requestData.username || 'Unknown',
      requestType: requestData.requestType, // 'download', 'mp3_conversion', 'command'
      platform: requestData.platform || null,
      url: requestData.url || null,
      command: requestData.command || null,
      status: requestData.status || 'pending',
      errorMessage: requestData.errorMessage || null,
      processingTime: requestData.processingTime || null,
      fileSize: requestData.fileSize || null,
      fileType: requestData.fileType || null,
      metadata: {
        userAgent: requestData.userAgent || null,
        ipAddress: requestData.ipAddress || null,
      },
    });

    await request.save();
    console.log(`✅ Request saved: ${requestData.requestType} for user ${requestData.userId}`);
    return request;
  } catch (error) {
    console.error('❌ Error saving request:', error);
    await logger.error('Error saving request to database', error);
    throw error;
  }
};

const updateRequestStatus = async (requestId, status, errorMessage = null, processingTime = null) => {
  try {
    const updateData = {
      status,
      updatedAt: new Date(),
    };

    if (errorMessage) updateData.errorMessage = errorMessage;
    if (processingTime) updateData.processingTime = processingTime;

    const request = await Request.findByIdAndUpdate(
      requestId,
      updateData,
      { new: true }
    );

    console.log(`✅ Request updated: ${requestId} - Status: ${status}`);
    return request;
  } catch (error) {
    console.error('❌ Error updating request:', error);
    await logger.error('Error updating request status', error);
    throw error;
  }
};

const getUserRequests = async (userId, limit = 50) => {
  try {
    const requests = await Request.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit);

    return requests;
  } catch (error) {
    console.error('❌ Error fetching user requests:', error);
    throw error;
  }
};

const getRequestStats = async (userId) => {
  try {
    const stats = await Request.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$requestType',
          count: { $sum: 1 },
          successCount: {
            $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] },
          },
          failedCount: {
            $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] },
          },
        },
      },
    ]);

    return stats;
  } catch (error) {
    console.error('❌ Error fetching request stats:', error);
    throw error;
  }
};

module.exports = {
  saveRequest,
  updateRequestStatus,
  getUserRequests,
  getRequestStats,
};
