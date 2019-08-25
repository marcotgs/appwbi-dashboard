import { Sequelize } from "sequelize/types";


export default abstract class Repository {

    protected databaseContext: Sequelize;
    public constructor(sequelize: Sequelize) {
        this.databaseContext = sequelize;
    }
};
