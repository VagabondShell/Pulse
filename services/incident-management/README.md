# Incident Management Service

Manages the lifecycle of incidents and processes correlated alerts.

## API Documentation

Swagger UI available at:
http://localhost:8002/api/docs

## Environment Variables

| Variable                   | Required | Default | Description           |
| -------------------------- | -------- | ------- | --------------------- |
| PORT                       | No       | 8002    | Service port          |
| DATABASE_URL               | Yes      | -       | PostgreSQL connection |
| ON_CALL_SERVICE_URL        | Yes      | -       | On-call service URL   |

## Running Locally

```bash
npm install
npm run start:dev
```

## Running Tests

```bash
npm test
npm run test
```
