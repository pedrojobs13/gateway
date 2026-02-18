const jwt = require("jsonwebtoken");
const authMiddleware = require("../src/middleware/authMiddleware");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const createRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe("authMiddleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  it("permite rota /auth sem token", () => {
    const req = { path: "/auth/login", headers: {} };
    const res = createRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it("bloqueia quando nao ha token", () => {
    const req = { path: "/usuarios", headers: {} };
    const res = createRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token obrigatório" });
    expect(next).not.toHaveBeenCalled();
  });

  it("bloqueia quando token e invalido", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid");
    });

    const req = {
      path: "/usuarios",
      headers: { authorization: "Bearer bad-token" },
    };
    const res = createRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
    expect(next).not.toHaveBeenCalled();
  });

  it("permite quando token e valido", () => {
    const decoded = { sub: "user-1" };
    jwt.verify.mockReturnValue(decoded);

    const req = {
      path: "/usuarios",
      headers: { authorization: "Bearer valid-token" },
    };
    const res = createRes();
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});

