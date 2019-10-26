/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const municipioModelInit = (sequelize: Sequelize): municipioModelStatic => {
	return sequelize.define("municipio", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'nome': {
			type: DataTypes.STRING(250),
			allowNull: true,
			comment: "null",
			field: 'nome'
		},
		'idEstado': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'estado',
				key: 'id'
			},
			field: 'id_estado'
		},
		'codigoCidadeIbge': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			field: 'codigoCidadeIbge'
		},
		'codigoCompletoCidadeIbge': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			field: 'codigoCompletoCidadeIbge'
		}
	}, {
		tableName: 'municipio',
		timestamps: false
	}) as municipioModelStatic;
};

export interface municipioModel extends Model {
	id:number;
	nome:string;
	idEstado:number;
	codigoCidadeIbge:number;
	codigoCompletoCidadeIbge:number;
}

export type municipioModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):municipioModel;
};

export default municipioModelInit;