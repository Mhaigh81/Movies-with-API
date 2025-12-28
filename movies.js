// GRABBING ELEMENTS FROM HTML

const moviesWrapper = document.querySelector(".movies");
const searchName = document.querySelector(".searchName")

// // GLOBAL VARIABLE
let currentMovies = []

// HANDLING SEARCH
function searchChange(event){
    renderMovies(event.target.value);
    searchName.innerHTML = event.target.value
}


// RENDER MOVIES CALLING API
async function renderMovies(searchTerm){
    
    moviesWrapper.classList.add('movies__loading')
    moviesWrapper.innerHTML = `<i class="fa-solid fa-spinner books__loading--spinner"></i>`

    const response = (await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=900cdde7`))
    const data = await response.json();
    currentMovies = data.Search;
    
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!currentMovies){
        moviesWrapper.innerHTML = "No Movies Found"
    }
    else displayMovies(currentMovies)

    moviesWrapper.classList.remove('movies__loading')
}


// DISPLAYING MOVIES
function displayMovies(movieList) {
   
    moviesWrapper.innerHTML = movieList
        .slice(0, 6)
        .map((movie) => {
        return `
        <div class="movie">
            <figure>
                <img class="movie__img" src="${movie.Poster}" alt="" onerror="this.onerror=null; this.src='./assets/no-image.png';"></img>
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

    const getYear = (movie) => {
    const parts = movie.Year.split(/[-–]/)
        .map(p => p.trim())
        .filter(p => p !== "")
        .map(Number);
    return parts[parts.length - 1];
    };

    if (sortOption === "newest"){
        sortedMovies.sort((a, b) => getYear(b) - getYear(a))
    }
    else if (sortOption === "oldest"){
        sortedMovies.sort((a, b) => getYear(a) - getYear(b))
    }

    displayMovies(sortedMovies)
}
