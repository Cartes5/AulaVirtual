# AULA VIRTUAL

### PROYECTO:

Aula Virtual es donde un profesor registrado puede crear una clase, para la cual se genera una clave secreta. Un estudiante con acceso a esa clave puede inscribirse en una clase en particular. A partir de ahí, comienza una relación profesor-alumno.

El profesor puede tener varias clases, verificar la lista de cada una, asignar tareas y comunicarse en tiempo real a través de la sala de chat integrada en la clase.

El estudiante tiene acceso de lectura a las tareas y también puede participar en el chat.

### INSTRUCCIONES:

1. Descargar MongoDB Comunity Server e instalarlo en vuestro Sistema Operativo.

<----- Enlace de descarga-----> https://www.mongodb.com/try/download/community<----- Enlace de descarga----->

    - Cuando este descargado, hacemos click para instalarlo y eligimos las opciones:
        - Instalacion completa.
        - En Servicio de configuracion quitar check en "Install MongoDb as a Service"
        - Todo Siguiente y Finalizar
    -------------------------------------------REQUISITO IMPORTANTE-------------------------------------------
        - Crear carpeta en la raiz del disco duro cuyo nombre sea data.
    
    - Al abrir el programa le damos a conectar al localhost y en Databases creamos un Database con el nombre aulavirtual

    * Si queremos poner otro nombre debemos cambiar la url que esta en server/index.js hasta Databases.

2. Abrir terminal en la raiz del proyecto AULAVIRTUAL escribir `mongod`.
    Empezara a correr.

3. Abrir nuevo terminal poner `npm install` y luego `node server/app.js`
    Se conectara diciendo Server Spinning y Conectada a DB

4. Abrir nuevo terminal poner `cd client`
    Escribir `npm install` y luego `npm start`

### CREDENCIALES:

1. Registrarse como profesor y despues loguearse.

2. Abrir nueva ventana en el navegador http://localhost:3000

3. Registrarse como Alumno y despues loguearse.

- Tener abierta dos ventanas con logins distintos para comprobar que las tareas asignadas por el profesor y el chat estan en vivo.

### TECNOLOGIA:

1. FRONTEND:

   - React

2. BACKEND:

   - Node.js
   - Express

3. DATABASE:

   - MongoDB

4. APIs:

   - Socket.IO

5. EXTRAS:
   - mongoose
   - MongoDB Atlas
   - Axios
   - bcrypt
   - inspirational-quotes npm

### CARACTERISTITICAS:

    - Modo Claro/Oscuro
    - CRUD "Crear, Leer, Actualizar y Borrar"
    - Datos Persistentes
    - Charla en tiempo real
    - Registro con contraseña
