/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const mensagemModelInit = (sequelize: Sequelize): mensagemModelStatic => {
	return sequelize.define("mensagem", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'titulo': {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "null",
			field: 'titulo'
		},
		'mensagem': {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "null",
			field: 'mensagem'
		},
		'enviado': {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			comment: "null",
			field: 'enviado'
		},
		'idEmpresa': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			field: 'id_empresa'
		},
		'idCadastroSetores': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'cadastro_setores',
				key: 'id'
			},
			field: 'id_cadastro_setores'
		},
		'dataCadastro': {
			type: DataTypes.DATE,
			allowNull: false,
			comment: "null",
			field: 'data_cadastro'
		},
		'dataEnviada': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null",
			field: 'data_enviada'
		}
	}, {
		tableName: 'mensagem',
		timestamps: false
	}) as mensagemModelStatic;
};

export interface mensagemModel extends Model {
	id:number;
	titulo:string;
	mensagem:string;
	enviado:boolean;
	idEmpresa:number;
	idCadastroSetores:number;
	dataCadastro:Date;
	dataEnviada:Date;
}

export type mensagemModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):mensagemModel;
};

export default mensagemModelInit;