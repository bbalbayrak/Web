const formControllers = require("../controllers/form");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const routes = [
  {
    method: "POST",
    path: "/api/forms",
    handler: formControllers.createOrUpdateForm,
  },
  {
    method: "GET",
    path: "/api/forms",
    handler: formControllers.getFormTable,
  },
  {
    method: "GET",
    path: "/api/forms/:id",
    handler: formControllers.getForm,
  },
  {
    method: "PUT",
    path: "/api/forms/substeps",
    handler: formControllers.updateMultipleSubsteps,
  },
  {
    method: "DELETE",
    path: "/api/forms/substeps",
    handler: formControllers.deleteFormSubstep,
  },
  {
    method: "GET",
    path: "/api/allforms/:id",
    handler: formControllers.getAllForm,
  },
  {
    method: "GET",
    path: "/api/forms/vendor/:vendor_id/product/:product_id",
    handler: formControllers.getFormByVendorIdAndProductId
  },
  {
    method: 'POST',
    url: '/api/forms/upload',
    preHandler: async (req, reply) => {
      const data = await req.file();
      req.body = {
        file: data.file,
        fileName: data.filename,
        encoding: data.encoding,
        mimetype: data.mimetype,
        limit: data.limit
      };
    },
    handler: formControllers.uploadImageToAzure,
  }
];

module.exports = routes;
