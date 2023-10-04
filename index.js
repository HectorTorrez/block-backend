const app = require('./app')
const { PORT, MONGODB_URI } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`)
  console.log(MONGODB_URI)
})
