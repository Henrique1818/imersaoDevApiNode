const service = require('./service');

async function main() {
    try {
        const result = await service.obterPessoa('a');
        const names = [];

        // for(let i = 0; i <= result.results.length -1; i++) {
        //     const pessoas = result.results[i];

        //     names.push(pessoas.name);
        // }

        // for(let i in result.results) {
        //     const pessoas = result.results[i];
        //     names.push(pessoas.name)
        // }

        for(pessoa of result.results) {
            names.push(pessoa.name)
        }

        console.log('names', names);
    } catch(error) {
        console.log('Erro interno', error);
    }
}

main();