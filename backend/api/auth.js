const models = require('../models')
const authService = require('../auth')

const login = async (req, res, next) => {
  const { email, password } = req.body
  console.log(email + password)

  const user = await models.User.findOne({
    where: { email, password }
  })

  if (!user) return res.status(401).json({ error: 'Login failure' })

  user['isOnline'] = true
  await user.save()

  const accessToken = authService.signToken(user.id)
  res.json({ accessToken, user })
}

module.exports = {
  login
}
