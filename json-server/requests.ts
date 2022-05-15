import axios from 'axios'

const makeGetRequest = async () => {
  try {
    const res = await axios.get('http://localhost:3000/users')
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

const makePostRequest = async () => {
  try {
    const data = {
      "id": "7",
      "firstName": "Vansh",
      "lastName": "Thapar",
      "email": "vansh@sixergame.com",
      "age": 34,
      "companyId": "1"
    }
    await axios.post('http://localhost:3000/users', data)
    console.log('Added user')
  } catch (error) {
    console.log(error)
  }
}

const makePutRequest = async () => {
  try {
    const data = { name: 'John Doe', occupation: 'gardener' }
    await axios.put('http://localhost:3000/users/2', data)
    console.log('Updated user')
  } catch (error) {
    console.log(error)
  }
}

const makeDeleteRequest = async () => {
  try {
    await axios.put('http://localhost:3000/users/2')
    console.log('Deleted user')
  } catch (error) {
    console.log(error)
  }
}

makePostRequest()
makeGetRequest()
makePutRequest()
makeDeleteRequest()
