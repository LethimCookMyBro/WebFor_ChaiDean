/**
 * Notification stub for alert system
 * This is a placeholder that can be replaced with actual push notification service
 * (e.g., Firebase Cloud Messaging, OneSignal, Twilio, etc.)
 */

/**
 * Send alert notification
 * @param {object} alertData - Alert information
 * @param {string} alertData.type - Alert type (high_danger, bm21_range, etc.)
 * @param {object} alertData.coordinates - {lat, lon}
 * @param {string} alertData.timestamp - ISO timestamp
 */
function sendAlert(alertData) {
  // Log alert for debugging
  console.log('📢 ALERT TRIGGERED:', JSON.stringify(alertData, null, 2));
  
  // TODO: Implement actual notification service
  // Example integrations:
  // - Firebase Cloud Messaging
  // - OneSignal
  // - Twilio SMS
  // - LINE Notify (popular in Thailand)
  // - Email service (SendGrid, SES)
  
  // Stub response
  return {
    sent: false,
    reason: 'Notification service not configured',
    alertData
  };
}

/**
 * Send bulk alerts to multiple recipients
 * @param {array} recipients - List of recipient identifiers
 * @param {object} alertData - Alert information
 */
function sendBulkAlert(recipients, alertData) {
  console.log(`📢 BULK ALERT to ${recipients.length} recipients:`, JSON.stringify(alertData, null, 2));
  
  return {
    sent: false,
    count: recipients.length,
    reason: 'Bulk notification service not configured'
  };
}

module.exports = {
  sendAlert,
  sendBulkAlert
};
