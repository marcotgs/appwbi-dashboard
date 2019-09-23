/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const estadoModelInit = (sequelize: Sequelize): estadoModelStatic => {
	return sequelize.define("estado", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			field: 'id'
		},
		'nome': {
			type: DataTypes.STRING(250),
			allowNull: true,
			comment: "null",
			field: 'nome'
		},
		'sigla': {
			type: DataTypes.STRING(250),
			allowNull: true,
			comment: "null",
			field: 'sigla'
		}
	}, {
		tableName: 'estado',
		timestamps: false
	}) as estadoModelStatic;
};

export interface estadoModel extends Model {
	id:number;
	nome:string;
	sigla:string;
}

export type estadoModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):estadoModel;
};

export default estadoModelInit;