const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const { name, odooid, customer, technical_drawing, guide } = req.body;

    const newProduct = await Product.create(name, odooid, customer, technical_drawing, guide);

    res.status(201).send({
      status: "success",
      message: "Ürün başarıyla oluşturuldu.",
      data: newProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Ürün oluşturulurken bir hata oluştu.",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).send({
      status: "success",
      data: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Ürünler alınırken bir hata oluştu.",
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({
        status: "fail",
        message: "Ürün bulunamadı.",
      });
    }

    res.status(200).send({
      status: "success",
      data: product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "error",
      message: "Ürün alınırken bir hata oluştu.",
    });
  }
};

exports.getProductsByName = async (req, res) => {
    try {
      const name = req.query.name;
  
      if (!name) {
        return res.status(400).send({
          status: "fail",
          message: "Lütfen bir ürün adı girin.",
        });
      }
  
      const products = await Product.findByName(name);
  
      res.status(200).send({
        status: "success",
        data: products,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "error",
        message: "Ürünler aranırken bir hata oluştu.",
      });
    }
  };
// Diğer CRUD işlemleri (güncelleme, silme vb.) için gerekli fonksiyonları buraya ekleyebilirsin.
