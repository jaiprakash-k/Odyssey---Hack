# 🪐 HEIRLOOM: The Mars Paradox

> *"Earth is not our home. We are the backup drive. Mars is the server."*

![Hackathon](https://img.shields.io/badge/Hackathon-Submission-FF4B4B?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

**HEIRLOOM** is an interactive, scroll-driven 3D cinematic web experience. It subverts the traditional "Mars Exploration" trope by presenting a sci-fi narrative where humanity discovers that Mars is not a dead rock, but a dormant biological entity and our true ancestral home. 

This project isn't just a website; it is an **Interactive Existential Crisis**, pushing the boundaries of WebGL performance, scroll-linked camera timelines, and narrative frontend architecture.

---

## 🚀 The Vision

Most space exploration applications focus on data visualization and rovers. **HEIRLOOM** focuses on narrative and visceral impact. We combined high-fidelity 3D rendering with butter-smooth scroll hijacking to create a "playable movie" right in the browser. 

As the user scrolls down, they don't move down a page—their camera dives deeper into the Martian crust, uncovering layers of procedural particle systems, time-reversal shaders, and cinematic typography.

## 🛠️ Technical Architecture

Building a 1000vh continuous 3D experience requires strict separation of the WebGL canvas from the DOM. 

* **The Engine:** React + React Three Fiber (`@react-three/fiber`)
* **The Camera Rig:** `@react-three/drei` `ScrollControls` for mapping camera position, rotation, and FOV to normalized scroll progress (0 to 1).
* **The Physics & Shaders:** Custom GLSL displacement shaders for the "Breathing Core" and InstancedMesh for rendering 100,000+ interactive dust particles without dropping frames.
* **The Typography Overlay:** Framer Motion tied to GSAP `ScrollTrigger` to seamlessly fade HTML text in and out over the 3D `<Canvas>`.
* **Smooth Scrolling:** Lenis for mathematically precise scroll interpolation.

### Core Modules

* `CanvasContainer.jsx` - The global WebGL context provider.
* `CameraTimeline.jsx` - The mathematical heart of the app, using `useFrame` to interpolate the camera through 5 distinct story nodes based on scroll offset.
* `ProceduralEnvironment.jsx` - Handles the dynamic generation of the Martian terrain and the wireframe Archive City.
* `CinematicUI.jsx` - Absolute positioned HTML layer for high-contrast storytelling.

---

## 📖 The Narrative Timeline

The user journey is mapped mathematically to the scrollbar:

1. **The Iron Heartbeat (0% - 20%):** The approach to a pulsing, biological Mars.
2. **The Whispering Dunes (20% - 45%):** A descent into reactive, glowing data-particles.
3. **The Archive City (45% - 70%):** The dust reorganizes into the wireframes of an impossibly advanced civilization.
4. **The Reverse-Time Glitch (70% - 85%):** Chromatic aberration and shader noise as time collapses backward.
5. **The Integration (85% - 100%):** The final reflective monolith and the call to action.

---

## 💻 Local Installation

To run the HEIRLOOM environment locally:

```bash
# 1. Clone the repository
git clone [https://github.com/yourusername/heirloom-mars.git](https://github.com/yourusername/heirloom-mars.git)

# 2. Navigate into the directory
cd heirloom-mars

# 3. Install dependencies (Requires Node.js v18+)
npm install

# 4. Start the Vite development server
npm run dev
