
# Proyecto - Aplicación tienda virtual de libros con Express

## Ejecución de la aplicación

### Requerimiento: Node.js
Para comprobar que tienes Node.js instalado en tu sistema, puedes ejecutar el comando `node` en una línea de comandos.

### Requerimiento: npm (node package manager)
Para comprobar que tienes npm instalado en tu sistema, puedes ejecutar el comando `npm -version` en una línea de comandos.

### Requerimiento: MongoDB
Se debe tener en el sistema una versión local de MongoDB (tal como MongoDB Community Server). Debes crear una base de datos con una colección **books**, en la que almacenes documentos con una estructura como la que aparece en el archivo **/app/books.js**.

### Instalación de dependencias
Ejecuta:

    npm install
  En el directorio del proyecto; esto instalará todas las dependencias contenidas en el archivo 'package.json'.

## Probando el proyecto
En el directorio raíz ejecuta el siguiente comando: `node main.js`
Este comando levanta el servidor, y la salida debería ser algo así:

    Aplicación corriendo en el puerto 3000
    Conexión exitosa con la BD!
En el navegador, al visitar la dirección `http://127.0.0.1:3000`, el mensaje que debería aparecer es el siguiente: `Aplicación Concurrencia`.

### Probando endpoints
Por lo pronto, la aplicación cuenta con dos endpoints de tipo HTTP GET; el primero es '**/**', y el segundo '**/books**'. Probar el segundo endpoint devolverá los libros que se tienen registrados en la base de datos de MongoDB, en la colección **books**.