# Alert Ingestion Service

Receives alerts from external monitoring systems,
validates them, and correlates them into incidents.

## API Documentation

Swagger UI available at:
http://localhost:8001/api/docs

## Environment Variables

| Variable                   | Required | Default | Description           |
| -------------------------- | -------- | ------- | --------------------- |
| PORT                       | No       | 8001    | Service port          |
| DATABASE_URL               | Yes      | -       | PostgreSQL connection |
| INCIDENT_MANAGEMENT_URL    | Yes      | -       | Incident service URL  |
| CORRELATION_WINDOW_MINUTES | No       | 5       | Alert grouping window |

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
