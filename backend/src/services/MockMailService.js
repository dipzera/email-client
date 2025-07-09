import { MailService } from './MailService.js';

/**
 * Mock implementation of MailService for development and testing
 * Logs emails to console instead of actually sending them
 */
export class MockMailService extends MailService {
  constructor() {
    super();
    this.sentEmails = [];
  }

  async sendEmail(emailData) {
    const emailRecord = {
      id: this.generateMessageId(),
      timestamp: new Date().toISOString(),
      from: emailData.from || 'noreply@emailclient.com',
      to: emailData.to,
      cc: emailData.cc || '',
      bcc: emailData.bcc || '',
      subject: emailData.subject,
      body: emailData.body,
      service: this.getServiceName()
    };

    // Store for potential retrieval/testing
    this.sentEmails.push(emailRecord);

    // Log to console for development visibility
    console.log('MOCK EMAIL SENT:');
    console.log('-'.repeat(50));
    console.log(`From: ${emailRecord.from}`);
    console.log(`To: ${emailRecord.to}`);
    if (emailRecord.cc) console.log(`CC: ${emailRecord.cc}`);
    if (emailRecord.bcc) console.log(`BCC: ${emailRecord.bcc}`);
    console.log(`Subject: ${emailRecord.subject}`);
    console.log(`Body: ${emailRecord.body}`);
    console.log(`Message ID: ${emailRecord.id}`);
    console.log(`Timestamp: ${emailRecord.timestamp}`);
    console.log('-'.repeat(50));

    return {
      success: true,
      messageId: emailRecord.id,
      response: 'Mock email logged successfully',
      service: this.getServiceName()
    };
  }

  async validateConfiguration() {
    console.log('🔍 Mock Mail Service: Configuration validation (always passes)');
    return true;
  }

  getServiceName() {
    return 'MockMailService';
  }

  generateMessageId() {
    return `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@emailclient.com`;
  }

  getSentEmails() {
    return this.sentEmails;
  }

  clearSentEmails() {
    this.sentEmails = [];
  }

  getLastSentEmail() {
    return this.sentEmails[this.sentEmails.length - 1] || null;
  }
}
