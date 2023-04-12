const productControllers = require("../controllers/product");

const routes = [
  {
    method: "POST",
    path: "/products",
    handler: productControllers.createProduct,
  },
  {
    method: "GET",
    path: "/products",
    handler: productControllers.getAllProducts,
  },
  {
    method: "GET",
    path: "/products/search",
    handler: productControllers.getProductsByName,
  },
  {
    method: "GET",
    path: "/products/:id",
    handler: productControllers.getProductById,
  },
  // Diğer CRUD işlemleri (güncelleme, silme vb.) için gerekli yolları buraya ekleyebilirsin.
];

module.exports = routes;
