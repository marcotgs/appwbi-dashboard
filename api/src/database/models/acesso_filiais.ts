/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acesso_filiaisModelInit = (sequelize: Sequelize): acesso_filiaisModelStatic => {
	return sequelize.define("acesso_filiais", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'id_acesso_empresas': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null"
		},
		'codigo': {
			type: DataTypes.STRING(6),
			allowNull: false,
			comment: "null"
		},
		'descricao': {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: "null"
		}
	}, {
		tableName: 'acesso_filiais',
		timestamps: false
	}) as acesso_filiaisModelStatic;
};

interface acesso_filiaisModel extends Model {
	id:number;
	id_acesso_empresas:number;
	codigo:string;
	descricao:string;
}

type acesso_filiaisModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acesso_filiaisModel;
};

export default acesso_filiaisModelInit;