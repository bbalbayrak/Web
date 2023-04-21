const certificateControllers = require("../controllers/certificate");

const routes = [
  {
    method: "POST",
    path: "/certificates",
    handler: certificateControllers.createCertificate,
  },
  {
    method: "GET",
    path: "/works/:work_id/certificates",
    handler: certificateControllers.getCertificatesByWorkId,
  },
  {
    method: "PUT",
    path: "/certificates/:id",
    handler: certificateControllers.updateCertificate,
  },
  {
    method: "DELETE",
    path: "/certificates/:id",
    handler: certificateControllers.deleteCertificate,
  },
];

module.exports = routes;
