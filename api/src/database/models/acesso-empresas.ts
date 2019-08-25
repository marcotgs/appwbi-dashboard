/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acessoEmpresasModelInit = (sequelize: Sequelize): acessoEmpresasModelStatic => {
	return sequelize.define("acessoEmpresas", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'razaoSocial': {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: "null",
			field: 'razaoSocial'
		},
		'nomeFantasia': {
			type: DataTypes.STRING(30),
			allowNull: false,
			comment: "null",
			field: 'nomeFantasia'
		},
		'email': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null",
			field: 'email'
		},
		'endereco': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null",
			field: 'endereco'
		},
		'numero': {
			type: DataTypes.STRING(6),
			allowNull: false,
			comment: "null",
			field: 'numero'
		},
		'complemento': {
			type: DataTypes.STRING(4),
			allowNull: true,
			comment: "null",
			field: 'complemento'
		},
		'bairro': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null",
			field: 'bairro'
		},
		'cep': {
			type: DataTypes.STRING(10),
			allowNull: false,
			comment: "null",
			field: 'cep'
		},
		'idMunicipio': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'municipio',
				key: 'id'
			},
			field: 'id_municipio'
		}
	}, {
		tableName: 'acesso_empresas',
		timestamps: false
	}) as acessoEmpresasModelStatic;
};

export interface acessoEmpresasModel extends Model {
	id:number;
	razaoSocial:string;
	nomeFantasia:string;
	email:string;
	endereco:string;
	numero:string;
	complemento:string;
	bairro:string;
	cep:string;
	idMunicipio:number;
}

export type acessoEmpresasModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acessoEmpresasModel;
};

export default acessoEmpresasModelInit;