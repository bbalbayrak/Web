const userControllers = require("../controllers/user");

const routes = [
    {
        method: "POST",
        path: "/api/create_user",
        handler: userControllers.createUser,
    },
    {
        method: "GET",
        path: "/api/allusers",
        handler: userControllers.getAllUsers,
    },
    {
        method: "POST",
        path: "/api/login",
        handler: userControllers.login,
    },
];

module.exports = routes;
