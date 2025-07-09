/**
 * Abstract base class for mail services
 * This interface allows for easy swapping between different email providers
 * (Nodemailer, Mailgun, SendGrid, Mailjet, etc.)
 */
export class MailService {
  /**
   * Send an email
   * @param {Object} emailData - The email data
   * @param {string} emailData.to - Recipient email address
   * @param {string} emailData.cc - CC email addresses (comma-separated)
   * @param {string} emailData.bcc - BCC email addresses (comma-separated) 
   * @param {string} emailData.subject - Email subject
   * @param {string} emailData.body - Email body (plain text or HTML)
   * @param {string} emailData.from - Sender email address (optional)
   * @returns {Promise<Object>} - Send result with success status and messageId
   */
  async sendEmail(emailData) {
    throw new Error('sendEmail method must be implemented by subclass');
  }

  /**
   * Validate email configuration
   * @returns {Promise<boolean>} - True if configuration is valid
   */
  async validateConfiguration() {
    throw new Error('validateConfiguration method must be implemented by subclass');
  }

  /**
   * Get service name for logging/debugging
   * @returns {string} - Service name
   */
  getServiceName() {
    throw new Error('getServiceName method must be implemented by subclass');
  }
}