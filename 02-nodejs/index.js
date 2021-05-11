/*
 0 Obter um usuario
 1 Obter o numero de telefone do usuario a partir de um id
 2 Obter o endereco do usuario pelo id
*/

// importamos um modulo interno do node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function() {
            // return reject(new Error('Deu ruim de verdade'));

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            });
        }, 1000);
    });
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(function() {
            return resolve({
                telefone: '1299003',
                ddd: 11
            })
        }, 2000);
    });
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        });
    }, 2000);
}
const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos a função .then
// para manipular erros, usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome},
            Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero},
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `);
    })
    .catch(function (error) {
        console.log('DEU RUIM', error);
    })


// obterUsuario(function resolverUsuario(error, usuario) {
//     if(error) {
//         console.error('DEU RUIM em USUARIO', error);
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error('DEU RUIM em TELEFONE', error1);
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if(error2) {
//                 console.error('DEU RUIM em ENDERECO', error2);
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereço: ${endereco.rua}, n°: ${endereco.numero},
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `);
//         });
//     })
// });