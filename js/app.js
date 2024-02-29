//Selectores
const inputTitle = document.querySelector("#search");
const container = document.querySelector(".container-cards");
let timer;

//Eventos
inputTitle.addEventListener("input",(event)=>{
    //Event = evento que ocurrio
    //Target = la etiqueta donde ocurrio el evento
    //value = el valor del input si no fuera input seria textContent
    // console.log(event.target.value);

    //Hacemos un BackDrop de forma manual con Javascript
    clearTimeout(timer)
    timer = setTimeout(() =>{
            //llamado a la API
        callToApi(event.target.value)
    }, 500)
    
})

async function callToApi(title){
    try {
        //Modifico la URL de la peticion donde añao mi apikey y el titulo por variable de lo que escriban en el input
        const URL = `https://www.omdbapi.com/?apikey=3f1926ac&s=${title}`
        //Realizo la peticion HTTP con el servicio fecth
        const response = await fetch(URL);
        const data = await response.json();
        
        printMovies(data.Search)
    } catch (error) {
        
    }
    

}

// funcion para mostrar las peliculas en html
function printMovies(movies){
    //Limpiar el html
    cleanHTML()

    //validar que si existan peliculas
    if (!movies) {
        const titleError = document.createElement("h2")
        titleError.textContent = "La pelicula no fue encontrada :("
        titleError.classList.add("alert")
        container.appendChild(titleError)
    }
    // recorremos la lista
    movies.forEach(movie => {
        //inyectar en html
        container.innerHTML += `<div class="card">
        <h2 class="title-movie">${movie.Title}</h2>
        <img src="${movie.Poster}" alt="batman">
        <p>Año: <span>${movie.Year}</span></p>
        <p>Tipo: <span>${movie.Type}</span></p>
        <button>Ver mas</button>
    </div>`
        
    });
}

function cleanHTML(){
    //se crea un while que entre si tiene un hijo en el html
    while (container.firstChild) {
        //eliminamos las peliculas que esten en el html
        container.removeChild(container.firstChild)
    }
}

//ver mas

//url con i para id `https://www.omdbapi.com/?apikey=3f1926ac&i=${id}`