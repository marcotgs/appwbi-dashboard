import { acessoUsuariosModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addAcessoUsuariosAssociation = (models: any): void => {
    (models.acessoUsuarios as acessoUsuariosModelStatic).belongsTo(
        models.municipio, {
            foreignKey: 'id_municipio',
        }
    );
    (models.acessoUsuarios as acessoUsuariosModelStatic).belongsTo(
        models.empresa, {
            foreignKey: 'id_empresa',
        }
    );
    (models.acessoUsuarios as acessoUsuariosModelStatic).belongsTo(
        models.cadastroSetores, {
            foreignKey: 'id_setor',
        }
    );
    (models.acessoUsuarios as acessoUsuariosModelStatic).belongsTo(
        models.acessoNiveisPermissao, {
            foreignKey: 'id_acesso_niveis_permissao',
        }
    );
};

export default addAcessoUsuariosAssociation;