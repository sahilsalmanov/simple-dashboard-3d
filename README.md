# Simple Dashboard 3D

![React](https://img.shields.io/badge/React-19-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-purple)
![Three.js](https://img.shields.io/badge/Three.js-0.182.0-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.19-teal)
![Axios](https://img.shields.io/badge/Axios-1.13.5-lightgrey)

---

## 🛠 Tech Stack

* **React 19.2.4**
* **React Router DOM 7.13.0**
* **Redux Toolkit 2.11.2**
* **React Three Fiber (R3F) 9.5.0**
* **Drei 10.7.7** (helper components for R3F)
* **Formik 2.4.9 + Yup 1.7.1** – form handling & validation
* **Axios 1.13.5** – HTTP requests
* **Tailwind CSS 3.4.19** – styling
* **localStorage-based mock API** (configurable via `.env`)
* **@heroicons/react 2.2.0** – icons library

---

## ✨ Features

* Designer management: **Add, Edit, List**
* 3D object creation and editing
* Attach objects to designers
* Transform controls for 3D object positioning
* Real-time hover & selection highlighting
* Persistent state via Redux + localStorage
* Feature toggles via `.env` (`REACT_APP_USE_MOCK`)

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
# Enable mock API (localStorage-based). Set to false to use real API
REACT_APP_USE_MOCK=true
```

---

## 🚀 Installation & Run

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 📦 Build & Test

* **Build for production:**

```bash
npm run build
```

* **Run tests:**

```bash
npm test
```

---

## 📝 Notes

* Project uses `react-scripts 5.0.1` for development.
* ESLint configuration follows `react-app` standards.
* TailwindCSS setup uses `postcss 8.5.6` and `autoprefixer 10.4.24`.
* Browserslist targets modern browsers for both development and production.
