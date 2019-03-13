let storeCategoryTextBox = document.getElementById('storeCategoryTextBox')
let btnAdd = document.getElementById('btnAdd')
let storesUl = document.getElementById('storesUl')

let database = firebase.database()

// database.ref("stores")
// .on("child_added",function(snapshot){
//   users.push({key: snapshot.key,value: snapshot.val()})
//
// })
btnAdd.addEventListener('click',function(){
  let storeName = storeCategoryTextBox.value
  let storesRef = database.ref("stores")

  let storeRef = storesRef.push({
    storeName : storeName
})
})

let stores = []

database.ref("stores")
.on("child_removed", function(snapshot){
  stores = stores.filter((store) => {
    return store.key != snapshot.key
  })
  displayStores()
})

database.ref("stores")
.on("child_added", function(snapshot){
  let storeObject = {storeName : snapshot.val().storeName, key : snapshot.key}
  console.log(storeObject)
stores.push(storeObject)
displayStores()
})

function displayStores(){
  //console.log(stores)
  let storeLIItems = stores.map((store) => {
    console.log(store)
    return `<li>
    ${store.storeName}
    <button onclick="deleteStore('${store.key}')">Delete store</button></li>`
    displayStores()
  })
storesUl.innerHTML = storeLIItems.join("")
}

function deleteStore(key) {
  console.log(key)
  database.ref("stores").child(key).remove()

}
