import * as THREE from window.THREE;
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.getElementById("scene");
const playBtn = document.getElementById("playBtn");

//
// 1) Basic scene
// 
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0.8, 0.5, 2.2);
scene.add(camera);

// Lighting (soft studio)
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
const key = new THREE.DirectionalLight(0xffffff, 1.2);
key.position.set(2, 3, 2);
key.castShadow = false;
scene.add(ambient, key);

// 
// 2) Video element + texture
// 
const video = document.createElement("video");
video.src = "assets/demo.mp4";     // replace with your file
video.muted = true;                // needed for autoplay on mobile
video.loop = true;
video.playsInline = true;          // iOS
video.preload = "auto";

const videoTex = new THREE.VideoTexture(video);
videoTex.colorSpace = THREE.SRGBColorSpace;
videoTex.minFilter = THREE.LinearFilter;
videoTex.magFilter = THREE.LinearFilter;
videoTex.generateMipmaps = false;

// Autoplay if allowed, else show “Tap to Play”
video.addEventListener("error", () => console.warn("Video error:", video.error));
video.addEventListener("play", () => (playBtn.hidden = true));
const tryAutoplay = async () => {
  try {
    await video.play();
  } catch {
    playBtn.hidden = false;
  }
};
tryAutoplay();
playBtn.addEventListener("click", tryAutoplay);

// ———————————————————————————————————————
// 3) Load desktop model and map video to the screen mesh
// ———————————————————————————————————————
const loader = new GLTFLoader();

let desktop = null;
loader.load(
  "assets/desktop.glb",
  (gltf) => {
    desktop = gltf.scene;
    desktop.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = obj.receiveShadow = true;
      }
    });

    // IMPORTANT: change "Screen", "Monitor", or the exact mesh name in your GLB
    // Use https://gltf.report/ or VS Code glTF Viewer to inspect mesh names.
    const screenMesh =
      desktop.getObjectByName("Screen") ||
      desktop.getObjectByName("Monitor_Screen") ||
      desktop.getObjectByName("display") ||
      null;

    if (screenMesh) {
      screenMesh.material = new THREE.MeshBasicMaterial({ map: videoTex, toneMapped: false });
    } else {
      console.warn("Could not find screen mesh by name. Update the name in main.js.");
    }

    // Nice initial placement
    desktop.position.set(0, -0.2, 0);
    desktop.rotation.set(0, Math.PI * 0.1, 0);
    const s = 1.0; // adjust to fit model scale
    desktop.scale.set(s, s, s);

    scene.add(desktop);
  },
  undefined,
  (err) => console.error("GLB load error:", err)
);

// ———————————————————————————————————————
// 4) Interaction: mouse parallax + gentle bobbing
// ———————————————————————————————————————
const mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.01;

  // Camera parallax
  const parallaxAmt = 0.12;
  camera.position.x = mouse.x * parallaxAmt;
  camera.position.y = 0.5 - mouse.y * parallaxAmt;
  camera.lookAt(0, 0.2, 0);

  // Gentle bob on the model
  if (desktop) {
    desktop.rotation.y += 0.0015;
    desktop.position.y = -0.2 + Math.sin(t) * 0.03;
  }

  renderer.render(scene, camera);
}
animate();

// ———————————————————————————————————————
// 5) Resize
// ———————————————————————————————————————
window.addEventListener("resize", () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
