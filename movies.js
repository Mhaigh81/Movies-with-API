const moviesWrapper = document.querySelector(".movies")
console.log(moviesWrapper)


function searchChange(event){
    // console.log(event.target.value)
}

async function renderMovies(){
    const response = (await fetch('http://www.omdbapi.com/?s=batman&apikey=900cdde7'))
    const data = await response.json()
    const moviesArr = data.Search
    console.log(moviesArr)
    // moviesWrapper.innerHTML = moviesArr.map((movie) => {
    //     return `
    //     <div class="movie">
    //     <img src= alt="" />
    //     <h2>Title</h2>
    //     <h4>Year</h4>
    //     <button>Learn More</button>
    //     </div>
    //     `
    // })
}

renderMovies();