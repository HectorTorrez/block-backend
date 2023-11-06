const app = require('./app')
const { PORT } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`)
})
