#!/bin/bash

docker exec xs_bot_postgres pg_dumpall --schema-only -U postgres --file=/dumps/dump-`date +%Y-%m-%d"-"%H-%M-schema`.sql
docker exec xs_bot_postgres pg_dumpall --data-only -U postgres --file=/dumps/dump-`date +%Y-%m-%d"-"%H-%M-data`.sql
