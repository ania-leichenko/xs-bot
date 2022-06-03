# xs-bot

## HOW TO START:

1. npm run install:all
2. cd ./shared && npm run build-and-update
3. Run docker, cd .docker/xs_bot && docker-compose -f docker-compose.services.yml up --build
4. Create database, cd backend && npm run migrate:dev
5. Run backend: cd ./backend && yarn start:dev
6. Run frontend: cd ./frontend && npm run start
7. Run bot: cd ./bot && yarn start:dev

## HOW TO RESTORE DB:

cat dump-2022-06-03-10-01-schema.sql | docker exec xs_bot_postgres psql -U postgres
cat dump-2022-06-03-10-01-data.sql | docker exec xs_bot_postgres psql -U postgres
