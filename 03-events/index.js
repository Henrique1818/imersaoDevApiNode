const EventEmitter = require('events');
class MeuEmissor extends EventEmitter {

}

const meuEmissor = new MeuEmissor();
const nomeEvento = 'usuario.click';
meuEmissor.on(nomeEvento, function(click) {
    console.log('um usuario clicou', click);
});

// meuEmissor.emit(nomeEvento, 'na barra de rolagem');
// meuEmissor.emit(nomeEvento, 'no OK');

// let count = 0;
// setInterval(function() {
//     meuEmissor.emit(nomeEvento, 'no OK ' + (count ++));
// }, 1000);

const stdin = process.openStdin();

stdin.addListener('data', function(value) {
    console.log(`Você digitou: ${value.toString().trim()}`);
});


// vai funcionar sim, porém executando apenas uma vez, já que a promise
// ela foi feita para executa apenas uma vez, dirente dos eventos que pode ser executado varias vezes;
// function main() {
//     return new Promise(function(resolve, reject) {
//         stdin.addListener('data', function(value) {
//             // console.log(`Você digitou: ${value.toString().trim()}`);

//             return resolve(value);
//         });
//     })
// }

// main().then(function(resultado) {
//     console.log(`Você digitou: ${resultado.toString()}`);
// });