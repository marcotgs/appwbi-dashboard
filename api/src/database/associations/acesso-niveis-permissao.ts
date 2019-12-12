import { acessoNiveisPermissaoModelStatic } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addAcessoNiveisPermissaoAssociation = (models: any): void => {
    (models.acessoNiveisPermissao as acessoNiveisPermissaoModelStatic).hasMany(
        models.acessoUsuarios, {
            foreignKey: 'id_acesso_niveis_permissao',
        }
    );
    (models.acessoNiveisPermissao as acessoNiveisPermissaoModelStatic).hasMany(
        models.cadastroRotinas, {
            foreignKey: 'id_acesso_niveis_permissao',
        }
    );

    (models.acessoNiveisPermissao as acessoNiveisPermissaoModelStatic).hasMany(
        models.cadastroProcessos, {
            foreignKey: 'id_acesso_niveis_permissao',
        }
    );

    (models.acessoNiveisPermissao as acessoNiveisPermissaoModelStatic).hasMany(
        models.cadastroModulos, {
            foreignKey: 'id_acesso_niveis_permissao',
        }
    );
};

export default addAcessoNiveisPermissaoAssociation;