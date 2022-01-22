const Router = require('express');
const User = require('../models/User');
//  npm i bcryptjs
const bcrypt = require('bcryptjs')
// npm i express-validator
const {check, validationResult} = require('express-validator')
const router = new Router()

// 1 параметр это эндпоинт
// 2 параметр это массив для валидации email, pass
// 3 функция пост. Обрабатываем данные полученные от пользователя: email, pass в try, catch.
router.post('/registration',
  [
    check('email', "Uncorrect email").isEmail(),
    check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
  ],
  async (req, res) => {
  try{
    // с помощью validationResult получим результат валидации email, password
    const errors = validationResult(req)
    // проверяем, сли результат валидации содержит ошибки, тогда статус код 400
    if (!errors.isEmpty()) {
      return res.status(400).json({message: "Uncorrect request", errors})
    }

    // получаем из тела запроса email и pass
    const {email, password} = req.body;
    // проверяем есть ли пользователь с таким email в базе, функция асинхронная!
    const canditate = await User.findOne({email})

    if (canditate) {
      return res.status(400).json({message: `User with email ${email} already exist`})
    }

    //  для безопастности пароль нужно захешировать

    // (это асинхронная операция)
    const hashPassword = await bcrypt.hash(password, 15)

    //  если нет пользователя в бд то создаем его
    const user = new User({email, password: hashPassword})
    // сохраняем в базу (это асинхронная операция)
    await user.save()
    // возвращаем ответ пользователю
    return res.json({message: "User was created"})

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})

module.exports = router
