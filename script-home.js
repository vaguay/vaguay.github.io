// script-home.js

// Three.js 3D Computer Setup
let scene, camera, renderer, computer, screenMesh, canvas2D, ctx;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationX = -0.1;
let rotationY = 0.3;
let targetRotationX = -0.1;
let targetRotationY = 0.3;

// Video and animation state
let videoElements = [];
let currentVideoIndex = 0;
let isPlayingVideo = false;
let videoTexture = null;
let screenVideoEl = null;
let videoRafId = null;

const typingText = "HOLA MUNDO";
let currentText = "";
let charIndex = 0;
let showCursor = true;
let animationPhase = 'typing';

function init3D() {
  const canvas = document.getElementById('canvas3d');
  if (!canvas) {
    console.error('Canvas element not found!');
    return;
  }

  console.log('Initializing 3D scene...');

  // Scene
  scene = new THREE.Scene();

  // Camera
// Camera
camera = new THREE.PerspectiveCamera(
  50,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1.0, 10);
camera.lookAt(0, -0.2, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Enhanced lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
  keyLight.position.set(8, 10, 8);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 50;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-8, 5, -5);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0xaaaaff, 0.4);
  rimLight.position.set(0, 8, -8);
  scene.add(rimLight);

  // Initialize canvas for screen content
  canvas2D = document.createElement('canvas');
  canvas2D.width = 1024;
  canvas2D.height = 768;
  ctx = canvas2D.getContext('2d');
  screenVideoEl = document.getElementById('screenVideo');

  // Add your hosted video files here:
  videoElements.push("assets/videos/outreach1.mp4");
  videoElements.push("assets/videos/outreach2.mp4");
  videoElements.push("assets/videos/outreach3.mp4");

  // Create Computer
  createRealisticComputer();

  // Event Listeners
  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseup', onMouseUp);
  canvas.addEventListener('wheel', onWheel);
  canvas.addEventListener('touchstart', onTouchStart);
  canvas.addEventListener('touchmove', onTouchMove);
  canvas.addEventListener('touchend', onTouchEnd);

  window.addEventListener('resize', onWindowResize);

  console.log('3D scene initialized successfully!');

  // Animation Loop
  animate();
}

