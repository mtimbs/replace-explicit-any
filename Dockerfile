FROM alpine:3.19

RUN mkdir app
WORKDIR /app

CMD ["sh", "search_and_replace.sh"]
