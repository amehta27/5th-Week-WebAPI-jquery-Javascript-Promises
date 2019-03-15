let ulList = document.getElementById('ulList')

async function getPostsUsingAsync() {


    let response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    let json = await response.json()
    json.forEach(function(element){
      fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`)
        .then(function(response){
         return response.json()
        }).then(function(json){
            let liItems= `
            <li>

           <span><a href=${json.url}><span>${json.title}</span></a></span>
           <span>${json.by}</span>
           <span>${Date(json.time * 1000)}</span>`
           ulList.insertAdjacentHTML('beforeend',liItems)
        })


      })
}

getPostsUsingAsync();


// displayItems{
//   let item =
// }
