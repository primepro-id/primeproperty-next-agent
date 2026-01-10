FROM node:22-alpine as builder

ARG NEXT_PUBLIC_HOST_URL=$NEXT_PUBLIC_HOST_URL
ARG NEXT_PUBLIC_CLIENT_URL=$NEXT_PUBLIC_CLIENT_URL
ARG NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG SUPERTOKENS_CONNECTION_URI=$SUPERTOKENS_CONNECTION_URI
ARG SUPERTOKENS_API_KEY=$SUPERTOKENS_API_KEY
ARG SMTP_HOST=$SMTP_HOST
ARG SMTP_PORT=$SMTP_PORT
ARG SMTP_USER=$SMTP_USER
ARG SMTP_PASS=$SMTP_PASS
ARG SMTP_FROM=$SMTP_FROM
ARG NEXT_PUBLIC_S3_ENDPOINT=$NEXT_PUBLIC_S3_ENDPOINT
ARG S3_ACCESS_KEY=$S3_ACCESS_KEY
ARG S3_SECRET_KEY=$S3_SECRET_KEY
ARG OSM_URL=$OSM_URL
ARG NEXT_PUBLIC_SENTRY_DSN=$NEXT_PUBLIC_SENTRY_DSN
ARG SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

# Set the working directory inside the container
WORKDIR /app

COPY yarn.lock .
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM node:22-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/next.config.mjs .
COPY --from=builder /app/instrumentation-client.ts .
COPY --from=builder /app/sentry.edge.config.ts .
COPY --from=builder /app/sentry.server.config.ts .

EXPOSE 3000

ENTRYPOINT [ "node" , "server.js" ]
