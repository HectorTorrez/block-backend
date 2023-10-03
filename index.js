const app = require('./app')

app.listen(process.env.PORT, () => {
  console.log(`Connected to port ${process.env.PORT}`)
})
