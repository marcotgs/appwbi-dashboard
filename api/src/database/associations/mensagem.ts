import { mensagemModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addMensagemAssociation = (models: any): void => {
    (models.mensagem as mensagemModelStatic).belongsTo(
        models.cadastroSetores, {
            foreignKey: 'id_cadastro_setores',
        }
    );
};

export default addMensagemAssociation;