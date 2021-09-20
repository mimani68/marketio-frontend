FROM nginx:latest

COPY nginx/front.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443