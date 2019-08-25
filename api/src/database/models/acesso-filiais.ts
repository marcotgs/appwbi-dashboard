/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acessoFiliaisModelInit = (sequelize: Sequelize): acessoFiliaisModelStatic => {
	return sequelize.define("acessoFiliais", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'idAcessoEmpresas': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			field: 'id_acesso_empresas'
		},
		'codigo': {
			type: DataTypes.STRING(6),
			allowNull: false,
			comment: "null",
			field: 'codigo'
		},
		'descricao': {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: "null",
			field: 'descricao'
		}
	}, {
		tableName: 'acesso_filiais',
		timestamps: false
	}) as acessoFiliaisModelStatic;
};

export interface acessoFiliaisModel extends Model {
	id:number;
	idAcessoEmpresas:number;
	codigo:string;
	descricao:string;
}

export type acessoFiliaisModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acessoFiliaisModel;
};

export default acessoFiliaisModelInit;