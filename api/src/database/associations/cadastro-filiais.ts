import { cadastroFiliaisModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addCadastroFiliaisAssociation = (models: any): void => {
    (models.cadastroFiliais as cadastroFiliaisModelStatic).belongsTo(
        models.empresa, {
            foreignKey: 'id_empresa',
        }
    );
};

export default addCadastroFiliaisAssociation;