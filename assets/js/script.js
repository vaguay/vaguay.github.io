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
    
    // Add scanlines
    ctx.fillStyle = 'rgba(0, 100, 150, 0.02)';
    for (let i = 0; i < canvas2D.height; i += 3) {
      ctx.fillRect(0, i, canvas2D.width, 1.5);
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
    // Placeholder for video playback
    // You can add video elements here
    // For now, create a simple animation then loop back
    
    isPlayingVideo = true;
    
    // Simulate video playback for 5 seconds
    let videoFrame = 0;
    const videoInterval = setInterval(() => {
      ctx.fillStyle = '#001a33';
      ctx.fillRect(0, 0, canvas2D.width, canvas2D.height);
      
      // Display placeholder for video
      ctx.fillStyle = '#ffffff';
      ctx.font = '40px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Video Placeholder', canvas2D.width / 2, canvas2D.height / 2 - 40);
      ctx.font = '28px Arial';
      ctx.fillText('(Upload your outreach videos)', canvas2D.width / 2, canvas2D.height / 2 + 20);
      
      if (screenMesh && screenMesh.material.map) {
        screenMesh.material.map.needsUpdate = true;
      }
      
      videoFrame++;
      if (videoFrame > 30) { // ~5 seconds at 60fps
        clearInterval(videoInterval);
        isPlayingVideo = false;
        // Loop back to typing
        charIndex = 0;
        currentText = "";
        animationPhase = 'typing';
      }
    }, 166); // ~6fps for video simulation
  }
  
  // Add this function to allow users to add videos
  window.addVideo = function(videoUrl) {
    videoElements.push(videoUrl);
  };
  
  // SCRIPT.JS - Main Application Logic
  
  // Custom Cursor
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Page Navigation
  const navLinks = document.querySelectorAll('.bottom-nav-link');
  const pages = document.querySelectorAll('.page');
  
  function navigateTo(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    const targetPage = document.getElementById(pageId);
    const targetLink = document.querySelector(`[data-page="${pageId}"]`);
    
    if (targetPage) targetPage.classList.add('active');
    if (targetLink) targetLink.classList.add('active');
  }
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const pageId = link.getAttribute('data-page');
      if (pageId) {
        e.preventDefault();
        navigateTo(pageId);
      }
    });
  });
  
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
  const typingText = "HOLA MUNDO";
  let currentText = "";
  let charIndex = 0;
  let showCursor = true;
  let animationPhase = 'typing'; // 'typing', 'video', 'pause'
  
  function init3D() {
    const canvas = document.getElementById('canvas3d');
    if (!canvas) return;
  
    // Scene
    scene = new THREE.Scene();
  
    // Camera with better perspective
    camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 10);
    camera.lookAt(0, 0, 0);
  
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
  
    // Create Computer
    createRealisticComputer();
  
    // Initialize canvas for screen content
    canvas2D = document.createElement('canvas');
    canvas2D.width = 1024;
    canvas2D.height = 768;
    ctx = canvas2D.getContext('2d');
  
    // Start animation loops
    startScreenAnimation();
  
    // Event Listeners
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('wheel', onWheel);
    canvas.addEventListener('touchstart', onTouchStart);
    canvas.addEventListener('touchmove', onTouchMove);
    canvas.addEventListener('touchend', onTouchEnd);
  
    window.addEventListener('resize', onWindowResize);
  
    // Animation Loop
    animate();
  }
  
  function createRealisticComputer() {
    computer = new THREE.Group();
  
    // Monitor body - more realistic proportions
    const monitorBodyGeometry = new THREE.BoxGeometry(7.5, 6, 6);
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
    const bezelGeometry = new THREE.BoxGeometry(7.8, 6.3, 0.4);
    const bezelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xd0c8b8,
      roughness: 0.5
    });
    const bezel = new THREE.Mesh(bezelGeometry, bezelMaterial);
    bezel.position.z = 3.2;
    computer.add(bezel);
  
    // Screen frame (darker)
    const frameGeometry = new THREE.BoxGeometry(7.2, 5.8, 0.3);
    const frameMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x2a2a2a,
      roughness: 0.7
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.z = 3.35;
    computer.add(frame);
  
    // CRT Screen with canvas texture
    const textTexture = new THREE.CanvasTexture(canvas2D);
    textTexture.needsUpdate = true;
    
    const screenGeometry = new THREE.PlaneGeometry(6.4, 4.8);
    const screenMaterial = new THREE.MeshStandardMaterial({ 
      map: textTexture,
      emissive: 0x001122,
      emissiveIntensity: 0.3,
      roughness: 0.2
    });
    screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = 3.5;
    computer.add(screenMesh);
  
    // Screen glass reflection layer
    const glassGeometry = new THREE.PlaneGeometry(6.5, 4.85);
    const glassMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      roughness: 0.1,
      metalness: 0.9
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.z = 3.52;
    computer.add(glass);
  
    // Ventilation grills on sides
    const ventMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a,
      roughness: 0.9 
    });
    
    // Left vents
    for (let i = 0; i < 10; i++) {
      const ventGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.1);
      const vent = new THREE.Mesh(ventGeometry, ventMaterial);
      vent.position.set(-3.7, 2 - i * 0.5, 1.5);
      computer.add(vent);
    }
  
    // Right vents
    for (let i = 0; i < 10; i++) {
      const ventGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.1);
      const vent = new THREE.Mesh(ventGeometry, ventMaterial);
      vent.position.set(3.7, 2 - i * 0.5, 1.5);
      computer.add(vent);
    }
  
    // Brand logo area
    const logoGeometry = new THREE.PlaneGeometry(1.5, 0.3);
    const logoMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a,
      roughness: 0.3
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, -2.5, 3.21);
    computer.add(logo);
  
    // Power LED
    const ledGeometry = new THREE.CircleGeometry(0.1, 16);
    const ledMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ff00,
      emissive: 0x00ff00,
      emissiveIntensity: 1
    });
    const led = new THREE.Mesh(ledGeometry, ledMaterial);
    led.position.set(3, -2.5, 3.21);
    computer.add(led);
  
    // LED glow
    const ledGlow = new THREE.PointLight(0x00ff00, 0.8, 3);
    ledGlow.position.set(3, -2.5, 3.5);
    computer.add(ledGlow);
  
    // Base unit (computer tower)
    const baseGeometry = new THREE.BoxGeometry(7, 1.2, 5.5);
    const base = new THREE.Mesh(baseGeometry, monitorMaterial);
    base.position.y = -3.6;
    base.castShadow = true;
    base.receiveShadow = true;
    computer.add(base);
  
    // Floppy drive slots
    const driveGeometry = new THREE.BoxGeometry(2, 0.15, 0.1);
    const driveMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a,
      roughness: 0.7
    });
    
    const drive1 = new THREE.Mesh(driveGeometry, driveMaterial);
    drive1.position.set(0, -3.3, 2.76);
    computer.add(drive1);
    
    const drive2 = new THREE.Mesh(driveGeometry, driveMaterial);
    drive2.position.set(0, -3.6, 2.76);
    computer.add(drive2);
  
    // Stand neck
    const neckGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 20);
    const neck = new THREE.Mesh(neckGeometry, monitorMaterial);
    neck.position.y = -3.4;
    neck.castShadow = true;
    computer.add(neck);
  
    // Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(7.5, 0.4, 3);
    const keyboard = new THREE.Mesh(keyboardGeometry, monitorMaterial);
    keyboard.position.set(0, -4.3, 4.5);
    keyboard.rotation.x = -0.08;
    keyboard.castShadow =
  