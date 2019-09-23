import municipioModelInit from '../models/municipio';
import estadoModelInit from '../models/estado';
import { Sequelize } from 'sequelize/types';

const addMunicipioAssociation = (sequelize: Sequelize): void => {
    console.log('asasa');
    const municipio = municipioModelInit(sequelize);
    const estado = estadoModelInit(sequelize);
    estado.hasMany(municipio, {
        foreignKey: 'id_estado',
    });

};

export default addMunicipioAssociation;