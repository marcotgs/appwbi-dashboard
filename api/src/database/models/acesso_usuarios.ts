/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acesso_usuariosModelInit = (sequelize: Sequelize): acesso_usuariosModelStatic => {
	return sequelize.define("acesso_usuarios", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'nome': {
			type: DataTypes.STRING(30),
			allowNull: false,
			comment: "null"
		},
		'sobrenome': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null"
		},
		'email': {
			type: DataTypes.STRING(60),
			allowNull: false,
			comment: "null"
		},
		'password': {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "null"
		},
		'password_salt': {
			type: DataTypes.STRING,
			allowNull: false,
			comment: "null"
		},
		'id_acesso_empresas': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'acesso_empresas',
				key: 'id'
			}
		},
		'id_niveis_permissao': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			references: {
				model: 'acesso_niveis_permissao',
				key: 'id'
			}
		}
	}, {
		tableName: 'acesso_usuarios',
		timestamps: false
	}) as acesso_usuariosModelStatic;
};

interface acesso_usuariosModel extends Model {
	id:number;
	nome:string;
	sobrenome:string;
	email:string;
	password:string;
	password_salt:string;
	id_acesso_empresas:number;
	id_niveis_permissao:number;
}

type acesso_usuariosModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acesso_usuariosModel;
};

export default acesso_usuariosModelInit;