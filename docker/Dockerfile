FROM       node:22-alpine
LABEL      author="ARDI"
RUN        mkdir -p /app 
RUN        mkdir -p /app/public
WORKDIR    /app

COPY       ../.next/standalone ./
COPY       ../public ./public
COPY       ../.next/static ./.next/static

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=5 CMD curl -k http://127.0.0.1:3000 || exit 1
ENTRYPOINT ["node" ,"server.js"]