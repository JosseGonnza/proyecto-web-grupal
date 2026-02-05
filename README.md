<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0E7C7B&animation=fadeIn&height=120&section=header"/>

# ☕ Tag & Coffee | Proyecto Web Grupal

![Project Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Git Workflow](https://img.shields.io/badge/Workflow-Feature%20Branch-blueviolet)

> "Desarrollo web con cafeína". Sitio corporativo para la cafetería Tag & Coffee.

---

## 📖 Sobre el Proyecto

Este repositorio aloja el sitio web de **Tag & Coffee**, desarrollado como un **'Side Project' colaborativo** entre compañeros de clase. El objetivo es simular un entorno profesional real, saliendo de la teoría del aula para mancharnos las manos de código.

No solo buscamos una web bonita, sino implementar un **flujo de trabajo (Workflow)** serio:
* Cada integrante es responsable *Full-Stack* (HTML+CSS) de sus secciones.
* Uso estricto de **Variables CSS** para mantener la identidad de marca (Branding definido por Carlos).
* Control de versiones simulando una pequeña agencia digital.

---

## 🛠️ Stack y Metodología

* **Arquitectura:** Modular. Un archivo `main.css` actúa como fuente de verdad (Source of Truth) para variables y estilos globales, mientras que cada sección tiene su hoja de estilos encapsulada.
* **Estilos:** CSS3 nativo (Flexbox/Grid, Custom Properties).
* **Control de Versiones:** Git & GitHub (Feature Branch Workflow).

---

## 👥 El Equipo (Squad)

Cada miembro actúa como **Product Owner** de sus secciones asignadas:

| Miembro           | Rol / Secciones a cargo          | GitHub                                         |
|:------------------|:---------------------------------|:-----------------------------------------------|
| **Carlos Rivas** | **La Carta** & Branding/Diseño   | [@xhlyter](https://github.com/XhlyTer)         |
| **Mael Sifre** | **Sobre Nosotros** & **Contacto**| [@jigary2227](https://github.com/jigary2227)   |
| **Jose González** | **Home Page** & Estructura Base  | [@jossegonnza](https://github.com/JosseGonnza) |

---

## ⚙️ Instalación y Despliegue

Si deseas probar este proyecto en tu entorno local:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/JosseGonnza/proyecto-web-grupal.git](https://github.com/JosseGonnza/proyecto-web-grupal.git)
    ```
2.  **Navegar al directorio:**
    ```bash
    cd proyecto-web-grupal
    ```
3.  **Visualizar:**
    Abre el archivo `index.html` en tu navegador o usa la extensión *Live Server* de VS Code.

---

## 📂 Estructura del Repositorio

Mantenemos una arquitectura limpia para evitar conflictos al trabajar en paralelo:

```text
/
├── index.html          # Landing Page (Responsable: Jose)
├── menu.html           # Carta de productos (Responsable: Carlos)
├── galery.html         # Galería de imagenes (Responsable: Carlos)
├── about.html          # Sobre Nosotros (Responsable: Mael)
├── contact.html        # Formulario de contacto (Responsable: Mael)
├── /css
│   ├── main.css        # ⚠️ GLOBAL: Variables (:root), Reset, Navbar y Footer
│   ├── home.css        # Estilos específicos de la Home
│   ├── menu.css        # Estilos específicos de la Carta
│   ├── galery.css      # Estilos específicos de la Galería
│   ├── about.css       # Estilos específicos del Sobre Nosotros
│   └── contact.css     # Estilos para formularios y textos
└── /img                # Assets organizados

<p align="center"> <sub>Desarrollado con ☕ y ❤️ por el equipo de 1º DAW</sub> </p>

<img src="https://raw.githubusercontent.com/matfantinel/matfantinel/master/waves.svg" width="100%" height="100">