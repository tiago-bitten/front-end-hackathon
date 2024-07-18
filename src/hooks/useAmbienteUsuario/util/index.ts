import {IAmbienteUsuario} from '../../../api/services/usuario/interfaces';
import {keyAmbienteUsuario} from '../../keys';


let ambienteUsuario: IAmbienteUsuario = JSON.parse(localStorage.getItem(keyAmbienteUsuario) || 'null') || undefined;

export const setAmbienteUsuario = (ambiente: IAmbienteUsuario) => {
    ambienteUsuario = ambiente;
    localStorage.setItem(keyAmbienteUsuario, JSON.stringify(ambienteUsuario));
};

export const getAmbienteUsuario = () => ambienteUsuario;

window.addEventListener('atualizarAmbienteUsuario:reactJs', async (event: any) => {
    const {ambienteUsuario: ambiente} = event.detail;
    setAmbienteUsuario(ambiente);
});
