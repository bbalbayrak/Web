const Product = require("../models/product");
const Customer = require("../models/customer");
const { uploadFile } = require("../utils/upload_azure");

exports.createProduct = async (request) => {
  try {
    const { name, odooid, customerid } = request.body;
    const technicaldrawingurl = request.body.technical_drawing;
    const guideurl = request.body.guide;
    
    const customer = await Customer.findById(customerid);
    if (!customer) {
      return {
        status: "fail",
        statusCode: 400,
        message: `Geçersiz müşteri ID'si. Müşteri ID: ${customerid}, İsim: ${name}, OdooID: ${odooid}, Rehber: ${guideurl ? 'Dosya var' : 'Dosya yok'}, Teknik Çizim: ${technicaldrawingurl ? 'Dosya var' : 'Dosya yok'}`,
      };
    }

    const technical_drawing_url = technicaldrawingurl
      ? await uploadFile(technicaldrawingurl.buffer, technicaldrawingurl.originalname)
      : null;
    const guide_url = guideurl ? 
      await uploadFile(guideurl.buffer, guideurl.originalname) 
      : null;

    const result = await Product.create(name, odooid, customerid, technical_drawing_url, guide_url);
    return {
      status: "success",
      statusCode: 201,
      data: result,
    };
  } catch (err) {
    console.error(err);
    throw err;
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
