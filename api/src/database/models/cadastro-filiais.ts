/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const cadastroFiliaisModelInit = (sequelize: Sequelize): cadastroFiliaisModelStatic => {
	return sequelize.define("cadastroFiliais", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'idEmpresa': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'empresa',
				key: 'id'
			},
			field: 'id_empresa'
		},
		'filial': {
			type: "NCHAR(10)",
			allowNull: false,
			comment: "null",
			field: 'filial'
		},
		'descricao': {
			type: "NCHAR(30)",
			allowNull: false,
			comment: "null",
			field: 'descricao'
		}
	}, {
		tableName: 'cadastro_filiais',
		timestamps: false
	}) as cadastroFiliaisModelStatic;
};

export interface cadastroFiliaisModel extends Model {
	id:number;
	idEmpresa:number;
	filial:any;
	descricao:any;
}

export type cadastroFiliaisModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):cadastroFiliaisModel;
};

export default cadastroFiliaisModelInit;