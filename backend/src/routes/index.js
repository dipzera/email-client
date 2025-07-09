import { EmailService } from '../services/EmailService.js';

export default async function routes(fastify, options) {
  // Initialize email service
  const emailService = new EmailService();
  await emailService.initialize();
  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });

  fastify.get('/emails', async (request, reply) => {
    try {
      const { search } = request.query;
      const emails = await emailService.getEmails(search);
      return { emails };
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.get('/emails/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const email = await emailService.getEmailById(id);

      if (!email) {
        reply.code(404).send({ error: 'Email not found' });
        return;
      }

      return { email };
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.post('/emails', async (request, reply) => {
    try {
      const emailData = request.body;

      // Validate email data
      const validation = emailService.validateEmailData(emailData);
      if (!validation.isValid) {
        reply.code(400).send({ error: validation.errors.join(', ') });
        return;
      }

      // Create and send email through service
      const result = await emailService.createAndSendEmail(emailData);

      if (result.sendResult.success) {
        reply.code(201).send({
          success: true,
          id: result.id,
          messageId: result.sendResult.messageId,
          service: result.sendResult.service,
          message: 'Email created and sent successfully'
        });
      } else {
        // Email was saved but sending failed
        reply.code(202).send({
          success: true,
          id: result.id,
          warning: `Email saved but sending failed: ${result.sendResult.error}`,
          service: result.sendResult.service,
          message: 'Email created but not sent'
        });
      }
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  });
}
