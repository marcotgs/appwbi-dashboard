import { cadastroSetoresModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addCadastroSetoresAssociation = (models: any): void => {
    (models.cadastroSetores as cadastroSetoresModelStatic).belongsTo(
        models.empresa, {
            foreignKey: 'id_empresa',
        }
    );
};

export default addCadastroSetoresAssociation;