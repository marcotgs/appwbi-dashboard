import { cadastroModulosModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addCadastroModulosAssociation = (models: any): void => {
    (models.cadastroModulos as cadastroModulosModelStatic).hasMany(
        models.cadastroRotinas, {
            foreignKey: 'id_cadastro_modulos',
        }
    );
    (models.cadastroModulos as cadastroModulosModelStatic).hasMany(
        models.cadastroProcessos, {
            foreignKey: 'id_cadastro_modulos',
        }
    );
    (models.cadastroModulos as cadastroModulosModelStatic).hasMany(
        models.cadastroProcessos, {
            foreignKey: 'id_cadastro_modulos',
        }
    );
    (models.cadastroModulos as cadastroModulosModelStatic).belongsTo(
        models.acessoNiveisPermissao, {
            foreignKey: 'id_acesso_niveis_permissao',
        }
    );
};

export default addCadastroModulosAssociation;