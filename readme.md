## Instalação

### Clonar o projeto

```
$ git clone 
```

### Instalar dependências

```
$ cd ddr-desafio
$ yarn install
```

### Criar docker container MongoDB

```
$ docker run --name mongo -p 27017:27017 -d -t mongo
```

### Criar .env com seguinte conteúdo

```
MONGO_URL=mongodb://localhost:27017/ddr_service_development
```


### Iniciar Aplicação

```
$ yarn dev
```


### Rodar Testes

```
$ yarn test
```

### Rodar somente testes unitários

```
$ yarn test:unit
```

### Rodar somente testes funcionais

```
$ yarn test:functional
```


## Rotas

### Criar Tabulação

Comando: POST `tabulacoes`

Body Type: JSON

```
{
    "id": 1,
    "nomeCliente": "Jõao Santos",
    "protocolo": "C202004002",
    "dataAtendimento": "2020-04-12 12:43:12",
    "numeroBinado": "11922222222",
    "numeroAcesso": "11933333333"
  },
```
**Retorno**: Um JSON com as informações da tabulação cadastrada.

### Criar Gravação

Comando: POST `gravacoes`

Body Type: JSON

```
 {
    "id": 1,
    "telefone": "11911111111",
    "ramal": "203",
    "dataGravacao": "2020-04-12 12:34:53"
  },
```

**Retorno**: Um JSON com as informações da gravação cadastrada.


### Listar Matchings

Comando: GET `matchings`

**Retorno**: Um JSON com um array listando os matchings existentes.

## Stack:
- AdonisJS
- Mongoose
- Japa
- Supertest
- node-cron
