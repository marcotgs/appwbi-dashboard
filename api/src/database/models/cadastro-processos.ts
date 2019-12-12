/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const cadastroProcessosModelInit = (sequelize: Sequelize): cadastroProcessosModelStatic => {
	return sequelize.define("cadastroProcessos", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'descricao': {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "null",
			field: 'descricao'
		},
		'idCadastroRotinas': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'cadastro_rotinas',
				key: 'id'
			},
			field: 'id_cadastro_rotinas'
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
		'funcao': {
			type: DataTypes.STRING(60),
			allowNull: true,
			comment: "null",
			field: 'funcao'
		},
		'icone': {
			type: DataTypes.STRING(40),
			allowNull: true,
			comment: "null",
			field: 'icone'
		},
		'idCadastroModulos': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'cadastro_modulos',
				key: 'id'
			},
			field: 'id_cadastro_modulos'
		}
	}, {
		tableName: 'cadastro_processos',
		timestamps: false
	}) as cadastroProcessosModelStatic;
};

export interface cadastroProcessosModel extends Model {
	id:number;
	descricao:string;
	idCadastroRotinas:number;
	idAcessoNiveisPermissao:number;
	funcao:string;
	icone:string;
	idCadastroModulos:number;
}

export type cadastroProcessosModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):cadastroProcessosModel;
};

export default cadastroProcessosModelInit;