let numeroPagina = 1;

const btnSiguiente = document.querySelector('.btnSiguiente');
const btnAnterior = document.querySelector('.btnAnterior');

btnSiguiente.addEventListener('click', () => {
    if(numeroPagina <= 42){
        numeroPagina++;
        cargarPersonajes();
    }      
});

btnAnterior.addEventListener('click', () => {
    if(numeroPagina > 1){
        numeroPagina--;
        cargarPersonajes();
    }
});

const contenedorImages = document.querySelector('.images');

const cargarPersonajes = async() =>{
    try {
        contenedorImages.innerHTML = '';
        
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${numeroPagina}`);

        if(res.status === 200){
            const datos = await res.json();

            datos.results.forEach(personaje => {

                const img = document.createElement('img');
                img.src = personaje.image;
                img.classList.add('floating')

                img.addEventListener('click', ()=>{
                    window.location.href = `./infoPersonaje.html?id=${personaje.id}`;
                });

                contenedorImages.appendChild(img);
                
            });
            
        }

    } catch (error) {
        console.log(error);
    }
}

cargarPersonajes();



