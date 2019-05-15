
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})
// var db = require('./models')
//  db.User.create({name: 'joe', email: 'test@example.com'}).then((err, res) => {
//    console.log(err, res)
//  })
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
var db = require('./models')

const createUser = (request, response) => {
  const { name, email, password } = request.body
  // db.User.create({name: 'joe', email: 'test@example.com'}).then((err, res) => {
  //   console.log(err, res)
  //   response.status(201).send(`User added with ID: ${result.rows[0].id}`)
  //
  // })

  //OLD QUERY: "INSERT INTO users (name, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')));"
  var q = "INSERT INTO users (name, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf'))) RETURNING id"
  pool.query(q, [name, email, password], (error, result) => {
    console.log(q)
    console.log(result.rows[0].id)
    if (error) {
      throw error
    }
     response.status(201).send(`User added with ID: ${result.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email, password} = request.body
  const updateCrypt = "crypt($4, gen_salt('bf'))"

  var q = `UPDATE users SET name = $1, email = $2, password = ${updateCrypt} WHERE id = $3`

  pool.query(
    q,
    [name, email, id, password],
    (error, results) => {
      console.log(q)
      if (error) {
        throw error
      }
      console.log("hello")
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
