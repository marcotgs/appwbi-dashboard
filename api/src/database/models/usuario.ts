/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const usuarioModelInit = (sequelize: Sequelize): usuarioModelStatic => {
	return sequelize.define("usuario", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'idAcesso': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'acesso',
				key: 'id'
			},
			field: 'id_acesso'
		},
		'password': {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: "null",
			field: 'password'
		},
		'email': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null",
			field: 'email'
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
		'complemento': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			field: 'complemento'
		},
		'dataEnvios': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null",
			field: 'data_envios'
		},
		'envioSistema': {
			type: DataTypes.CHAR(1),
			allowNull: true,
			comment: "null",
			field: 'envio_sistema'
		},
		'senhaRedefinida': {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: '0',
			comment: "null",
			field: 'senha_redefinida'
		},
		'numero': {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))',
			comment: "null",
			field: 'numero'
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
		'pedidoMinimo': {
			type: DataTypes.DECIMAL,
			allowNull: true,
			comment: "null",
			field: 'pedido_minimo'
		},
		'codigo': {
			type: DataTypes.STRING(10),
			allowNull: true,
			comment: "null",
			field: 'codigo'
		},
		'loja': {
			type: DataTypes.STRING(4),
			allowNull: true,
			comment: "null",
			field: 'loja'
		},
		'cgc': {
			type: DataTypes.STRING(18),
			allowNull: true,
			comment: "null",
			field: 'cgc'
		},
		'razao': {
			type: DataTypes.STRING(55),
			allowNull: true,
			comment: "null",
			field: 'razao'
		},
		'idCabecalhoTab': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'cabecalho_tab',
				key: 'id'
			},
			field: 'id_cabecalho_tab'
		},
		'nomefan': {
			type: DataTypes.STRING(55),
			allowNull: true,
			comment: "null",
			field: 'nomefan'
		},
		'representante': {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: '0',
			comment: "null",
			field: 'representante'
		},
		'idFormaPagto': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'forma_pagto',
				key: 'id'
			},
			field: 'id_forma_pagto'
		},
		'imagemPerfil': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			field: 'imagem_perfil'
		},
		'cargo': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "null",
			field: 'cargo'
		},
		'idade': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			field: 'idade'
		},
		'matricula': {
			type: DataTypes.STRING(7),
			allowNull: true,
			comment: "null",
			field: 'matricula'
		},
		'device': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null",
			field: 'device'
		},
		'idLocalizacao': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'localizacao',
				key: 'id'
			},
			field: 'id_localizacao'
		},
		'idCadastroSetores': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			field: 'id_cadastro_setores'
		}
	}, {
		tableName: 'usuario',
		timestamps: false
	}) as usuarioModelStatic;
};

export interface usuarioModel extends Model {
	id:number;
	idAcesso:number;
	password:string;
	email:string;
	ddd:string;
	telefone:string;
	activationCode:string;
	nome:string;
	sobrenome:string;
	ativo:boolean;
	endereco:string;
	bairro:string;
	cep:string;
	idEmpresa:number;
	complemento:string;
	dataEnvios:Date;
	envioSistema:string;
	senhaRedefinida:boolean;
	numero:number;
	idMunicipio:number;
	pedidoMinimo:number;
	codigo:string;
	loja:string;
	cgc:string;
	razao:string;
	idCabecalhoTab:number;
	nomefan:string;
	representante:boolean;
	idFormaPagto:number;
	imagemPerfil:string;
	cargo:string;
	idade:number;
	matricula:string;
	device:string;
	idLocalizacao:number;
	idCadastroSetores:number;
}

export type usuarioModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):usuarioModel;
};

export default usuarioModelInit;