import * as _ from 'lodash';
import { keyEnums } from '../keys';
import { IEnumItens, IEnums } from '../../api/services/enum/interfaces';
import { IFitAutoCompleteOption } from '../../../components/autocompletes/base/interfaces';

const getStorage = () => JSON.parse(localStorage.getItem(keyEnums) || 'null');

let enums = getStorage();

export const getEnum = (enumName: string): Array<IEnumItens> | undefined => {
    if (!enums || !enums.Enums) return undefined; // Retorno padrão em caso de condições não atendidas
    const result = _.find(enums.Enums, (v, k: any) => k === enumName);
    return result as Array<IEnumItens> | undefined;
};

export const getEnumByIdentificadores = (enumName: string, identificadores: string[]): Array<IEnumItens> => {
    const enumsInstance = getEnum(enumName);
    return enumsInstance.filter(v => identificadores.includes(v.Identificador));
};

export const getTextEnum = (name: string, value: number) => {
    const enumInstance = _.find(getEnum(name), v => v.Valor === value);
    return enumInstance ? enumInstance.Texto : '';
};

export const getIdentificadorEnum = (name: string, value: number) => {
    const enumInstance = _.find(getEnum(name), v => v.Valor === value);
    return enumInstance ? enumInstance.Identificador : '';
};

export const getValueEnum = (identificador: string, text: string) => {
    const enumInstance = _.find(getEnum(identificador), v => v.Texto === text || v.Identificador === text);
    return enumInstance ? enumInstance.Valor : undefined;
};

export const enumIsEqual = (identificador: string, text: string, valor: number) =>
    getValueEnum(identificador, text) === valor;

export const setStorage = (newEnums: IEnums) => {
    localStorage.setItem(keyEnums, JSON.stringify(newEnums));
    enums = getStorage();
};

export const getOptionAutoCompleteEnum = (enumName: string, tipo: number) =>
    ({
        label: getTextEnum(enumName, tipo),
        value: tipo,
    } as IFitAutoCompleteOption);

window.addEventListener('atualizarEnums:reactJs', async () => {
    enums = getStorage();
});
