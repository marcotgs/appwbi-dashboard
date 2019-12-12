/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const cadastroRotinasModelInit = (sequelize: Sequelize): cadastroRotinasModelStatic => {
	return sequelize.define("cadastroRotinas", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'idCadastroModulos': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'cadastro_modulos',
				key: 'id'
			},
			field: 'id_cadastro_modulos'
		},
		'descricao': {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "null",
			field: 'descricao'
		},
		'idAcessoNiveisPermissao': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'acesso_niveis_permissao',
				key: 'id'
			},
			field: 'id_acesso_niveis_permissao'
		},
		'icone': {
			type: DataTypes.STRING(40),
			allowNull: true,
			comment: "null",
			field: 'icone'
		}
	}, {
		tableName: 'cadastro_rotinas',
		timestamps: false
	}) as cadastroRotinasModelStatic;
};

export interface cadastroRotinasModel extends Model {
	id:number;
	idCadastroModulos:number;
	descricao:string;
	idAcessoNiveisPermissao:number;
	icone:string;
}

export type cadastroRotinasModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):cadastroRotinasModel;
};

export default cadastroRotinasModelInit;