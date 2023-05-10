const certificateControllers = require("../controllers/certificate");
const fastifyMulter = require('fastify-multer');
const storage = fastifyMulter.memoryStorage();
const upload = fastifyMulter({ storage: storage });

const routes = (fastify, options, done) => {
  fastify.post(
    "/api/certificates",
    { preHandler: upload.single('certificate_file') },
    async (request, reply) => {
      try {
        const certificateFile = request.file;

        // Add the file to the request object
        request.body.certificate_file = certificateFile;

        const result = await certificateControllers.createCertificate(request);
        reply.code(201).send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Certificate creation failed.",
        });
      }
    }
  );

  fastify.get("/api/works/:work_id/certificates", certificateControllers.getCertificatesByWorkId);

  done();
};

module.exports = routes;
