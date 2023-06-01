require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");
const PORT = process.env.PORT || 3001;
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const vendorRoutes = require("./routes/vendor");
const fastifyMulter = require('fastify-multer');
const formRoutes = require("./routes/form");
const workRoutes = require('./routes/work');
const commentRoutes = require("./routes/comment");
const certificateRoutes = require("./routes/certificate");
const workProductRoutes = require("./routes/workProduct");
const QualityControlRoutes = require("./routes/quality_control");
const imageRoutes = require("./routes/image");
const locationRoutes = require("./routes/location");


const db = require('./config/db');

db.connect()
  .then((obj) => {
    console.log('PostgreSQL bağlantısı başarılı');
    obj.done();
  })
  .catch((error) => {
    console.log('PostgreSQL bağlantısı başarısız', error);
  });

fastify.register(fastifyCors, {
  origin: "*",
  allowedHeaders:
    "Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
  methods: "GET,POST,PUT,DELETE",
});

fastify.register(fastifyMulter.contentParser);

fastify.register(productRoutes);

userRoutes.forEach((route) => {
  fastify.route(route);
});

customerRoutes.forEach((route) => {
  fastify.route(route);
});

vendorRoutes.forEach((route) => {
  fastify.route(route);
});

fastify.register(formRoutes);

workRoutes.forEach((route) => {
  fastify.route(route);
});

commentRoutes.forEach((route) => {
  fastify.route(route);
});

workProductRoutes.forEach((route) => {
  fastify.route(route);
});

QualityControlRoutes.forEach((route) => {
  fastify.route(route);
});

imageRoutes.forEach((route) => {
  fastify.route(route);
});

fastify.register(certificateRoutes);

locationRoutes.forEach((route) => {
  fastify.route(route);
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`server listening on ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
  }
};

start();
