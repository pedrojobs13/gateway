# Gateway

Microservico de gateway com proxy e autenticação.

## Scripts

- `npm start`: inicia o servidor
- `npm test`: roda os testes com Jest
- `npm run lint`: valida o código com ESLint

## Configuracao

Defina as variaveis de ambiente:

- `JWT_SECRET`
- `AUTH_SERVICE`
- `USER_SERVICE`
- `AGENDAMENTO_SERVICE`
- `NOTIFICATION_SERVICE`

## Estrutura

- `src/app.js`: configura o app Express
- `src/middleware/authMiddleware.js`: autenticação via JWT
- `src/routes/proxyRoutes.js`: rotas de proxy
- `__tests__/`: testes automatizados

