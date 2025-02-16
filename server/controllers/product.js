const Product = require("../models/product");
const Customer = require("../models/customer");
const { uploadFile, uploadOdooFile, uploadOdooQualityFile } = require("../utils/upload_azure");

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

exports.getProductByOdooId = async (req, res) => {
  try {
    const product = await Product.findByOdooId(req.params.odooid);

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

  exports.uploadTechnicalDrawing = async (request) => {
    try {
        const { odooid, product_name, original_filename } = request.body; // original_filename'i alın
        const technicaldrawingfile = request.body.technical_drawing;
        // Dosya adını, orijinal dosya adına "_technicaldrawingfile" ekleyerek oluşturun
        const filename = `${product_name}/${original_filename}`;
        const technical_drawing_url = technicaldrawingfile
            ? await uploadOdooFile(technicaldrawingfile.buffer, filename)
            : null;
        return {
            status: "success",
            statusCode: 201,
            data: {
                odooid,
                product_name,
                technical_drawing_url,
            },
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
};

  exports.uploadOdooCertificate = async (request) => {
    try {
      const { purchase } = request.body;
      const certificatefile = request.files.quality_documents ? request.files.quality_documents[0] : null;
      console.log("Certificate file info:", certificatefile);
      const filename = `${purchase}/${certificatefile.originalname}`;
      
      const certificate_url = certificatefile
        ? await uploadOdooQualityFile(certificatefile.buffer, filename)
        : null;
      console.log("Generated certificate URL:", certificate_url);
      return {
        status: "success",
        statusCode: 201,
        data: {
          purchase,
          certificate_url,
        },
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  };  
