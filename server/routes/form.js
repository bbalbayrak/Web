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
    handler: async (req, reply) => {
      const parts = req.multipart(handler, done);

      function handler(field, file, filename, encoding, mimetype) {
        // TODO: Change this to your Azure upload function
        pump(file, fs.createWriteStream(`./${filename}`));
      }

      function done(err) {
        if (err) {
          reply.code(500).send({ status: 'Error occurred during file upload.' });
        } else {
          reply.code(200).send({ status: 'File uploaded successfully.' });
        }
      }
    },
  }
];

module.exports = routes;
