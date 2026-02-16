const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use("/auth",
        createProxyMiddleware({
            target: process.env.AUTH_SERVICE,
            changeOrigin: true,
        })
    );

    app.use("/usuarios",
        createProxyMiddleware({
            target: process.env.USER_SERVICE,
            changeOrigin: true,
        })
    );

    app.use("/agendamentos",
        createProxyMiddleware({
            target: process.env.AGENDAMENTO_SERVICE,
            changeOrigin: true,
        })
    );

    app.use("/notifications",
        createProxyMiddleware({
            target: process.env.NOTIFICATION_SERVICE,
            changeOrigin: true,
        })
    );
};
