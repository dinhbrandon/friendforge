FROM postgres:14.2-bullseye
COPY create-multiple-databases.sh /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*