# 1. Usar una imagen base de Node.js oficial
FROM node:20-slim

# 2. Instalar dependencias del sistema para Puppeteer y Chromium
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils \
    --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 3. Crear el directorio de trabajo
WORKDIR /app

# 4. Copiar archivos de dependencias
COPY package*.json ./

# 5. Instalar dependencias de Node
# Esto también descargará Chromium si puppeteer lo tiene configurado
RUN npm install

# 6. Copiar el resto del código
COPY . .

# 7. Exponer el puerto que usa tu app (ajusta el 3000 si usas otro)
EXPOSE 3000

# 8. Comando para iniciar la aplicación
CMD ["node", "index.js"]
