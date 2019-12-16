import { usuarioModelStatic } from '../models/usuario';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addUsuarioAssociation = (models: any): void => {
    (models.usuario as usuarioModelStatic).belongsTo(
        models.empresa, {
            foreignKey: 'id_empresa',
        }
    );
    (models.usuario as usuarioModelStatic).belongsTo(
        models.cadastroSetores, {
            foreignKey: 'id_cadastro_setores',
        }
    );
};
export default addUsuarioAssociation;