let btnviewAllOrders = document.getElementById('btnviewAllOrders')
let btnCreateNewOrder = document.getElementById('btnCreateNewOrder')
let viewOrderByEmail = document.getElementById('viewOrderByEmail')
let deleteOrderByEmail = document.getElementById('deleteOrderByEmail')
let txtSearchEmail = document.getElementById('txtSearchEmail')
let txtCoffee = document.getElementById('txtCoffee')
let txtemail = document.getElementById('txtemail')
let cofeeList = document.getElementById('cofeeList')

btnviewAllOrders.addEventListener('click', function(){
  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/')
  .then(function(response){
    return response.json()
  }).then(function(json){
  let orders =  Object.keys(json).map(function(email){
      let orderKey = json[email]
    return`<li>
       <p>coffeeType:${orderKey.coffee}</p>
       <p>emailaddress:${orderKey.emailAddress}</p>
       <p>size:${orderKey.size}</p>
       <p>flavor:${orderKey.flavor}</p>
       </li>
       `

    })
    cofeeList.innerHTML= orders.join("")


  })
})

btnCreateNewOrder.addEventListener('click', function(){

  let paramsToSend = {emailAddress: txtemail.value, coffee:txtCoffee.value}
  fetch('http://dc-coffeerun.herokuapp.com/api/coffeeorders/', {
  method : 'POST',
  headers : {
    'Content-Type' : 'application/json'
  },
   body: JSON.stringify(paramsToSend)
 }).then(function(response){
   return response.json()
 }).then(function(json){
   console.log(json)
 })



})


viewOrderByEmail.addEventListener('click',function(){
  cofeeList.innerHTML = ''
  let txtSearchEmailId = txtSearchEmail.value
  let emailSearchURL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${txtSearchEmailId}`
  fetch(emailSearchURL)
  .then(function(response){
    return response.json()
  }).then(function(json){
  let orders = `<li>
       <p>coffeeType:${json.coffee}</p>
       <p>emailaddress:${json.emailAddress}</p>
       <p>size:${json.size}</p>
       <p>flavor:${json.flavor}</p>
       </li>
       `
    cofeeList.innerHTML += orders


  })
})

deleteOrderByEmail.addEventListener('click',function(){
  let txtSearchEmailId = txtSearchEmail.value
  let emailSearchURL = `http://dc-coffeerun.herokuapp.com/api/coffeeorders/${txtSearchEmailId}`
  fetch(emailSearchURL, {
  method : 'DELETE',
  headers : {
    'Content-Type' : 'application/json'
  }

 }).then(function(response){
   return response.json()
 }).then(function(json){
   console.log(json)
 })


})
