import { BaseService } from '../base';
import { IRequestBase } from '../base/interfaces';
import { IResponse } from '../../interfaces/index';
import { IFilter } from '../../interfaces/index';
import { ITotalizadorVenda } from './interfaces';
import { json } from 'react-router-dom';

class VendaService extends BaseService {
    protected path: string = '/venda';

    recuperarTotalizadorVenda(filters: Array<IFilter>) {
        return this.get({
            params: { filter: JSON.stringify(filters) },
            endPoint: 'recuperarTotalizadores',
        });
    }

    override async get(request: IRequestBase): Promise<IResponse> {
        return super.get(request);
    }
}

const vendaService = new VendaService();

export default vendaService;
