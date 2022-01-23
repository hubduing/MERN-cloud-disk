const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    // проверка. Если нет токена выводим сообщение об ошибке
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    // используя jsonwebtoken первым параметром передаем выше полученный токен
    // вторым параметром передаем секретный ключ (в конфиге)
    const decoded = jwt.verify(token, config.get("secretKey"));
    // записываем токен в поле user
    req.user = decoded;
    // вызываем следующий middleware
    next();
  } catch (e) {
    return res.status(401).json({ message: "Auth error" });
  }
};
