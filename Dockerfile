FROM nginx:latest

COPY nginx/front.conf /etc/nginx/nginx.conf

EXPOSE 80 443