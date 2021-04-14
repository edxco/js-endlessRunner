  
//to get the KEY
let newGame = {
  name: "Ice Warrior"
}

fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games`, {
  method: 'post',
  headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newGame)
  })
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    console.log('post request response data', data)
  })