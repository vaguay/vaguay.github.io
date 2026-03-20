// script-home.js

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
  
    // Load + play video
    screenVideoEl.src = videoUrl;
    screenVideoEl.currentTime = 0;
    screenVideoEl.loop = false;
    screenVideoEl.muted = true; // autoplay-friendly
  
    const startDrawing = () => {
      if (videoRafId) cancelAnimationFrame(videoRafId);
  
      const drawFrame = () => {
        // Draw the video frame into the 2D canvas
        ctx.fillStyle = '#001a33';
        ctx.fillRect(0, 0, canvas2D.width, canvas2D.height);
  
        // Draw video scaled to fit canvas (cover)
        const vw = screenVideoEl.videoWidth || 1;
        const vh = screenVideoEl.videoHeight || 1;
  
        const canvasAspect = canvas2D.width / canvas2D.height;
        const videoAspect = vw / vh;
  
        let sx = 0, sy = 0, sw = vw, sh = vh;
  
        if (videoAspect > canvasAspect) {
          // video wider than canvas: crop sides
          sw = vh * canvasAspect;
          sx = (vw - sw) / 2;
        } else {
          // video taller than canvas: crop top/bottom
          sh = vw / canvasAspect;
          sy = (vh - sh) / 2;
        }
  
        ctx.drawImage(screenVideoEl, sx, sy, sw, sh, 0, 0, canvas2D.width, canvas2D.height);
  
        // Optional scanlines overlay (keeps your CRT vibe during video)
        ctx.fillStyle = 'rgba(0, 100, 150, 0.008)';
        for (let i = 0; i < canvas2D.height; i += 4) {
          ctx.fillRect(0, i, canvas2D.width, 1);
        }
  
        if (screenMesh && screenMesh.material.map) {
          screenMesh.material.map.needsUpdate = true;
        }
  
        // Keep drawing while in video phase
        if (animationPhase === 'video') {
          videoRafId = requestAnimationFrame(drawFrame);
        }
      };
  
      animationPhase = 'video';
      drawFrame();
    };
  
    // When it can play, start drawing frames
    screenVideoEl.oncanplay = () => {
      screenVideoEl.play().then(() => {
        startDrawing();
      }).catch(() => {
        // If autoplay blocked, still switch back gracefully
        isPlayingVideo = false;
        charIndex = 0;
        currentText = "";
        animationPhase = 'typing';
      });
    };
  
    // When the video ends, go to next video (continuous loop)
    screenVideoEl.onended = () => {
      isPlayingVideo = false;
      playNextVideo();
    };
  
    // Trigger load
    screenVideoEl.load();
  }
  
  // Add this function to allow users to add videos
  window.addVideo = function(videoUrl) {
    videoElements.push(videoUrl);
  };
  
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
    camera.position.set(0, 2.2, 12); // Adjusted position for a slightly smaller and higher view
    camera.lookAt(0, 0.3, 0); // Center the camera slightly lower to avoid cutting off the bottom
  
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
    const screenMaterial = new THREE.MeshBasicMaterial({
        map: textTexture
      });
      
    screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = 3.5;
    computer.add(screenMesh);
  
    // Screen glass reflection layer
    const glassGeometry = new THREE.PlaneGeometry(6.5, 4.85);
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.05,
      roughness: 0.1,
      metalness: 0.1
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.z = 3.55;
    computer.add(glass);
  
  }