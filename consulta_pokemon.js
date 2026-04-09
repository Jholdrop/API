const prompt = require ('prompt-sync')();
let pokemon = prompt("Digite o pokemon:");
const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
fetch (url)
.then ((resposta)=>{
    return resposta.json();
})

.then((dados)=>{
//CEP invalido?
if(dados.erro){
    console.log("CEP não encontrado!");
    return;
}
console.log("\n\n\nDados do POKEMON:");
console.log("ID-DEX:", dados.id);
console.log("Nome:", dados.name);
console.log("ataques que podem ser aprendidos:")
    for (let i = 0; i < 5; i++){
    console.log("\n", [i+1], dados.moves[i].move.name);
}
 return fetch(dados.species.url);
})
.then((resposta) => resposta.json())
.then(dadosSpecies => {
     let geracao = dadosSpecies.generation.name;
     if (geracao === "generation-i") geracao = "Geração 1";
     else if (geracao === "generation-ii") geracao = "Geração 2";
     else if(geracao === "generation-iii") geracao = "Geração 3";
     else if(geracao === "generation-iv") geracao = "Geração 4";
     else if(geracao === "generation-v") geracao = "Geração 5";
     else if (geracao === "generation-vi") geracao = "Geração 6";
     console.log(geracao);
      })