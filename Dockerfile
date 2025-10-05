FROM php:8.2-apache

WORKDIR /var/www/html

# Habilitar o módulo rewrite do Apache
RUN a2enmod rewrite

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html/

# Expor a porta 80
EXPOSE 80