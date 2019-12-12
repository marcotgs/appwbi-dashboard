import { cadastroRotinasModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addCadastroRotinasAssociation = (models: any): void => {
    (models.cadastroRotinas as cadastroRotinasModelStatic).hasMany(
        models.cadastroProcessos, {
            foreignKey: 'id_cadastro_rotinas',
        }
    );
    (models.cadastroRotinas as cadastroRotinasModelStatic).belongsTo(
        models.cadastroModulos, {
            foreignKey: 'id_cadastro_modulos',
        }
    );
    (models.cadastroRotinas as cadastroRotinasModelStatic).belongsTo(
        models.acessoNiveisPermissao, {
            foreignKey: 'id_acesso_niveis_permissao',
        }
    );
};

export default addCadastroRotinasAssociation;