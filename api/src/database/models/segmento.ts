/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const segmentoModelInit = (sequelize: Sequelize): segmentoModelStatic => {
	return sequelize.define("segmento", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'nome': {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: "null",
			field: 'nome'
		},
		'imagem': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			field: 'imagem'
		},
		'idAcesso': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'acesso',
				key: 'id'
			},
			field: 'id_acesso'
		},
		'codigo': {
			type: DataTypes.STRING(4),
			allowNull: true,
			comment: "null",
			field: 'codigo'
		}
	}, {
		tableName: 'segmento',
		timestamps: false
	}) as segmentoModelStatic;
};

export interface segmentoModel extends Model {
	id:number;
	nome:string;
	imagem:string;
	idAcesso:number;
	codigo:string;
}

export type segmentoModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):segmentoModel;
};

export default segmentoModelInit;