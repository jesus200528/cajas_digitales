
FROM php:8.3-apache

# Instalar la conexión de PHP con MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Copiar los archivos de la API
COPY api/ /var/www/html/api/

# Configurar Apache
RUN echo "DirectoryIndex cajas.php" > /etc/apache2/conf-available/api.conf \
    && a2enconf api
