// app.js

// === THREE.JS SETUP ===
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// === STARFIELD CREATION ===
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(250).fill().forEach(addStar);

// === LIGHTING ===
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// === ANIMATION LOOP ===
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// === GSAP ANIMATIONS ===
gsap.from('h1', { duration: 1, y: -50, opacity: 0 });
gsap.from('p.fade-in', { duration: 1, y: 50, opacity: 0, delay: 0.5 });
gsap.from('nav ul li', {
  duration: 0.8,
  y: 20,
  opacity: 0,
  stagger: 0.1,
  delay: 0.8,
});

// === HANDLE RESIZE ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after a short delay for smoothness
    // This existing loader logic should be preserved.
    setTimeout(function() {
      const loader = document.getElementById('loader');
      if (loader) {
        loader.classList.add('hide');
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    }, 400); // Adjust delay as needed (ms)

    // === THEME TOGGLE LOGIC ===
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;

    // Function to update button icon based on theme
    const updateToggleButtonIcon = (isLightMode) => {
        if (themeToggleButton) {
            themeToggleButton.textContent = isLightMode ? '☀️' : '🌙';
        }
    };

    // Function to apply the stored theme or default
    const applyInitialTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
            body.classList.add('light-mode');
            updateToggleButtonIcon(true);
        } else {
            // Default to dark mode if no theme is stored or if it's 'dark'
            body.classList.remove('light-mode'); // Explicitly remove if not light
            updateToggleButtonIcon(false);
        }
    };

    // Apply theme on initial load
    applyInitialTheme();

    // Add event listener for the toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            const isLightMode = body.classList.contains('light-mode');
            localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
            updateToggleButtonIcon(isLightMode);
        });
    }
});
