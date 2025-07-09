import { MockMailService } from './MockMailService.js';

export class MailServiceFactory {
  /**
   * Create a mail service instance based on configuration
   * @param {string} provider - The mail service provider ('nodemailer', 'mock', etc.)
   * @param {Object} config - Configuration options for the service
   * @returns {MailService} - Mail service instance
   */
  static createMailService(provider = 'mock', config = {}) {
    switch (provider.toLowerCase()) {
      case 'mock':
      case 'development':
        return new MockMailService();

      // Future implementations can be added here:
      // case 'sendgrid':
      //   return new SendGridService(config);
      // case 'mailgun':
      //   return new MailgunService(config);
      // case 'mailjet':
      //   return new MailjetService(config);

      default:
        console.warn(`Unknown mail provider '${provider}', falling back to MockMailService`);
        return new MockMailService();
    }
  }

  static getDefaultMailService() {
    const provider = process.env.MAIL_PROVIDER || 'mock';
    const config = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      from: process.env.SMTP_FROM
    };

    return this.createMailService(provider, config);
  }

  /**
   * Validate that a mail service is properly configured
   * @param {MailService} mailService - The mail service to validate
   * @returns {Promise<boolean>} - True if valid
   */
  static async validateMailService(mailService) {
    try {
      return await mailService.validateConfiguration();
    } catch (error) {
      console.error('Mail service validation failed:', error);
      return false;
    }
  }
}
