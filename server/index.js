// const {db} = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');

const server = async() => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  }
  catch(err) {
    console.log(err)
  }
}

server();