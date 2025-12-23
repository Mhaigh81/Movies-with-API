// GRABBING ELEMENTS FROM HTML

const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".searchName")

// GLOBAL VARIABLE
let currentMovies = []

// HANDLING SEARCH
function searchChange(event){
    renderMovies(event.target.value);
    searchName.innerHTML = event.target.value
    // console.log(searchName)
}


// RENDER MOVIES CALLING API
async function renderMovies(searchTerm){
    const response = (await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=900cdde7`))
    const data = await response.json();
    currentMovies = data.Search;
    displayMovies(currentMovies)
}

// DISPLAYING MOVIES
function displayMovies(movieList) {
    moviesWrapper.innerHTML = movieList
        .slice(0, 6)
        .map((movie) => {
        return `
        <div class="movie">
            <figure>
                <img class="movie__img" src=${movie.Poster} alt="">
            </figure>
            <h2 class="movie__title">${movie.Title}</h2>
            <h4 class="movie__year">${movie.Year}</h4>
            <button class="movie__btn">Learn More</button>
        </div>
        `
    }).join("")
}

// SORTING MOVIES
function sortChange(event){
    const sortOption = event.target.value

    let sortedMovies = [...currentMovies]

    if (sortOption === "newest"){
        sortedMovies.sort((a, b) => b.Year - a.Year)
    }
    else if (sortOption === "oldest"){
        sortedMovies.sort((a, b) => a.Year - b.Year)
    }

    displayMovies(sortedMovies)
}