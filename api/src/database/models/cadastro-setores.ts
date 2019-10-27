/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const cadastroSetoresModelInit = (sequelize: Sequelize): cadastroSetoresModelStatic => {
	return sequelize.define("cadastroSetores", {
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
		'descricao': {
			type: "NCHAR(60)",
			allowNull: false,
			comment: "null",
			field: 'descricao'
		},
		'codigo': {
			type: DataTypes.STRING(4),
			allowNull: true,
			comment: "null",
			field: 'codigo'
		}
	}, {
		tableName: 'cadastro_setores',
		timestamps: false
	}) as cadastroSetoresModelStatic;
};

export interface cadastroSetoresModel extends Model {
	id:number;
	idEmpresa:number;
	descricao:any;
	codigo:string;
}

export type cadastroSetoresModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):cadastroSetoresModel;
};

export default cadastroSetoresModelInit;