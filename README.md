# Spotify Clone (Full-Stack Web App)

Este es un clon simplificado de Spotify, diseñado para ser ejecutado fácilmente en cualquier entorno local con configuraciones mínimas. Está dividido en un backend con Node.js/Express y un frontend con React/Vite.

## 🚀 Arquitectura y Tecnologías
La base del proyecto está separada dentro de este monorepo (repositorio único con múltiples paquetes):

- **`/backend`**:
  - **Node.js + Express**: Framework del servidor web y manejo de API REST.
  - **SQLite + Sequelize**: Base de datos basada en archivos. No requiere instalar ningún motor extra. El ORM de Sequelize gestiona los esquemas de bases de datos.
  - **Autenticación (JWT)**: JSON Web Tokens para manejo de sesión.
  - **Multer**: Librería que intercepta la subida de archivos (imágenes de covers y archivos `.mp3` de audio).
- **`/frontend`**:
  - **React + Vite**: Para vistas eficientes e importaciones rápidas.
  - **Context API (React)**: Estado global manejando Sesiones de Usuario (`AuthContext`) y Reproductor de Audio global ininterrumpido (`PlayerContext`).
  - **React Router**: Para navegación por el sitio.

## 📁 Estructura del Proyecto

```text
├── package.json         # Inicializador concurrente de todo el ecosistema
├── backend/
│   ├── src/
│   │   ├── config/      # Conexión a DB
│   │   ├── controllers/ # Lógica por cada endpoint
│   │   ├── middlewares/ # Subida de archivos y validación JWT
│   │   ├── models/      # Esquemas de la DB
│   │   ├── routes/      # URL endpoints de la API (Auth, Songs, Playlists)
│   │   └── app.js       # Core de la app Express
│   ├── sync.js          # Script que levanta SQLite e inyecta usuario Admin por defecto
│   └── index.js         # Entrada del servidor (puerto 5000)
└── frontend/
    ├── src/
    │   ├── components/  # Componentes reutilizables (Player, Navbar, SongCard...)
    │   ├── context/     # Manejadores de Estado (Auth, AudioPlayer)
    │   ├── pages/       # Pantallas completas
    │   └── index.css    # Diseño oscuro (basado en la interfaz de Spotify)
    └── vite.config.js   # Configurador principal (puerto 5173 e inyector de proxy al backend)
```

## 🛠️ Instalación y Puesta en Marcha

Clona este repositorio o descarga la carpeta, y abre una terminal posicionándote en la raíz del proyecto.

**1. Instalar las Dependencias**  
El siguiente comando instalará todas las librerías necesarias ejecutando un script concurrente tanto en la carpeta `backend/` como `frontend/`:
```bash
npm run install:all
```

**2. Iniciar el Entorno de Desarrollo**  
Para arrancar el frontend, el backend y hacer la comprobación/sincronización de base de datos a la vez, ejecuta:
```bash
npm run dev
```

El servidor local del backend se desplegará en `http://localhost:5000` y el cliente frontend se presentará automáticamente en `http://localhost:5173`. 
> *(Nota: El primer inicio creará un archivo nuevo `database.sqlite` dentro de `backend/` para servir de Base de Datos relacional, además de las tablas pertinentes)*.

## 🧑‍💻 Usuarios de Prueba
Al correr el inicio global, el backend inyectará unas credenciales **Administrador** predeterminadas para que no tengas que trastear con el registro local o la base de datos para habilitar permisos de subida:

- **Rol**: Admin
- **Correo**: `admin@admin.com`
- **Contraseña**: `admin123`

## 🎧 Uso Funcional:
1. Al acceder irás como *Invitado*. Loguéate primero en la esquina superior derecha.
2. Ingresa con las credenciales de Admin enumeradas arriba.
3. Se revelará un botón con ícono verde de **"Admin"**. Da click allí.
4. El panel de administrador te permitirá subir y guardar archivos nativos (carátula `image/*` y canción de tipo Audio/mp3).
5. Podrás reproducir continuamente las rolas, probar la persistencia del reproductor bajero entre navegaciones de ruta y manipular el progreso de la música sin interrupciones.

## ⚠️ Puntos a tomar en cuenta si deseas aportar
- Si modificas el Backend, necesitas reiniciar el comando usando `CTRL + C` en tu terminal seguida de un nuevo `npm run dev` ya que por simplificación no se utilizó Nodemon. Si es un cambio en el Frontend, cuenta con `Fast-Reload` y se aplicará mágicamente.
- Asegúrate de no versionar ni la carpeta `/uploads` ni el `database.sqlite` (estos archivos ya están en el `.gitignore`).
# Spotify
