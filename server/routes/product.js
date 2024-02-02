const productControllers = require("../controllers/product");
const fastifyMulter = require('fastify-multer');
const storage = fastifyMulter.memoryStorage();
const upload = fastifyMulter({ storage: storage });

const routes = (fastify, options, done) => {
  fastify.post(
    "/api/products",
    { preHandler: upload.fields([{ name: "technicaldrawingurl", maxCount: 1 }, { name: "guideurl", maxCount: 1 }]) },
    async (request, reply) => {
      try {
        const technical_drawing = request.files.technicaldrawingurl ? request.files.technicaldrawingurl[0] : null;
        const guide = request.files.guideurl ? request.files.guideurl[0] : null;
  
        // Add the files to the request object
        request.body.technical_drawing = technical_drawing;
        request.body.guide = guide;
  
        const result = await productControllers.createProduct(request);
        reply.code(201).send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Ürün oluşturulurken bir hata oluştu.",
        });
      }
    }
  );

  fastify.get("/api/products", productControllers.getAllProducts);
  fastify.get("/api/products/search", productControllers.getProductsByName);
  fastify.get("/api/products/:odooid", productControllers.getProductByOdooId);
  
  fastify.post(
    "/api/technicaldrawings",
    { preHandler: upload.fields([{ name: "technical_drawing", maxCount: 1 }]) },
    async (request, reply) => {
      try {
        const technical_drawing = request.files.technical_drawing ? request.files.technical_drawing[0] : null;
    
        // Add the file to the request object
        request.body.technical_drawing = technical_drawing;
    
        const result = await productControllers.uploadTechnicalDrawing(request);
        reply.code(201).send(result);
      } catch (err) {
        console.error(err);
        reply.code(500).send({
          status: "error",
          message: "Teknik çizim yüklenirken bir hata oluştu.",
        });
      }
    }
  );

  fastify.post(
    "/api/qualitydocuments",
    { preHandler: upload.fields([{ name: "quality_documents", maxCount: 1 }]) },
    async (request, reply) => {
      try {
        const quality_documents = request.files.quality_documents ? request.files.quality_documents[0] : null;
	console.log("Received file:", quality_documents);    
        // Add the file to the request object
        request.body.quality_documents = quality_documents;

        const result = await productControllers.uploadOdooCertificate(request);
        reply.code(201).send(result);

      } catch (err) {
        console.error(err);
        reply.code(500).send({

          status: "error",
          message: "Sertifika yüklenirken bir hata oluştu.",
        });
      }
    }
  );

  done();
};

module.exports = routes;
