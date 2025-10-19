// Import modules directly from CDN
import * as THREE from "https://cdn.skypack.dev/three@0.160.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";


const canvas = document.getElementById("scene");
const playBtn = document.getElementById("playBtn");

// Renderer / scene / camera
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0.8, 0.5, 2.2);
scene.add(camera);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const key = new THREE.DirectionalLight(0xffffff, 1.2);
key.position.set(2, 3, 2);
scene.add(key);

// ---- Debug cube so you can see something immediately ----
const debugCube = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 0.2, 0.2),
  new THREE.MeshStandardMaterial({ color: 0x66ccff })
);
debugCube.position.set(-0.6, 0.2, 0);
scene.add(debugCube);

// Video setup
const video = document.createElement("video");
video.src = "assets/demo.mp4";     // <-- make sure this exists
video.muted = true;
video.loop = true;
video.playsInline = true;
video.preload = "auto";

const videoTex = new THREE.VideoTexture(video);
videoTex.colorSpace = THREE.SRGBColorSpace;
videoTex.minFilter = THREE.LinearFilter;
videoTex.magFilter = THREE.LinearFilter;
videoTex.generateMipmaps = false;

const tryAutoplay = async () => {
  try { await video.play(); playBtn.hidden = true; }
  catch { playBtn.hidden = false; }
};
tryAutoplay();
playBtn.addEventListener("click", tryAutoplay);

// Load the desktop model
const loader = new GLTFLoader();
let desktop = null;

loader.load(
  "assets/desktop.glb", // <-- path must be exact
  (gltf) => {
    desktop = gltf.scene;
    desktop.traverse((o) => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });

    // Try common names for the monitor screen; change to your real mesh name if needed
    const screenMesh =
      desktop.getObjectByName("Screen") ||
      desktop.getObjectByName("Monitor_Screen") ||
      desktop.getObjectByName("display") ||
      desktop.getObjectByName("screen");

    if (screenMesh) {
      screenMesh.material = new THREE.MeshBasicMaterial({ map: videoTex, toneMapped: false });
    } else {
      console.warn("⚠️ Could not find a 'Screen' mesh—open the GLB to get the exact name.");
    }

    desktop.position.set(0, -0.2, 0);
    desktop.rotation.set(0, Math.PI * 0.1, 0);
    desktop.scale.set(1, 1, 1);
    scene.add(desktop);
  },
  undefined,
  (err) => console.error("GLB load error:", err)
);

// Mouse parallax + bob
const mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.01;

  camera.position.x = mouse.x * 0.12;
  camera.position.y = 0.5 - mouse.y * 0.12;
  camera.lookAt(0, 0.2, 0);

  if (desktop) {
    desktop.rotation.y += 0.0015;
    desktop.position.y = -0.2 + Math.sin(t) * 0.03;
  }
  debugCube.rotation.y += 0.02;

  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener("resize", () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
