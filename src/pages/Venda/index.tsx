import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, CircularProgress, TextField, MenuItem, Grid, Card, CardContent } from '@mui/material';
import { showErrorNotification, showSuccessNotification } from '../../utils/notification';
import vendaService from '../../api/services/venda/index';
import { ITotalizadorVenda } from '../../api/services/venda/interfaces/index';
import { IFilter } from '../../api/interfaces';

const PageVendas = () => {
    const [loading, setLoading] = useState(false);
    const [vendas, setVendas] = useState<ITotalizadorVenda>(null);
    const [status, setStatus] = useState<number[]>([1, 3, 4, 5]);
    const [startDate, setStartDate] = useState<string>("2024-07-02T02:41:11.986Z");
    const [endDate, setEndDate] = useState<string>("2024-08-01T02:41:59.999Z");

    const recuperarVendas = async () => {
        setLoading(true);
        try {
            const filters: IFilter[] = [
                {
                    property: "Status",
                    operator: "in",
                    value: status,
                    and: true
                },
                {
                    property: "Data",
                    operator: "greaterOrEqual",
                    value: startDate,
                    and: true
                },
                {
                    property: "Data",
                    operator: "lessOrEqual",
                    value: endDate,
                    and: true
                }
            ];

            const response = await vendaService.recuperarTotalizadorVenda(filters);
            setVendas(response.Content);
            showSuccessNotification('Vendas carregadas com sucesso');
        } catch (error) {
            showErrorNotification('Erro ao carregar vendas');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {
        recuperarVendas();
    }, []);

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    Totalizadores de Vendas
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1, mb: 3, width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Data Inicial"
                                type="datetime-local"
                                value={startDate}
                                onChange={handleStartDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Data Final"
                                type="datetime-local"
                                value={endDate}
                                onChange={handleEndDateChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        select
                        label="Status"
                        value={status}
                        onChange={handleStatusChange}
                        fullWidth
                        SelectProps={{
                            multiple: true
                        }}
                        margin="normal"
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value={1}>Concluída</MenuItem>
                        <MenuItem value={3}>Cancelada</MenuItem>
                        <MenuItem value={4}>Pendente</MenuItem>
                        <MenuItem value={5}>Agendada</MenuItem>
                        <MenuItem value={6}>Erro</MenuItem>
                        <MenuItem value={7}>Processando</MenuItem>
                    </TextField>
                    <Button
                        onClick={recuperarVendas}
                        color='primary'
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Recarregar Vendas'}
                    </Button>
                </Box>
                {vendas && (
                    <Box sx={{ mt: 3, width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant="h6">Quantidade de Vendas</Typography>
                                        <Typography variant="h4">{vendas.QuantVendas}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Typography variant="h6">Valor Total</Typography>
                                        <Typography variant="h4">{vendas.ValorTotal}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default PageVendas;
