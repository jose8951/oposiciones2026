# Oposicion2026

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# ##########################################################################################################################################

# 🎯 Proyecto Oposiciones TAI 2026

Aplicación web interactiva desarrollada con **Angular** orientada a la preparación y el autoestudio de las oposiciones para el cuerpo de **Técnicos Auxiliares de Informática (TAI)** de la Administración General del Estado.

---

## 🏗️ Arquitectura Técnica y Patrones de Diseño

El proyecto está diseñado bajo los estándares modernos de Angular, aplicando modularidad, tipado estricto y desacoplamiento de código mediante los siguientes pilares:

### 1. Modelos de Datos (`Models`)
Para garantizar la integridad del flujo de datos, se utiliza un modelo fuertemente tipado en `src/app/models/pregunta.model.ts`. Este define la estructura exacta de las preguntas del examen (enunciado, opciones de respuesta, solución correcta, etc.), evitando errores en tiempo de compilación y facilitando el mantenimiento.

### 2. Componentes Modulares y Reutilizables (`Nav Component`)
La barra de navegación (`src/app/nav/`) se ha diseñado como un componente independiente y reutilizable. Esto permite que el menú global se mantenga consistente a lo largo de toda la aplicación y se renderice de forma unificada en cualquier vista o enlace sin duplicar código HTML o lógica de control.

### 3. Servicios e Inyección de Dependencias (`Services`)
La lógica de negocio y la adquisición de datos están delegadas a una capa de servicios (`src/app/services/`). El servicio se encarga de realizar las peticiones HTTP para leer los ficheros `.json` locales correspondientes a cada simulación de examen.

### 4. Programación Reactiva con RxJS (`Observables`)
En lugar de manejar flujos de datos estáticos, el servicio expone la información mediante **Observables**. Esto permite a los componentes del test suscribirse de forma reactiva al flujo de preguntas, gestionando de manera eficiente eventos asíncronos y garantizando que la aplicación reaccione instantáneamente al cambiar de simulación.

---

## 🚦 Sistema de Enrutamiento (`Routing`) y su Importancia

El enrutamiento (`Routing`) es el núcleo que gestiona la experiencia de usuario y la navegación dentro de la aplicación. Su importancia radica en los siguientes puntos:

* **Single Page Application (SPA):** Permite cambiar entre los diferentes exámenes y la sección de la ley sin recargar la página por completo en el navegador, ofreciendo una fluidez inmediata.
* **Navegación Limpia:** Asocia componentes específicos a URLs amigables (ej. `/examen2024a`, `/ce`).
* **Sincronización de Estados:** Facilita la navegación hacia atrás y hacia adelante del navegador manteniendo el hilo de lo que el opositor está visualizando.

---

## 📁 Componentes Instalados (Estructura de Páginas)

La aplicación cuenta con componentes individuales creados para cubrir las necesidades específicas de los 5 años de convocatorias oficiales:

* **`CE`**: Vista dedicada a la consulta y estudio directo de la Constitución Española.
* **`examen2018`**, **`examen2019`**, **`examen2023`**, **`examen2024-a`**, **`examen2024-b`**: 5 módulos de test interactivos e independientes preparados para cargar sus respectivos bancos de preguntas JSON.
* **`visor-pdf`**: Componente dinámico diseñado para la integración y visualización controlada de recursos documentales.

---

## 🛠️ Tecnologías Utilizadas

* **Angular** (Framework Frontend).
* **TypeScript** (Modelado y lógica bajo tipado estricto).
* **RxJS** (Gestión de flujos de datos con Observables).
* **Bootstrap** (Diseño adaptable y menús interactivos).

---

## 📁 Estructura del Material de Estudio en Disco

Los recursos PDF oficiales del proyecto se organizan en el directorio de assets para su consulta:

```text
src/assets/data/
├── cons_espa.pdf            # Texto oficial de la C.E.
├── Tai_oposion_2018/        # Documentos del examen de 2018
├── Tai_oposion_2019/        # Documentos del examen de 2019
├── Tai_oposion_2023/        # Documentos del examen de 2023
├── Tai_oposion_A_2024/      # Documentos del examen de 2024 (Bloque A)
└── Tai_oposion_B_2024/      # Documentos del examen de 2024 (Bloque B)