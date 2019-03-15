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
  let storeObject = {storeName : snapshot.val().storeName, key : snapshot.key, items: []}

stores.push(storeObject)
displayStores()
})

function displayStores(){
  //console.log(stores)
  let storeLIItems = stores.map((store) => {

    let listItems = store.items.map((listItem) => {
      return `<span>${listItem}</span>`
    }).join("")

    return `<li>
    ${store.storeName}
    <button onclick="deleteStore('${store.key}')">Delete store</button>
    <input type="text" id="groceryItemCategoryTextBox" placeholder="enter grocery items" />
    <button onclick=addItem('${store.key}',this)>Add Item</button>
    ${listItems}
    </li>

    `
  })
storesUl.innerHTML = storeLIItems.join("")
}

function addItem(store,item){
  let groceryItem = groceryItemCategoryTextBox.value
  let groceryRef = database.ref("stores/" + store).child("/items")
  groceryRef.on("value", function(snapshot) {
    for (key in stores) {
      if (stores[key].key == store) {
        stores[key].items.push(snapshot.val().item)
      }
    }
    console.log(stores)
  })

  groceryRef.on("child_removed", function(snpashot) {


  })
  groceryRef.push({item : item.previousElementSibling.value})





}


  // console.log(store)
  // console.log(item.previousElementSibling.value)


function deleteStore(key) {
  console.log(key)
  database.ref("stores").child(key).remove()

}
