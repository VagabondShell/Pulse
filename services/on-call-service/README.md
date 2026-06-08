# On-Call Service

Manages on-call rotations, schedules, and current on-call personnel for services.

## API Documentation

Swagger UI available at:
http://localhost:8003/api/docs

## Environment Variables

| Variable     | Required | Default | Description           |
| ------------ | -------- | ------- | --------------------- |
| PORT         | No       | 8003    | Service port          |
| DATABASE_URL | Yes      | -       | PostgreSQL connection |

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
