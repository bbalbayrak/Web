const formControllers = require("../controllers/form");
const fastifyMulter = require('fastify-multer');
const storage = fastifyMulter.memoryStorage();
const upload = fastifyMulter({ storage: storage });

const routes = (fastify, options, done) => {
  fastify.post(
    "/api/forms",
    { preHandler: upload.fields([{ name: "example_visual", maxCount: 1 }]) },
    async (request, reply) => {
      try {
        const example_visual = request.files.example_visual ? request.files.example_visual[0] : null;

        // Add the file to the request object
        request.body.example_visual = example_visual;

        const result = await formControllers.createOrUpdateForm(request);
        reply.code(201).send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Error creating or updating form",
          error: err.message
        });
      }
    }
  );
  fastify.get("/api/forms", formControllers.createOrUpdateForm);
  fastify.get("/api/forms/:id", formControllers.getForm);
  fastify.put("/api/forms/substeps", formControllers.updateMultipleSubsteps);
  fastify.delete("/api/forms/substeps", formControllers.deleteFormSubstep);
  fastify.get("/api/allforms/:id", formControllers.getAllForm);
  fastify.get("/api/forms/vendor/:vendor_id/product/:product_id", formControllers.getFormByVendorIdAndProductId);
  
  done();
};

module.exports = routes;
