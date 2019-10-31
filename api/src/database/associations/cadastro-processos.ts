import { cadastroProcessosModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addCadastroProcessosAssociation = (models: any): void => {
    (models.cadastroProcessos as cadastroProcessosModelStatic).belongsTo(
        models.cadastroRotinas, {
            foreignKey: 'id_cadastro_rotinas',
        }
    );
    (models.cadastroProcessos as cadastroProcessosModelStatic).belongsTo(
        models.acessoNiveisPermissao, {
            foreignKey: 'id_acesso_niveis_permissao',
        }
    );
};

export default addCadastroProcessosAssociation;