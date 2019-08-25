/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acessoNiveisPermissaoModelInit = (sequelize: Sequelize): acessoNiveisPermissaoModelStatic => {
	return sequelize.define("acessoNiveisPermissao", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			autoIncrement: true,
			field: 'id'
		},
		'descricao': {
			type: DataTypes.STRING(40),
			allowNull: false,
			comment: "null",
			field: 'descricao'
		},
		'nivel': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			field: 'nivel'
		},
		'controlaAlcada': {
			type: DataTypes.INTEGER,
			allowNull: false,
			comment: "null",
			field: 'controla_alcada'
		}
	}, {
		tableName: 'acesso_niveis_permissao',
		timestamps: false
	}) as acessoNiveisPermissaoModelStatic;
};

export interface acessoNiveisPermissaoModel extends Model {
	id:number;
	descricao:string;
	nivel:number;
	controlaAlcada:number;
}

export type acessoNiveisPermissaoModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acessoNiveisPermissaoModel;
};

export default acessoNiveisPermissaoModelInit;