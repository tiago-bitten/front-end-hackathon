import {keyAtualizarPermissoes, keyPermissoes, keyRefreshPermissoes} from '../../keys';
import {IPermissaoIterator} from '../../../api/services/perfilAcesso/interfaces';

let permissoesGlobal: IPermissaoIterator = JSON.parse(localStorage.getItem(keyPermissoes) || 'null') || {};

export const setPermissoes = (permissions: IPermissaoIterator) => {
    permissoesGlobal = permissions;
    localStorage.setItem(keyPermissoes, JSON.stringify(permissoesGlobal));
};

export const getPermissoes = () => permissoesGlobal;

window.addEventListener(keyAtualizarPermissoes, async (event: any) => {
    const {permissoes} = event.detail;
    setPermissoes(permissoes);
});
