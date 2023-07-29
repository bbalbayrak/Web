const descriptionControlControllers = require("../controllers/description_control");
const fastifyMulter = require('fastify-multer');
const storage = fastifyMulter.memoryStorage();
const upload = fastifyMulter({ storage: storage });

const routes = (fastify, options, done) => {
  fastify.post(
    "/api/description_controls",
    { preHandler: upload.single('documents') },
    async (request, reply) => {
      try {
        const document = request.file;

        // Add the file to the request object
        request.body.documents = document;

        const result = await descriptionControlControllers.createOrUpdateDescriptionControl(request);
        reply.code(result.statusCode).send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Açıklama kontrolü oluşturulurken/güncellenirken bir hata oluştu.",
        });
      }
    }
  );
  
  fastify.get(
    "/api/description_controls",
    async (request, reply) => {
      try {
        const result = await descriptionControlControllers.getDescriptionControl(request);
        reply.code(200).send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Açıklama kontrolü getirilirken bir hata oluştu.",
        });
      }
    }
  );

  fastify.get(
    "/api/description_controls/:inspectionplan_id",
    async (request, reply) => {
      try {
        const result = await descriptionControlControllers.getDescriptionControlByInspectionPlanId(request, reply);
        reply.send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Açıklama kontrolü getirilirken bir hata oluştu.",
        });
      }
    }
  );  

  done();
};

module.exports = routes;
