/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import fs from 'fs';
import { Sequelize } from 'sequelize/types';

import addAcessoUsuariosAssociation from './acesso-usuarios';
import addMunicipioAssociation from './municipio';

const readModels = (sequelize: Sequelize): void => {
    const models: any = {};
    const modelsDir = path.join(__dirname, '../..', '/database/models');
    fs.readdirSync(modelsDir)
        .forEach((file): void => {
            var model = sequelize.import(path.join(modelsDir, file));
            models[model.name] = model;
        });
    return models;
};

const addAssociations = (sequelize: Sequelize): any => {
    const models = readModels(sequelize);
    addAcessoUsuariosAssociation(models);
    addMunicipioAssociation(models);
    return models;
};

export default addAssociations;