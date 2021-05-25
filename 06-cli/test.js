const { deepEqual, ok } = require('assert');
const database = require('./database');

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de Herois', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    });

    it('deve pesquisar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const [result] = await database.listarArquivo(expected.id);
        deepEqual(result, expected);
    });

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [actual] = await database.listarArquivo(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(actual, expected);
    });

    it('deve remove um heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);

        deepEqual(resultado, expected)
    });
});