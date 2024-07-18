import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {TextField, Container, Typography, Box} from '@mui/material';
import viteLogo from '../../../public/vite.svg';
import reactLogo from '../../assets/react.svg';
import {useRef, useState} from 'react';
import perfilAcessoService from '../../api/services/perfilAcesso';
import {showErrorNotification, showSuccessNotification} from '../../utils/notification';
import {setPermissoes} from '../../hooks/usePermission/util';
import usuarioService from '../../api/services/usuario';
import {setAmbienteUsuario} from '../../hooks/useAmbienteUsuario/util';
import {setStorage} from '../../enums/utils';
import enumService from '../../api/services/enum';
import {setToken, setRefreshToken} from '../../api';
import {token} from '../../api/services/auth';
import _ from 'lodash';
import {useNavigate} from 'react-router-dom';

const PageLogin = () => {

    const navigate = useNavigate();

    const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
    const [email, setEmail] = useState(localStorage.getItem('email') || 'usuariohackaton@nextfit.com.br');
    const [password, setPassword] = useState(localStorage.getItem('password') || '123456a');
    const [codigoTenant, setCodigoTenant] = useState(localStorage.getItem('codigoTenant') || '7');
    const [codigoUnidade, setCodigoUnidade] = useState(localStorage.getItem('codigoUnidade') || '7');
    const codigoUsuario = useRef();

    const recuperarPermissoes = async () => {
        try {
            const {Content} = await perfilAcessoService.recuperarPermissoesUsuarioLogado();
            const permissoes: any = _.map(Content, (currentValue: any) => {
                const permissao: any = {};
                permissao[currentValue.Permissao] = true;
                permissao.isPermitido = currentValue.Permitido;
                return permissao;
            });
            setPermissoes(permissoes);
            showSuccessNotification('Login realizado com sucesso');
            navigate('/bem-vindo');
            setLoadingLogin(false);
        } catch (error) {
            showErrorNotification('Erro ao recuperar permissões');
        }
    };

    const recuperarAmbiente = async () => {
        try {
            const {Content} = await usuarioService.recuperarAmbienteUsuario(codigoUsuario.current);
            setAmbienteUsuario(Content);
            await recuperarPermissoes();
        } catch (error) {
            showErrorNotification('Erro ao recuperar ambiente');
        }
    };

    const atualizarEnums = async () => {
        try {
            const {Content} = await enumService.recuperarTodos();
            const newEnums: any = {Enums: {}};
            _.forEach(Content.Enums, (r: any) => {
                if (!r.Nome) return;
                newEnums.Enums[r.Nome] = r.Itens;
            });
            setStorage(newEnums);
            await recuperarAmbiente();
        } catch (error) {
            showErrorNotification('Erro ao atualizar enums');
        }
    };

    const recuperarUsuario = async () => {
        try {
            const {Content} = await usuarioService.recuperarUsuarioLogado();
            codigoUsuario.current = Content.Id;
            await atualizarEnums();
        } catch (error) {
            showErrorNotification('Erro ao recuperar usuario');
        }
    };

    const onClickLogin = async () => {
        if (!email || !password || !codigoTenant || !codigoUnidade) {
            showErrorNotification('Preencha todos os campos');
            return;
        }

        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('codigoTenant', codigoTenant.toString());
        localStorage.setItem('codigoUnidade', codigoTenant.toString());

        try {
            setLoadingLogin(true);
            const retorno = await token({
                username: email,
                password: password,
                codigoTenant: Number(codigoTenant),
                codigoUnidade: Number(codigoUnidade),
            });
            const customEvent = new CustomEvent('atualizarUnidadeLogada', {
                detail: {codigoUltimaUnidade: codigoUnidade},
            });
            window.dispatchEvent(customEvent);
            setToken(retorno.access_token);
            setRefreshToken(retorno.refresh_token);
            await recuperarUsuario();
        } catch (error: any) {
            showErrorNotification(`${error.response.data.error_description}`);
            setLoadingLogin(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://react.dev" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                <Typography component="h1" variant="h5">
                    Login - Front-end Hackaton
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="email"
                        autoComplete="off"
                        autoFocus
                    />
                    <TextField
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="off"
                    />
                    <TextField
                        value={codigoTenant}
                        onChange={(event) => setCodigoTenant(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="codigoTenant"
                        label="Código do tenant"
                        type="number"
                        id="codigoTenant"
                        autoComplete="off"
                    />
                    <TextField
                        value={codigoUnidade}
                        onChange={(event) => setCodigoUnidade(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="codigoUnidade"
                        label="Código da unidade"
                        type="number"
                        id="codigoUnidade"
                        autoComplete="off"
                    />
                    <LoadingButton
                        loading={loadingLogin}
                        onClick={onClickLogin}
                        color='secondary'
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Entrar
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    )
        ;
}

export default PageLogin;