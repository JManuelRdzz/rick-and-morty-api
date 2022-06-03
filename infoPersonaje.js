const getUrl = new URLSearchParams(window.location.search);
let id = getUrl.get('id');

const url = `https://rickandmortyapi.com/api/character/${id}`;

const btnAtras = document.querySelector('.btnAtras');

btnAtras.addEventListener('click', ()=>{
    window.history.back();
});

const imagenP = document.querySelector('.imagen');

const nombre = document.querySelector('.nombre');
const genero = document.querySelector('.genero');
const statusIcon = document.querySelector('.status_icon');
const statusP = document.querySelector('.status');
const locationP = document.querySelector('.location');
const numEpisodios = document.querySelector('.numEpisodios');
const primerEpisodio = document.querySelector('.primerEpisodio');

const cargarInfoPersonaje = async()=>{
    try {

        const res = await fetch(url);
        
        if(res.status === 200){

            const personaje = await res.json();
            
            const img = document.createElement('img');
            img.src = personaje.image;

            nombre.innerHTML = personaje.name;
            genero.innerHTML = personaje.gender;

            if(personaje.status === "Dead")
                statusIcon.style.background = "#8e0000";
            else if(personaje.status === "Alive")
                statusIcon.style.background = "#008e1a";
            else if(personaje.status === 'unknown')
                statusIcon.style.background = "#111111";

            statusP.innerHTML = `${personaje.status} - ${personaje.species}`;

            let urlLocation = personaje.location.url;
            const resLocation = await fetch(urlLocation);
            const loc = await resLocation.json();

            locationP.innerHTML = loc.name;

            numEpisodios.innerHTML = personaje.episode.length;


            // console.log(personaje.episode[0]);
            const resEpisodio = await fetch(personaje.episode[0]);
            
            const primEpi = await resEpisodio.json();

            primerEpisodio.innerHTML = `${primEpi.name} - ${primEpi.episode}`;

            imagenP.appendChild(img);
        }

    } catch (error) {
        console.log(error);
    }
}

cargarInfoPersonaje();