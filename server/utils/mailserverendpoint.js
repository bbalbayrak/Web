const sendEmail = require('../utils/mailserver'); // Doğru yolu ayarlayın
const fastifyMulter = require('fastify-multer');

const routes = (fastify, options, done) => {
    fastify.post("/api/send-email", async (request, reply) => {
        console.log(request.body); // Bu satırı ekleyin
      
        const { to, cc, subject, text } = request.body;
        try {
          await sendEmail(to, cc, subject, text);
          reply.code(200).send({ message: 'Email sent successfully' });
        } catch (error) {
          reply.code(500).send({ message: 'Error sending email', error: error.message });
        }
      });
      

  done();
};

module.exports = routes;
