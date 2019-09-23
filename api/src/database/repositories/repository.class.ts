import { Sequelize } from 'sequelize/types';


/**
 * Essa classe abstrata define o contexto do banco de dados.
 *
 * @export
 * @abstract
 * @class Repository
 */
export default abstract class Repository {

    
    /**
     * Contexto do banco de dados.
     *
     * @protected
     * @type {Sequelize}
     * @memberof Repository
     */
    protected databaseContext: Sequelize;

    /**
     * Salva o contexto do banco de dados.
     * @param {Sequelize} sequelize
     * @memberof Repository
     */
    public constructor(sequelize: Sequelize) {
        this.databaseContext = sequelize;
    }
};
