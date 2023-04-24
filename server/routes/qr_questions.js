const qrQuestionControllers = require("../controllers/qr_questions");

const routes = [
  {
    method: "POST",
    path: "/qr_questions",
    handler: qrQuestionControllers.createQRQuestion,
  },
  {
    method: "GET",
    path: "/qr_questions/product/:product_id",
    handler: qrQuestionControllers.getQRQuestionsByProductId,
  },
  {
    method: "GET",
    path: "/qr_questions/work/:work_id",
    handler: qrQuestionControllers.getQRQuestionsByWorkId,
  },
];

module.exports = routes;
