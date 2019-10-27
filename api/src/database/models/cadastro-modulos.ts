/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const cadastroModulosModelInit = (sequelize: Sequelize): cadastroModulosModelStatic => {
	return sequelize.define("cadastroModulos", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'descricao': {
			type: "NCHAR(30)",
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
		tableName: 'cadastro_modulos',
		timestamps: false
	}) as cadastroModulosModelStatic;
};

export interface cadastroModulosModel extends Model {
	id:number;
	descricao:any;
	idAcessoNiveisPermissao:number;
	icone:string;
}

export type cadastroModulosModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):cadastroModulosModel;
};

export default cadastroModulosModelInit;