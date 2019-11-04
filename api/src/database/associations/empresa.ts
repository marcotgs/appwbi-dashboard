import { empresaModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addEmpresaAssociation = (models: any): void => {
    (models.empresa as empresaModelStatic).hasMany(
        models.cadastroSetores, {
            foreignKey: 'id_empresa',
        }
    );
    (models.empresa as empresaModelStatic).hasMany(
        models.cadastroFiliais, {
            foreignKey: 'id_empresa',
        }
    );
    (models.empresa as empresaModelStatic).belongsTo(
        models.municipio, {
            foreignKey: 'id_municipio',
        }
    );

    (models.empresa as empresaModelStatic).belongsTo(
        models.segmento, {
            foreignKey: 'id_segmento',
        }
    );
};

export default addEmpresaAssociation;