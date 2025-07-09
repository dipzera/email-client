import DB from '../db/index.js';

export default async function routes(fastify, options) {
  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });

  fastify.get('/emails', async (request, reply) => {
    try {
      const { search } = request.query;

      let emails;
      if (search) {
        emails = await DB.searchEmails(search);
      } else {
        emails = await DB.getAllEmails();
      }

      return { emails };
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.get('/emails/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const email = await DB.getEmailById(id);

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
      const { to, cc, bcc, subject, body } = request.body;

      if (!to || !subject) {
        reply.code(400).send({ error: 'To and subject are required' });
        return;
      }

      const emailData = {
        to,
        cc: cc || '',
        bcc: bcc || '',
        subject,
        body: body || ''
      };

      const result = await DB.createEmail(emailData);

      reply.code(201).send({
        success: true,
        id: result[0],
        message: 'Email created successfully'
      });
    } catch (error) {
      reply.code(500).send({ error: error.message });
    }
  });
}
