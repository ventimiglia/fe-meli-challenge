# Proyecto Vite + React + TypeScript + SWC

Este proyecto está construido utilizando Vite, React, TypeScript y SWC. Vite es una herramienta de construcción que proporciona un entorno de desarrollo más rápido y eficiente. React es una biblioteca de JavaScript para construir interfaces de usuario. TypeScript es un superconjunto de JavaScript que añade tipos estáticos a la lengua. Finalmente, SWC es un compilador super rápido de JavaScript y TypeScript escrito en Rust.

## Prerrequisitos

Para poder ejecutar este proyecto en tu entorno local, necesitarás tener instalado:

- Node.js, versión 18 o superior. Puedes descargarlo desde [aquí](https://nodejs.org/es/download/).
- pnpm, un administrador de paquetes rápido y eficiente para Node.js. Puedes instalarlo con el siguiente comando en tu terminal:

    ```bash
    npm install -g pnpm
    ```

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```bash
pnpm install
```

## Ejecución

Para levantar el servidor, ejecuta el siguiente comando:

```bash
pnpm json-server --watch items.json --port 5000
```

Este comando inicia el servidor JSON en el puerto 5000 y observa los cambios en el archivo `items.json`.

Para iniciar la aplicación, ejecuta el siguiente comando:

```bash
pnpm dev
```

Este comando inicia el servidor de desarrollo de Vite en el puerto 3000 por defecto.

## Pruebas

Para ejecutar las pruebas del proyecto, utiliza el siguiente comando:

```bash
pnpm test
```

Este comando ejecuta todos los tests del proyecto utilizando Jest como marco de pruebas.