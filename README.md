# RANKINGIKAR8BP

Sitio vertical 1080x1920 publicado con GitHub Pages.

## Registro e inicio de sesión en la nube

El código está preparado para usar Supabase:

- Supabase Auth guarda las credenciales.
- La tabla `profiles` guarda usuario, ID del juego, nombre de cuenta y país.
- Supabase Storage guarda la captura de la cuenta.
- Las contraseñas no se guardan en `profiles` ni en GitHub.

## Activación

1. Crea un proyecto en Supabase.
2. En Authentication, usa Email/Password y desactiva la confirmación obligatoria por email, porque este sitio usa un correo interno generado a partir del nombre de usuario.
3. Abre SQL Editor y ejecuta todo el archivo `SUPABASE_SETUP.sql`.
4. Copia el Project URL y la Publishable key (o anon key).
5. Pégalos en `supabase-config.js`.
6. No uses ni publiques una `service_role` key.

Después de eso, Registro e Iniciar sesión funcionarán desde cualquier dispositivo.
