import addMunicipioAssociation from './municipio';
import path from 'path';
import fs from 'fs';
import { Sequelize } from 'sequelize/types';

const readModels = (sequelize: Sequelize): void => {
    var db: any = {};
    const modelsDir = path.join(__dirname, '../..', '/database/models');
    fs.readdirSync(modelsDir)
        .forEach((file): void => {
            var model = sequelize.import(path.join(modelsDir, file));
            db[model.name] = model;
        });
    db.estado.hasMany(db.municipio, {
        foreignKey: 'id_estado',
    });
    db.municipio.belongsTo(db.estado, {
        foreignKey: 'id_estado',
    });
    db.municipio.findByPk(5571, {
        include: [
            {
                model: db.estado
            }
        ]
    }).then((a: any) => {
        console.log(a);
    });
};



// Object.keys(db).forEach(modelName => {
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

const addAssociations = (sequelize: Sequelize): void => {
    readModels(sequelize);
};

export default addAssociations;