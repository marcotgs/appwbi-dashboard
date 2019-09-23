/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acessoUsuariosModelInit = (sequelize: Sequelize): acessoUsuariosModelStatic => {
	return sequelize.define("acessoUsuarios", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'nome': {
			type: DataTypes.STRING(30),
			allowNull: false,
			comment: "null",
			field: 'nome'
		},
		'sobrenome': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null",
			field: 'sobrenome'
		},
		'email': {
			type: DataTypes.STRING(60),
			allowNull: false,
			comment: "null",
			field: 'email'
		},
		'password': {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "null",
			field: 'password'
		},
		'passwordSalt': {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "null",
			field: 'password_salt'
		},
		'idAcessoEmpresas': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'acesso_empresas',
				key: 'id'
			},
			field: 'id_acesso_empresas'
		},
		'idNiveisPermissao': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'acesso_niveis_permissao',
				key: 'id'
			},
			field: 'id_niveis_permissao'
		},
		'resetPasswordToken': {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "null",
			field: 'reset_password_token'
		},
		'cep': {
			type: DataTypes.STRING(10),
			allowNull: true,
			comment: "null",
			field: 'cep'
		},
		'endereco': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null",
			field: 'endereco'
		},
		'bairro': {
			type: DataTypes.STRING(80),
			allowNull: true,
			comment: "null",
			field: 'bairro'
		},
		'complemento': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			field: 'complemento'
		},
		'idMunicipio': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'municipio',
				key: 'id'
			},
			field: 'id_municipio'
		},
		'numero': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			field: 'numero'
		}
	}, {
		tableName: 'acesso_usuarios',
		timestamps: false
	}) as acessoUsuariosModelStatic;
};

export interface acessoUsuariosModel extends Model {
	id:number;
	nome:string;
	sobrenome:string;
	email:string;
	password:string;
	passwordSalt:string;
	idAcessoEmpresas:number;
	idNiveisPermissao:number;
	resetPasswordToken:string;
	cep:string;
	endereco:string;
	bairro:string;
	complemento:string;
	idMunicipio:number;
	numero:number;
}

export type acessoUsuariosModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acessoUsuariosModel;
};

export default acessoUsuariosModelInit;