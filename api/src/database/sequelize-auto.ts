/* eslint-disable @typescript-eslint/no-var-requires */
var SequelizeAuto = require('sequelize-auto');
import Config from '@api/util/config';

Config.init();


// Essa Lógica é usada para gerar os modelos do banco de dados correspondente. 
// Para mais detalhes ler o arquivo de Readme desta API.

const auto = new SequelizeAuto(process.env['DB_SERVER_DATABASE'], process.env['DB_SERVER_USERNAME'], process.env['DB_SERVER_PASSWORD'], {
    host: process.env['DB_SERVER'],
    dialect: 'mssql',
    directory: './src/database/models',
    camelCase: true,
    dashesForFileName: true,
    additional: {
        timestamps: false
    },
    typescript: true,
    tables: ['empresa', 'acesso_niveis_permissao', 'acesso_usuarios', 'municipio', 'estado',
        'cadastro_filiais', 'cadastro_modulos', 'cadastro_processos', 'cadastro_rotinas', 'cadastro_setores',
        'segmento', 'usuario', 'mensagem']
});

auto.run((err: string): void => {
    if (err) throw err;
    else {
        console.log('\x1b[32m', 'Sucesso -> Arquivos gerados');
        console.log('\x1b[0m');
    }
});