import { cadastroSetoresModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addCadastroSetoresAssociation = (models: any): void => {
    (models.cadastroSetores as cadastroSetoresModelStatic).belongsTo(
        models.empresa, {
            foreignKey: 'id_empresa',
        }
    );
    (models.cadastroSetores as cadastroSetoresModelStatic).hasMany(
        models.acessoUsuarios, {
            foreignKey: 'id_setor',
        }
    );
};

export default addCadastroSetoresAssociation;