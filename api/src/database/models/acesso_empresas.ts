/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acesso_empresasModelInit = (sequelize: Sequelize): acesso_empresasModelStatic => {
	return sequelize.define("acesso_empresas", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'razaoSocial': {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: "null"
		},
		'nomeFantasia': {
			type: DataTypes.STRING(30),
			allowNull: false,
			comment: "null"
		},
		'email': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null"
		},
		'endereco': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null"
		},
		'numero': {
			type: DataTypes.STRING(6),
			allowNull: false,
			comment: "null"
		},
		'complemento': {
			type: DataTypes.STRING(4),
			allowNull: true,
			comment: "null"
		},
		'bairro': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null"
		},
		'cep': {
			type: DataTypes.STRING(10),
			allowNull: false,
			comment: "null"
		},
		'id_municipio': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'municipio',
				key: 'id'
			}
		}
	}, {
		tableName: 'acesso_empresas',
		timestamps: false
	}) as acesso_empresasModelStatic;
};

interface acesso_empresasModel extends Model {
	id:number;
	razaoSocial:string;
	nomeFantasia:string;
	email:string;
	endereco:string;
	numero:string;
	complemento:string;
	bairro:string;
	cep:string;
	id_municipio:number;
}

type acesso_empresasModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acesso_empresasModel;
};

export default acesso_empresasModelInit;