const userControllers = require("../controllers/user");

const routes = [
    {
        method: "GET",
        path: "/users",
        handler: userControllers.getAllUsers,
    },
    {
        method: "POST",
        path: "/login",
        handler: userControllers.login,
    },
    {
        method: "POST",
        path: "/register",
        handler: userControllers.register,
    }
];

module.exports = routes;
