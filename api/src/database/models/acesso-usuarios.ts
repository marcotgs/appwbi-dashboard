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
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "null",
			field: 'nome'
		},
		'sobrenome': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "null",
			field: 'sobrenome'
		},
		'email': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null",
			field: 'email'
		},
		'password': {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "null",
			field: 'password'
		},
		'idAcessoNiveisPermissao': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'acesso_niveis_permissao',
				key: 'id'
			},
			field: 'id_acesso_niveis_permissao'
		},
		'idEmpresa': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'empresa',
				key: 'id'
			},
			field: 'id_empresa'
		},
		'ddd': {
			type: DataTypes.STRING(2),
			allowNull: true,
			comment: "null",
			field: 'ddd'
		},
		'telefone': {
			type: DataTypes.STRING(20),
			allowNull: true,
			comment: "null",
			field: 'telefone'
		},
		'activationCode': {
			type: DataTypes.STRING(40),
			allowNull: true,
			comment: "null",
			field: 'activation_code'
		},
		'ativo': {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: '1',
			comment: "null",
			field: 'ativo'
		},
		'endereco': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null",
			field: 'endereco'
		},
		'numero': {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))',
			comment: "null",
			field: 'numero'
		},
		'complemento': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			field: 'complemento'
		},
		'bairro': {
			type: DataTypes.STRING(80),
			allowNull: true,
			comment: "null",
			field: 'bairro'
		},
		'cep': {
			type: DataTypes.STRING(10),
			allowNull: true,
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
		},
		'dataNascimento': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null",
			field: 'data_nascimento'
		},
		'imagemPerfil': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			field: 'imagem_perfil'
		},
		'cargo': {
			type: DataTypes.STRING(40),
			allowNull: true,
			comment: "null",
			field: 'cargo'
		},
		'idTipoEndereco': {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))',
			comment: "null",
			field: 'id_tipo_endereco'
		},
		'cgc': {
			type: DataTypes.STRING(18),
			allowNull: true,
			comment: "null",
			field: 'cgc'
		},
		'resetPasswordToken': {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "null",
			field: 'reset_password_token'
		},
		'passwordSalt': {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "null",
			field: 'password_salt'
		},
		'idSetor': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'cadastro_setores',
				key: 'id'
			},
			field: 'id_setor'
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
	idAcessoNiveisPermissao:number;
	idEmpresa:number;
	ddd:string;
	telefone:string;
	activationCode:string;
	ativo:boolean;
	endereco:string;
	numero:number;
	complemento:string;
	bairro:string;
	cep:string;
	idMunicipio:number;
	dataNascimento:Date;
	imagemPerfil:string;
	cargo:string;
	idTipoEndereco:number;
	cgc:string;
	resetPasswordToken:string;
	passwordSalt:string;
	idSetor:number;
}

export type acessoUsuariosModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acessoUsuariosModel;
};

export default acessoUsuariosModelInit;