function createRealisticComputer() {
  computer = new THREE.Group();

  // Scale factor to make computer smaller
  const scale = 0.7;

  // Monitor body
  const monitorBodyGeometry = new THREE.BoxGeometry(7.5 * scale, 6 * scale, 6 * scale);
  const monitorMaterial = new THREE.MeshStandardMaterial({
    color: 0xf0e8d8,
    roughness: 0.4,
    metalness: 0.05
  });

  const monitorBody = new THREE.Mesh(monitorBodyGeometry, monitorMaterial);
  monitorBody.castShadow = true;
  monitorBody.receiveShadow = true;
  computer.add(monitorBody);

  // Front bezel
  const bezelGeometry = new THREE.BoxGeometry(7.8 * scale, 6.3 * scale, 0.4 * scale);
  const bezelMaterial = new THREE.MeshStandardMaterial({
    color: 0xd0c8b8,
    roughness: 0.5
  });
  const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
  bezel.position.z = 3.2 * scale;
  computer.add(bezel);

  // Screen frame (darker)
  const frameGeometry = new THREE.BoxGeometry(7.2 * scale, 5.8 * scale, 0.3 * scale);
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.7
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.z = 3.35 * scale;
  computer.add(frame);

  // CRT Screen with canvas texture
  const textTexture = new THREE.CanvasTexture(canvas2D);
  textTexture.needsUpdate = true;

  const screenGeometry = new THREE.PlaneGeometry(6.4 * scale, 4.8 * scale);
  const screenMaterial = new THREE.MeshBasicMaterial({
    map: textTexture
  });

  screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
  screenMesh.position.z = 3.5 * scale;
  computer.add(screenMesh);

  // Screen glass reflection layer
  const glassGeometry = new THREE.PlaneGeometry(6.5 * scale, 4.85 * scale);
  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.05,
    roughness: 0.1,
    metalness: 0.1
  });
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.z = 3.55 * scale;
  computer.add(glass);

  // Ventilation grills on sides
  const ventMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.9
  });

  // Left vents
  for (let i = 0; i < 10; i++) {
    const ventGeometry = new THREE.BoxGeometry(0.15 * scale, 0.6 * scale, 0.1 * scale);
    const vent = new THREE.Mesh(ventGeometry, ventMaterial);
    vent.position.set(-3.7 * scale, (2 - i * 0.5) * scale, 1.5 * scale);
    computer.add(vent);
  }

  // Right vents
  for (let i = 0; i < 10; i++) {
    const ventGeometry = new THREE.BoxGeometry(0.15 * scale, 0.6 * scale, 0.1 * scale);
    const vent = new THREE.Mesh(ventGeometry, ventMaterial);
    vent.position.set(3.7 * scale, (2 - i * 0.5) * scale, 1.5 * scale);
    computer.add(vent);
  }

  // Power LED
  const ledGeometry = new THREE.CircleGeometry(0.1 * scale, 16);
  const ledMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    emissive: 0x00ff00,
    emissiveIntensity: 1
  });
  const led = new THREE.Mesh(ledGeometry, ledMaterial);
  led.position.set(3 * scale, -2.5 * scale, 3.21 * scale);
  computer.add(led);

  // LED glow
  const ledGlow = new THREE.PointLight(0x00ff00, 0.8, 3 * scale);
  ledGlow.position.set(3 * scale, -2.5 * scale, 3.5 * scale);
  computer.add(ledGlow);

  // Base unit
  const baseGeometry = new THREE.BoxGeometry(7 * scale, 1.2 * scale, 5.5 * scale);
  const base = new THREE.Mesh(baseGeometry, monitorMaterial);
  base.position.y = -3.6 * scale;
  base.castShadow = true;
  base.receiveShadow = true;
  computer.add(base);

  // Stand neck
  const neckGeometry = new THREE.CylinderGeometry(0.5 * scale, 0.5 * scale, 0.8 * scale, 20);
  const neck = new THREE.Mesh(neckGeometry, monitorMaterial);
  neck.position.y = -3.4 * scale;
  neck.castShadow = true;
  computer.add(neck);

  // Keyboard
  const keyboardGeometry = new THREE.BoxGeometry(7.5 * scale, 0.4 * scale, 3 * scale);
  const keyboard = new THREE.Mesh(keyboardGeometry, monitorMaterial);
  keyboard.position.set(0, -4.3 * scale, 4.5 * scale);
  keyboard.rotation.x = -0.08;
  keyboard.castShadow = true;
  keyboard.receiveShadow = true;
  computer.add(keyboard);

  // Keyboard keys
  const keyMaterial = new THREE.MeshStandardMaterial({
    color: 0xe0e0e0,
    roughness: 0.4
  });

  for (let row = 0; row < 5; row++) {
    const keysInRow = row === 0 ? 13 : 12;
    for (let col = 0; col < keysInRow; col++) {
      const keySize = (row === 0 ? 0.35 : 0.42) * scale;
      const keyGeometry = new THREE.BoxGeometry(keySize, 0.18 * scale, 0.42 * scale);
      const key = new THREE.Mesh(keyGeometry, keyMaterial);
      key.position.set(
        (-3 + col * 0.55) * scale,
        -4.15 * scale,
        (3.2 + row * 0.55) * scale
      );
      keyboard.add(key);
    }
  }

  // Mouse
  const mouseGeometry = new THREE.BoxGeometry(0.8 * scale, 0.3 * scale, 1.2 * scale);
  const mouse = new THREE.Mesh(mouseGeometry, monitorMaterial);
  mouse.position.set(5 * scale, -4.25 * scale, 4.8 * scale);
  mouse.castShadow = true;
  computer.add(mouse);

  // Set initial rotation and position
  computer.rotation.x = rotationX;
  computer.rotation.y = rotationY;
  computer.position.y = -0.2;

  // ADD TO SCENE
  scene.add(computer);

  console.log('Computer model created and added to scene');

  // Animate LED pulse
  let ledIntensity = 1;
  let increasing = false;
  setInterval(() => {
    if (increasing) {
      ledIntensity += 0.15;
      if (ledIntensity >= 1) increasing = false;
    } else {
      ledIntensity -= 0.15;
      if (ledIntensity <= 0.3) increasing = true;
    }
    ledMaterial.emissiveIntensity = ledIntensity;
  }, 150);

  // Start screen animation after computer is created
  startScreenAnimation();
}

// Screen animation system
function startScreenAnimation() {
  updateScreen();

  // Typing animation interval
  setInterval(() => {
    if (animationPhase === 'typing') {
      if (charIndex < typingText.length) {
        currentText = typingText.substring(0, charIndex + 1);
        charIndex++;
      } else {
        // Move to video phase after typing completes
        setTimeout(() => {
          animationPhase = 'video';
          playNextVideo();
        }, 2000);
      }
    }
  }, 150);

  // Cursor blink interval
  setInterval(() => {
    showCursor = !showCursor;
    if (animationPhase === 'typing') {
      updateScreen();
    }
  }, 500);
}

