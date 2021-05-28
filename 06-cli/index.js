const { Command } = require("commander");
const Commander = new Command();
const options = Commander.opts();
const Heroi = require('./heroi');
const Database = require('./database');

(async () => {
  /**
   * node cli.js --help
   */
  Commander
    .version('v1')
    .option('-n, --nome [value]', 'adicionar nome')
    .option('-p, --poder [value]', 'adicionar poder')
    //CRUD
    .option('-c, --cadastrar', 'cadastrar Heroi')
    .option('-r, --listar [value]', 'listar herois pelo id')
    .option('-u, --atualizar [value]', 'atualizar heroi pelo id')
    .option('-d, --remover [value]', 'remover heroi pelo id')
    .parse(process.argv);

  const heroi = new Heroi(options);
  try {
    /**
     * node cli.js --cadastrar params...
     * node cli.js -c -n Hulk -p Forca
     */
    if (options.cadastrar) {
      await Database.cadastrar(heroi);
      console.log('item cadastrado com sucesso!');
      return;
    }

    /**
     * node cli.js --listar
     * node cli.js -r
     * node cli.js -r 1
     */
    if (options.listar) {
      const id = options.listar;
      const result = await Database.listar(id);
      console.log(result);
      return;
    }

    /**
     * node cli.js --atualizar
     * node cli.js -u 1 -n papa
     * node cli.js -u 1 -n thor -p trovao
     */
    if (options.atualizar) {
      const id = options.atualizar;
      console.log('id', id);
      await Database.atualizar(id, heroi);
      console.log('item atualizado com sucesso!');
      return;
    }
    /**
     * node cli.js --remover
     * node cli.js -d 1
     */
    if (options.remover) {
      const id = options.remover;
      await Database.remover(id);
      console.log('item removido com sucesso!');
      return;
    }
  } catch (error) {
    console.error('DEU RUIM', error);
    return;
  }
})();