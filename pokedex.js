const pokemonName=document.querySelector('.pokemon_name');
const pokemonNumber=document.querySelector('.pokemon_number');
const PokemonImage= document.querySelector('.pokemon_image');
const form= document.querySelector('.form');
const input= document.querySelector('.input_search');
const buttonprev=document.querySelector('.btn-prev');
const buttonext=document.querySelector('.btn-next');
let pegpokemon=1;
const fetchPokemon = async (pokemon) => {
    const APIresponse= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIresponse.status===200){
    const data= await APIresponse.json();
    return data;
    }
}
const renderpokemon= async (pokemon)=>{
    pokemonName.innerHTML='Loading...';
    pokemonNumber.innerHTML='';
    const data= await fetchPokemon(pokemon);

    if(data){
    PokemonImage.style.display='block'
    pokemonName.innerHTML=data.name;
    pokemonNumber.innerHTML=data.id;
    PokemonImage.src=data['sprites']['versions']['generation-v']['black-white']['animated']
    ['front_default'];
    input.value='';
    pegpokemon=data.id;
    } else{
        PokemonImage.style.display='none'
        pokemonName.innerHTML='404';
        pokemonNumber.innerHTML='';
    }
}
form.addEventListener('submit',(event)=>{
event.preventDefault();

renderpokemon(input.value.toLowerCase());
});
buttonprev.addEventListener('click',(event)=>{
    if(pegpokemon>1){
    pegpokemon-=1;
    renderpokemon(pegpokemon);
}
});
buttonext.addEventListener('click',(event)=>{
    searchpokemon+=1;
    renderpokemon(pegpokemon);
});
renderpokemon(pegpokemon);