function updateScreen() {
  if (!ctx) return;

  // Clear with CRT background
  ctx.fillStyle = '#001a33';
  ctx.fillRect(0, 0, canvas2D.width, canvas2D.height);

  // Add subtle scanlines
  ctx.fillStyle = 'rgba(0, 100, 150, 0.008)';
  for (let i = 0; i < canvas2D.height; i += 4) {
    ctx.fillRect(0, i, canvas2D.width, 1);
  }

  // Draw text
  ctx.fillStyle = '#00ff00';
  ctx.font = 'bold 120px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowBlur = 20;
  ctx.shadowColor = '#00ff00';

  const displayText = currentText + (showCursor ? '_' : ' ');
  ctx.fillText(displayText, canvas2D.width / 2, canvas2D.height / 2);

  if (screenMesh && screenMesh.material.map) {
    screenMesh.material.map.needsUpdate = true;
  }
}

function playNextVideo() {
  isPlayingVideo = true;

  if (!screenVideoEl || videoElements.length === 0) {
    // If no videos, fall back to typing loop
    charIndex = 0;
    currentText = "";
    animationPhase = 'typing';
    isPlayingVideo = false;
    return;
  }

  const videoUrl = videoElements[currentVideoIndex % videoElements.length];
  currentVideoIndex++;

  screenVideoEl.src = videoUrl;
  screenVideoEl.currentTime = 0;
  screenVideoEl.loop = false;
  screenVideoEl.muted = true;

  const startDrawing = () => {
    if (videoRafId) cancelAnimationFrame(videoRafId);

    const drawFrame = () => {
      ctx.fillStyle = '#001a33';
      ctx.fillRect(0, 0, canvas2D.width, canvas2D.height);

      const vw = screenVideoEl.videoWidth || 1;
      const vh = screenVideoEl.videoHeight || 1;

      const canvasAspect = canvas2D.width / canvas2D.height;
      const videoAspect = vw / vh;

      let sx = 0, sy = 0, sw = vw, sh = vh;

      if (videoAspect > canvasAspect) {
        sw = vh * canvasAspect;
        sx = (vw - sw) / 2;
      } else {
        sh = vw / canvasAspect;
        sy = (vh - sh) / 2;
      }

      ctx.drawImage(screenVideoEl, sx, sy, sw, sh, 0, 0, canvas2D.width, canvas2D.height);

      // Scanlines overlay
      ctx.fillStyle = 'rgba(0, 100, 150, 0.008)';
      for (let i = 0; i < canvas2D.height; i += 4) {
        ctx.fillRect(0, i, canvas2D.width, 1);
      }

      if (screenMesh && screenMesh.material.map) {
        screenMesh.material.map.needsUpdate = true;
      }

      if (animationPhase === 'video') {
        videoRafId = requestAnimationFrame(drawFrame);
      }
    };

    animationPhase = 'video';
    drawFrame();
  };

  screenVideoEl.oncanplay = () => {
    screenVideoEl.play().then(() => {
      startDrawing();
    }).catch(() => {
      isPlayingVideo = false;
      charIndex = 0;
      currentText = "";
      animationPhase = 'typing';
    });
  };

  screenVideoEl.onended = () => {
    isPlayingVideo = false;
    playNextVideo();
  };

  screenVideoEl.load();
}

window.addVideo = function(videoUrl) {
  videoElements.push(videoUrl);
};

// Mouse/Touch interaction handlers
function onMouseDown(e) {
  isDragging = true;
  previousMousePosition = { x: e.clientX, y: e.clientY };
}

function onMouseMove(e) {
  if (isDragging && computer) {
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX += deltaY * 0.008;

    targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationX));

    previousMousePosition = { x: e.clientX, y: e.clientY };
  }
}

function onMouseUp() {
  isDragging = false;
}

function onTouchStart(e) {
  isDragging = true;
  previousMousePosition = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY
  };
}

function onTouchMove(e) {
  if (isDragging && computer) {
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    targetRotationY += deltaX * 0.008;
    targetRotationX += deltaY * 0.008;

    targetRotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationX));

    previousMousePosition = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  }
  e.preventDefault();
}

function onTouchEnd() {
  isDragging = false;
}

function onWheel(e) {
  e.preventDefault();
  const zoomSpeed = 0.5;
  camera.position.z += e.deltaY * 0.01 * zoomSpeed;
  camera.position.z = Math.max(6, Math.min(15, camera.position.z));
}

function onWindowResize() {
  const canvas = document.getElementById('canvas3d');
  if (!canvas || !camera || !renderer) return;

  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);

  if (computer) {
    rotationY += (targetRotationY - rotationY) * 0.1;
    rotationX += (targetRotationX - rotationX) * 0.1;

    computer.rotation.y = rotationY;
    computer.rotation.x = rotationX;

    computer.position.y = -0.2 + Math.sin(Date.now() * 0.0008) * 0.1;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// Initialize on load
window.addEventListener('load', () => {
  console.log('Page loaded, starting init3D...');
  init3D();
});
