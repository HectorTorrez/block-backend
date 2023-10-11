const getTokenFrom = (request, response, next) => {
  try {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      request.token = authorization.replace('bearer ', '')
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = getTokenFrom
