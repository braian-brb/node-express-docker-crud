# Utiliza una imagen oficial de Node como imagen base
FROM node:20-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Construye el proyecto si es necesario, para producción
# RUN npm run build

# Expone el puerto 6655, el nuevo puerto para Vite
EXPOSE 6655

# Comando para iniciar el servidor de Vite, ajustado al nuevo puerto
CMD ["npm", "run", "dev", "--", "--host", "--port", "6655"]
