const formControllers = require("../controllers/form");
const fastifyMulter = require('fastify-multer');
const storage = fastifyMulter.memoryStorage();
const upload = fastifyMulter({ storage: storage })

const routes = (fastify, options, done) => {
  fastify.post(
    "/api/forms",
    formControllers.createOrUpdateForm
  );
  
  fastify.get(
    "/api/forms",
    formControllers.getFormTable
  );

  fastify.get(
    "/api/forms/:id",
    formControllers.getForm
  );

  fastify.put(
    "/api/forms/substeps",
    formControllers.updateMultipleSubsteps
  );

  fastify.delete(
    "/api/forms/substeps",
    formControllers.deleteFormSubstep
  );

  fastify.get(
    "/api/allforms/:id",
    formControllers.getAllForm
  );

  fastify.get(
    "/api/forms/vendor/:vendor_id/product/:product_id",
    formControllers.getFormByVendorIdAndProductId
  );

  fastify.post(
    "/api/forms/upload",
    { preHandler: upload.single('file') },
    async (request, reply) => {
      try {
        const file = request.file;
        
        request.body = {
          file: file.buffer,  // Buffer tipini kullanın
          fileName: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          size: file.size
        };

        const result = await formControllers.uploadImageToAzure(request);
        reply.code(201).send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Dosya yüklenirken bir hata oluştu.",
        });
      }
    }
  );

  done();
};

module.exports = routes;
