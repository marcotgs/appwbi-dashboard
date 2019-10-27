/* eslint-disable */
import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";

const acessoNiveisPermissaoModelInit = (sequelize: Sequelize): acessoNiveisPermissaoModelStatic => {
	return sequelize.define("acessoNiveisPermissao", {
		'id': {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			comment: "null",
			field: 'id'
		},
		'descricao': {
			type: DataTypes.STRING(50),
			allowNull: false,
			comment: "null",
			field: 'descricao'
		},
		'controlaAlcada': {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))',
			comment: "null",
			field: 'controla_alcada'
		},
		'nivel': {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))',
			comment: "null",
			field: 'nivel'
		}
	}, {
		tableName: 'acesso_niveis_permissao',
		timestamps: false
	}) as acessoNiveisPermissaoModelStatic;
};

export interface acessoNiveisPermissaoModel extends Model {
	id:number;
	descricao:string;
	controlaAlcada:number;
	nivel:number;
}

export type acessoNiveisPermissaoModelStatic = typeof Model & {
	new(values?: object, options?: BuildOptions):acessoNiveisPermissaoModel;
};

export default acessoNiveisPermissaoModelInit;