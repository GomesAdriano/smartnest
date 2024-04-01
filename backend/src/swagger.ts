import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
    info: {
        title: 'API SmartNest',
        description: 'Documentação da API do projeto SmartNest.',
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    definitions: {
        // Resource Autenticação
        CadastroUsuarioDto: {
            nome: 'Maria Eduarda',
            email: 'maria@icomp.ufam.edu.br',
            senha: '123456',
        },
        LoginDto: {
            email: 'maria@icomp.ufam.edu.br',
            senha: '12345678',
        },
        // Resource Usuário
        UsuarioDto: {
            id: 'bf95275d-b49e-4bf7-adb1-7d2a8908b86c',
            nome: 'Liz',
            email: 'Maria51@sapo.pt',
            createdAt: '2024-01-24T00:07:47.517Z',
            updatedAt: '2024-01-24T00:07:47.517Z',
        },
        ListagemUsuarioDto: [
            {
                $ref: '#/definitions/UsuarioDto',
            },
        ],
        // Resource Categoria de Dispositivos
        CategoriaDto: {
            id: 1,
            categoria: 'Iluminação',
        },
        ListagemCategoriaDto: [
            {
                $ref: '#/definitions/CategoriaDto',
            },
        ],
        // Resource Dispositivo Predefinido
        DispositivoDto: {
            id: 1,
            dispositivo: 'Lâmpada',
            categoriaDispositivo: {
                $ref: '#/definitions/CategoriaDto',
            },
        },
        ListagemDispositivoDto: [
            {
                $ref: '#/definitions/DispositivoDto',
            },
        ],
        ListagemDispositivoCategoriaDto: [
            {
                $ref: '#/definitions/DispositivoDto',
            },
        ],
        // Resource Tipo de Cômodo
        TipoComodoDto: {
            id: 1,
            tipo: 'Sala',
        },
        ListagemTipoComodoDto: [
            {
                $ref: '#/definitions/TipoComodoDto',
            },
        ],
        // Resource Cômodo
        ComodoDto: {
            id: '1a680fbc-f18a-4838-871b-19944fa144b0',
            descricao: 'Sala de Estar',
            tipoComodo: {
                $ref: '#/definitions/TipoComodoDto',
            },
            unidadeDispositivo: [
                {
                    id: '716b99ff-2fe9-47ef-8658-53e5abb7d9fb',
                    descricao: 'earum reiciendis magni',
                    status: false,
                    createdAt: '2024-02-19T22:35:23.320Z',
                    updatedAt: '2024-02-21T03:30:36.708Z',
                    dispositivo: {
                        $ref: '#/definitions/DispositivoDto',
                    },
                },
            ],
            rotina: [
                {
                    id: '43452524-5c44-4f33-a64d-4afc7ae29550',
                    descricao: 'Cafezinho da Manha',
                    habilitado: true,
                    diasDaSemana: {
                        segunda: false,
                        terca: true,
                        quarta: false,
                        quinta: false,
                        sexta: false,
                        sabado: false,
                        domingo: false,
                    },
                    horario: '10:00',
                    automatizacao: [
                        {
                            $ref: '#/definitions/AutomatizacaoDto',
                        },
                    ],
                },
            ],
        },
        ListagemTodosComodosDevDto: [
            {
                id: '1a680fbc-f18a-4838-871b-19944fa144b0',
                descricao: 'Sala de Estar',
                tipoComodo: {
                    $ref: '#/definitions/TipoComodoDto',
                },
                usuario: {
                    $ref: '#/definitions/UsuarioDto',
                },
                unidadeDispositivo: [
                    {
                        id: '716b99ff-2fe9-47ef-8658-53e5abb7d9fb',
                        descricao: 'earum reiciendis magni',
                        status: false,
                        createdAt: '2024-02-19T22:35:23.320Z',
                        updatedAt: '2024-02-21T03:30:36.708Z',
                        dispositivo: {
                            $ref: '#/definitions/DispositivoDto',
                        },
                    },
                ],
                rotina: [
                    {
                        id: '43452524-5c44-4f33-a64d-4afc7ae29550',
                        descricao: 'Cafezinho da Manha',
                        habilitado: true,
                        diasDaSemana: {
                            segunda: false,
                            terca: true,
                            quarta: false,
                            quinta: false,
                            sexta: false,
                            sabado: false,
                            domingo: false,
                        },
                        horario: '10:00',
                        automatizacao: [
                            {
                                $ref: '#/definitions/AutomatizacaoDto',
                            },
                        ],
                    },
                ],
            },
        ],
        ListagemTodosComodosDto: [
            {
                $ref: '#/definitions/ComodoDto',
            },
        ],
        CadastroComodoDto: {
            descricao: 'Sala de Estar',
            tipoComodoId: 1,
        },
        EditarComodoDto: {
            $ref: '#/definitions/CadastroComodoDto',
        },
        AddRmvUnidadeDispositivoComodoDto: {
            acao: 'add | rmv',
            dispId: '08cd1e12-c38b-4d89-943a-5f3c781b660b',
        },
        // Resource Unidade de Dispositivo
        UnidadeDispositivoDto: {
            id: '08cd1e12-c38b-4d89-943a-5f3c781b660b',
            descricao: 'Lâmpada do Quarto',
            status: false,
            dispositivo: {
                $ref: '#/definitions/DispositivoDto',
            },
            comodo: {
                id: '1a680fbc-f18a-4838-871b-19944fa144b0',
                descricao: 'Sala de Estar',
                tipoComodo: {
                    $ref: '#/definitions/TipoComodoDto',
                },
            },
            automatizacao: [
                {
                    id: '559dcc23-1a37-4b09-9f5a-68ff3840cf86',
                    status: false,
                    rotina: {
                        id: '43452524-5c44-4f33-a64d-4afc7ae29550',
                        descricao: 'expedita accusantium itaque',
                        habilitado: true,
                        diasDaSemana: {
                            segunda: false,
                            terca: true,
                            quarta: false,
                            quinta: false,
                            sexta: false,
                            sabado: false,
                            domingo: false,
                        },
                        horario: '10:00',
                    },
                },
            ],
        },
        ListagemTodasUnidadeDispositivoDevDto: [
            {
                id: '08cd1e12-c38b-4d89-943a-5f3c781b660b',
                descricao: 'Lâmpada do Quarto',
                status: false,
                createdAt: '2024-01-28T02:48:59.318Z',
                updatedAt: '2024-01-28T02:48:59.318Z',
                usuario: {
                    $ref: '#/definitions/UsuarioDto',
                },
                dispositivo: {
                    $ref: '#/definitions/DispositivoDto',
                },
                comodo: {
                    id: '1a680fbc-f18a-4838-871b-19944fa144b0',
                    descricao: 'Sala de Estar',
                    tipoComodo: {
                        $ref: '#/definitions/TipoComodoDto',
                    },
                },
                automatizacao: [
                    {
                        id: '559dcc23-1a37-4b09-9f5a-68ff3840cf86',
                        status: false,
                        rotina: {
                            id: '43452524-5c44-4f33-a64d-4afc7ae29550',
                            descricao: 'expedita accusantium itaque',
                            habilitado: true,
                            diasDaSemana: {
                                segunda: false,
                                terca: true,
                                quarta: false,
                                quinta: false,
                                sexta: false,
                                sabado: false,
                                domingo: false,
                            },
                            horario: '10:00',
                        },
                    },
                ],
            },
        ],
        ListagemTodasUnidadeDispositivoDto: [
            {
                $ref: '#/definitions/UnidadeDispositivoDto',
            },
        ],
        ListagemTodasUnidadeDispositivoSemComodoDto: [
            {
                $ref: '#/definitions/UnidadeDispositivoDto',
            },
        ],
        CadastroUnidadeDispositivoDto: {
            descricao: 'Lampada da Sala',
            dispositivoId: 3,
        },
        EditarUnidadeDispositivoDto: {
            $ref: '#/definitions/CadastroUnidadeDispositivoDto',
        },
        EditarStatusUnidadeDispositivoDto: {
            status: false,
        },
        // Resource Rotina
        RotinaDto: {
            id: '43452524-5c44-4f33-a64d-4afc7ae29550',
            descricao: 'expedita accusantium itaque',
            habilitado: true,
            diasDaSemana: {
                segunda: false,
                terca: true,
                quarta: false,
                quinta: false,
                sexta: false,
                sabado: false,
                domingo: false,
            },
            horario: '10:00',
            comodo: {
                id: '1a680fbc-f18a-4838-871b-19944fa144b0',
                descricao: 'Sala de Estar',
                tipoComodo: {
                    $ref: '#/definitions/TipoComodoDto',
                },
            },
            automatizacao: [
                {
                    $ref: '#/definitions/AutomatizacaoDto',
                },
            ],
        },
        ListagemTodasRotinasDevDto: [
            {
                id: '43452524-5c44-4f33-a64d-4afc7ae29550',
                descricao: 'expedita accusantium itaque',
                habilitado: true,
                diasDaSemana: {
                    segunda: false,
                    terca: true,
                    quarta: false,
                    quinta: false,
                    sexta: false,
                    sabado: false,
                    domingo: false,
                },
                horario: '10:00',
                comodo: {
                    id: '1a680fbc-f18a-4838-871b-19944fa144b0',
                    descricao: 'Sala de Estar',
                    tipoComodo: {
                        $ref: '#/definitions/TipoComodoDto',
                    },
                    usuario: {
                        $ref: '#/definitions/UsuarioDto',
                    },
                },
                automatizacao: [
                    {
                        $ref: '#/definitions/AutomatizacaoDto',
                    },
                ],
            },
        ],
        ListagemTodasRotinasComodoDto: [
            {
                $ref: '#/definitions/RotinaDto',
            },
        ],
        CadastroRotinaDto: {
            descricao: 'Rotina Café da Manhã',
            comodoId: '4f0584e9-f5ac-4c17-bc12-540ee42f6878',
        },
        HabilitarRotinaDto: {
            habilitado: false,
        },
        EditarDescricaoRotinaDto: {
            descricao: 'Café da Manhã',
        },
        EditarHorarioRotinaDto: {
            horario: '10:00 | null',
        },
        EditarDiaSemanaRotinaDto: {
            segunda: true,
            terca: false,
            quarta: false,
            quinta: false,
            sexta: false,
            abado: false,
            domingo: false,
        },
        ExecutaRotinaDto: [
            {
                unidadeDispositivoId: 'f6a81893-3b7d-4bce-8b87-77b263f83656',
                status: true,
            },
        ],
        //Resource Automatização
        ListagemTodasAutomatizacoesDto: [
            {
                $ref: '#/definitions/AutomatizacaoDto',
            },
        ],
        AutomatizacaoDto: {
            id: '559dcc23-1a37-4b09-9f5a-68ff3840cf86',
            status: false,
            unidadeDispositivo: {
                id: 'f6a81893-3b7d-4bce-8b87-77b263f83656',
                descricao: 'assumenda sunt autem',
                status: false,
                createdAt: '2024-02-23T07:52:44.462Z',
                updatedAt: '2024-02-23T15:00:45.475Z',
                dispositivo: {
                    $ref: '#/definitions/DispositivoDto',
                },
            },
        },
        CadastroAutomatizacaoDto: {
            rotinaId: '43452524-5c44-4f33-a64d-4afc7ae29550',
            unidadeDispositivoId: '716b99ff-2fe9-47ef-8658-53e5abb7d9fb',
            status: true,
        },
        EditarAutomatizacaoDto: {
            status: true,
        },
    },
};

const outputFile = './swagger-output.json';
const routes = ['./src/router/index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
