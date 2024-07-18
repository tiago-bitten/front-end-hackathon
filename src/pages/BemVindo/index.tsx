import * as React from 'react';
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../../public/vite.svg'
import {getEnum} from '../../enums/utils';
import usePermission from '../../hooks/usePermission';
import useAmbienteUsuario from '../../hooks/useAmbienteUsuario';

const PageBemVindo = () => {

    const {recuperarUsuarioLogado} = useAmbienteUsuario()

    const tiposDeTreino = getEnum('EnumTipoTreino');

    const {possuiPermissao} = usePermission();

    const temPermissaoVisualizarCadastroDeCliente = possuiPermissao('ClientesCadastrar');

    const ambienteUsuario = recuperarUsuarioLogado();

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            Tipos de treinos : {JSON.stringify(tiposDeTreino.map(tipo => tipo.Identificador))}
            <br/>
            Meu usuário possui permissão para cadastrar
            clientes? {temPermissaoVisualizarCadastroDeCliente ? 'Sim' : 'Não'}
            <br/>
            Ambiente do usuário: {JSON.stringify(ambienteUsuario)}
        </>
    )
}

export default PageBemVindo;