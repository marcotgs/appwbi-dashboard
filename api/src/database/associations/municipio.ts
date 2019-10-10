import { municipioModelStatic } from '../models/municipio';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addMunicipioAssociation = (models: any): void => {
    (models.municipio as municipioModelStatic).belongsTo(
        models.estado, {
            foreignKey: 'id_estado',
        }
    );
};
export default addMunicipioAssociation;