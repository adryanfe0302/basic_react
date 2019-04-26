FROM nginx:stable-alpine

COPY ./build/ /usr/share/nginx/html/

COPY ./default-nginx.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html/

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
