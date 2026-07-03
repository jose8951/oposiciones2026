# 🎯 Proyecto Oposiciones TAI 2026

Aplicación web interactiva desarrollada con **Angular** orientada a la preparación y el autoestudio de las oposiciones para el cuerpo de **Técnicos Auxiliares de Informática (TAI)** de la Administración General del Estado.

## 🚀 Acceso al proyecto
Puedes ver la versión en producción aquí: [https://oposiciones2026.onrender.com](https://oposiciones2026.onrender.com)

---

## 🏗️ Arquitectura Técnica y Patrones de Diseño

El proyecto está diseñado bajo los estándares modernos de Angular, aplicando modularidad, tipado estricto y desacoplamiento de código mediante los siguientes pilares:

### 1. Modelos de Datos (`Models`)
Se utiliza un modelo fuertemente tipado en `src/app/models/pregunta.model.ts` para definir la estructura exacta de las preguntas (enunciado, opciones, solución), garantizando integridad y mantenimiento.

### 2. Componentes Modulares (`Nav Component`)
La barra de navegación (`src/app/nav/`) actúa como un componente independiente y reutilizable, asegurando consistencia visual en toda la aplicación.

### 3. Servicios e Inyección de Dependencias
La lógica de datos reside en `src/app/services/`, encargada de realizar las peticiones HTTP para cargar los ficheros `.json` locales de cada simulación de examen.

### 4. Programación Reactiva con RxJS
Los servicios exponen la información mediante **Observables**, permitiendo que los componentes reaccionen instantáneamente a los cambios en el flujo de datos de los tests.

---

## 🚦 Sistema de Enrutamiento (`Routing`)

El enrutamiento gestiona la experiencia de usuario bajo el paradigma **SPA (Single Page Application)**, permitiendo:
* Navegación fluida sin recargas completas.
* URLs amigables asociadas a componentes específicos.
* Gestión eficiente de estados de navegación.

---

## 📁 Componentes (Estructura de Exámenes)

La aplicación soporta las convocatorias desde 2018 hasta 2025:

* **`CE`**: Consulta de la Constitución Española.
* **Exámenes Interactivos**: Módulos independientes para los años **2018, 2019, 2023, 2024 (A y B) y 2025**.
* **`visor-pdf`**: Integración dinámica para la visualización de recursos documentales.

---

## 🛠️ Tecnologías Utilizadas

* **Angular** (Framework Frontend).
* **TypeScript** (Tipado estricto).
* **RxJS** (Gestión de flujos asíncronos).
* **Bootstrap** (Diseño adaptable).
* **Render** (Despliegue y hosting).

---

## 📁 Estructura del Material de Estudio

```text
src/assets/data/
├── cons_espa.pdf
├── Tai_oposion_2018/
├── Tai_oposion_2019/
├── Tai_oposion_2023/
├── Tai_oposion_A_2024/
├── Tai_oposion_B_2024/
└── Tai_oposion_2025/       

