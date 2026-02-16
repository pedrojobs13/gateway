const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.path.startsWith("/auth")) return next();

    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ error: "Token obrigatório" });
    }

    const token = auth.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: "Token inválido" });
    }
};
