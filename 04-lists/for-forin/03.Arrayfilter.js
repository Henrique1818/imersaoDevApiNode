const { obterPessoa } = require('./service');


Array.prototype.meuFilter = function(callback) {
    const lista = [];

    for(index in this) {
        const item = this[index];
        const result = callback(item, index, this);

        if(!result) continue;
        lista.push(item)
    }

    return lista;
}

async function main() {
    try {
        const { results } = await obterPessoa('a');

        // const familiaLars = results.filter(function(item) {
        //     // por padrão precisa retornar um booleano
        //     // para informar se deve manter ou remove da lista
        //     // false > remove da lista
        //     // true > mantem

        //     // não encontrou = -1;
        //     // encontrou = posição no array
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
        //     return result;
        // });

        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}, lista: ${lista.length}`);
            return item.name.toLowerCase().indexOf('lars') !== -1;
        });

        const names = familiaLars.map(pessoa => pessoa.name);

        console.log(names);
    } catch (error) {
        console.error('Deu ruim', error);
    }
}

main();