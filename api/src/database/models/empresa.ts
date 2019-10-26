/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const empresaModelInit = (sequelize: Sequelize): empresaModelStatic => {
	return sequelize.define("empresa", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'codEmpresa': {
			type: DataTypes.STRING(10),
			allowNull: false,
			comment: "null",
			field: 'cod_empresa'
		},
		'razao': {
			type: DataTypes.STRING(55),
			allowNull: false,
			comment: "null",
			field: 'razao'
		},
		'nome': {
			type: DataTypes.STRING(55),
			allowNull: false,
			comment: "null",
			field: 'nome'
		},
		'tipo': {
			type: DataTypes.CHAR(1),
			allowNull: true,
			comment: "null",
			field: 'tipo'
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
		'telefone': {
			type: DataTypes.STRING(20),
			allowNull: true,
			comment: "null",
			field: 'telefone'
		},
		'ddd': {
			type: DataTypes.STRING(2),
			allowNull: true,
			comment: "null",
			field: 'ddd'
		},
		'email': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "null",
			field: 'email'
		},
		'endereco': {
			type: DataTypes.STRING(100),
			allowNull: true,
			comment: "null",
			field: 'endereco'
		},
		'numero': {
			type: DataTypes.STRING(10),
			allowNull: true,
			comment: "null",
			field: 'numero'
		},
		'complemento': {
			type: DataTypes.STRING(10),
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
		'ativo': {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: '1',
			comment: "null",
			field: 'ativo'
		},
		'frete': {
			type: DataTypes.DECIMAL,
			allowNull: true,
			comment: "null",
			field: 'frete'
		},
		'imagem': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			field: 'imagem'
		},
		'pessoa': {
			type: DataTypes.CHAR(1),
			allowNull: true,
			comment: "null",
			field: 'pessoa'
		},
		'idSegmento': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'segmento',
				key: 'id'
			},
			field: 'id_segmento'
		},
		'horaAbert': {
			type: DataTypes.TIME,
			allowNull: true,
			comment: "null",
			field: 'hora_abert'
		},
		'horaFecha': {
			type: DataTypes.TIME,
			allowNull: true,
			comment: "null",
			field: 'hora_fecha'
		},
		'envioSistema': {
			type: DataTypes.CHAR(1),
			allowNull: true,
			comment: "null",
			field: 'envio_sistema'
		},
		'dataEnvios': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null",
			field: 'data_envios'
		},
		'idMunicipio': {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))',
			comment: "null",
			references: {
				model: 'municipio',
				key: 'id'
			},
			field: 'id_municipio'
		},
		'emailRh': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "null",
			field: 'email_rh'
		},
		'usaVendas': {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			comment: "null",
			field: 'usa_vendas'
		},
		'usaRh': {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			comment: "null",
			field: 'usa_rh'
		},
		'usaLogistica': {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			comment: "null",
			field: 'usa_logistica'
		},
		'usaSuprimentos': {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			comment: "null",
			field: 'usa_suprimentos'
		},
		'usaFinanceiro': {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			comment: "null",
			field: 'usa_financeiro'
		},
		'usaChathelp': {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: '0',
			comment: "null",
			field: 'usa_chathelp'
		},
		'idUsuarioChaveVd': {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: "null",
			references: {
				model: 'usuario',
				key: 'id'
			},
			field: 'id_usuario_chave_vd'
		},
		'imagemBanner': {
			type: DataTypes.STRING(255),
			allowNull: true,
			comment: "null",
			field: 'imagem_banner'
		},
		'slogan': {
			type: DataTypes.STRING(50),
			allowNull: true,
			comment: "null",
			field: 'slogan'
		},
		'vdTipoAcesso': {
			type: DataTypes.STRING(1),
			allowNull: true,
			comment: "null",
			field: 'vd_tipo_acesso'
		},
		'ultimoLoginRep': {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "null",
			field: 'ultimo_login_rep'
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
		'licencaAtiva': {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: '0',
			comment: "null",
			field: 'licenca_ativa'
		}
	}, {
		tableName: 'empresa',
		timestamps: false
	}) as empresaModelStatic;
};

export interface empresaModel extends Model {
	id:number;
	codEmpresa:string;
	razao:string;
	nome:string;
	tipo:string;
	codigo:string;
	loja:string;
	cgc:string;
	telefone:string;
	ddd:string;
	email:string;
	endereco:string;
	numero:string;
	complemento:string;
	bairro:string;
	cep:string;
	ativo:boolean;
	frete:number;
	imagem:string;
	pessoa:string;
	idSegmento:number;
	horaAbert:any;
	horaFecha:any;
	envioSistema:string;
	dataEnvios:Date;
	idMunicipio:number;
	emailRh:string;
	usaVendas:boolean;
	usaRh:boolean;
	usaLogistica:boolean;
	usaSuprimentos:boolean;
	usaFinanceiro:boolean;
	usaChathelp:boolean;
	idUsuarioChaveVd:number;
	imagemBanner:string;
	slogan:string;
	vdTipoAcesso:string;
	ultimoLoginRep:Date;
	idLocalizacao:number;
	licencaAtiva:boolean;
}

export type empresaModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):empresaModel;
};

export default empresaModelInit;