import DB from '../db/index.js';
import { MailServiceFactory } from './MailServiceFactory.js';

export class EmailService {
  constructor() {
    this.mailService = MailServiceFactory.getDefaultMailService();
  }

  async initialize() {
    const isValid = await this.mailService.validateConfiguration();
    if (isValid) {
      console.log(`Mail service (${this.mailService.getServiceName()}) initialized successfully`);
    } else {
      console.warn(`Mail service (${this.mailService.getServiceName()}) configuration invalid, emails may not send`);
    }
    return isValid;
  }

  async getAllEmails() {
    return await DB.getAllEmails();
  }

  async searchEmails(searchTerm) {
    return await DB.searchEmails(searchTerm);
  }

  async getEmailById(id) {
    return await DB.getEmailById(id);
  }

  async createAndSendEmail(emailData) {
    // Validate required fields
    if (!emailData.to || !emailData.subject) {
      throw new Error('To and subject are required');
    }

    const processedEmailData = {
      to: emailData.to,
      cc: emailData.cc || '',
      bcc: emailData.bcc || '',
      subject: emailData.subject,
      body: emailData.body || ''
    };

    try {
      // Save email to database first
      const dbResult = await DB.createEmail(processedEmailData);
      const emailId = dbResult[0];

      // Attempt to send the email
      const sendResult = await this.mailService.sendEmail(processedEmailData);

      return {
        id: emailId,
        sendResult,
        emailData: processedEmailData
      };
    } catch (error) {
      throw new Error(`Failed to create and send email: ${error.message}`);
    }
  }

  async getEmails(searchTerm = null) {
    if (searchTerm) {
      return await this.searchEmails(searchTerm);
    }
    return await this.getAllEmails();
  }

  validateEmailData(emailData) {
    const errors = [];

    if (!emailData.to) {
      errors.push('To field is required');
    }

    if (!emailData.subject) {
      errors.push('Subject field is required');
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailData.to && !emailRegex.test(emailData.to.split(',')[0].trim())) {
      errors.push('Invalid email format in To field');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
