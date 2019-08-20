/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acesso_niveis_permissaoModelInit = (sequelize: Sequelize): acesso_niveis_permissaoModelStatic => {
	return sequelize.define("acesso_niveis_permissao", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true
		},
		'descricao': {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: "null"
		},
		'nivel': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null"
		},
		'controla_alcada': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null"
		}
	}, {
		tableName: 'acesso_niveis_permissao',
		timestamps: false
	}) as acesso_niveis_permissaoModelStatic;
};

interface acesso_niveis_permissaoModel extends Model {
	id:number;
	descricao:string;
	nivel:number;
	controla_alcada:number;
}

type acesso_niveis_permissaoModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acesso_niveis_permissaoModel;
};

export default acesso_niveis_permissaoModelInit;