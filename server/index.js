require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");
const PORT = process.env.PORT || 3001;
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const vendorRoutes = require("./routes/vendor");
const fastifyMulter = require('fastify-multer');

const db = require('./config/db'); // Bağlantıyı buradan içe aktar

db.connect()
  .then((obj) => {
    console.log('PostgreSQL bağlantısı başarılı');
    obj.done(); // connection'i kapat
  })
  .catch((error) => {
    console.log('PostgreSQL bağlantısı başarısız', error);
  });

// Fastify middleware setup
fastify.register(fastifyCors, {
  origin: "*",
  allowedHeaders:
    "Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range",
  methods: "GET,POST,PUT,DELETE",
});

fastify.register(fastifyMulter.contentParser);

fastify.register(productRoutes);

userRoutes.forEach((route, index) => {
  fastify.route(route);
});

customerRoutes.forEach((route) => {
  fastify.route(route);
});

vendorRoutes.forEach((route) => {
  fastify.route(route);
});

// server
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`server listening on ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
  }
};

start();
