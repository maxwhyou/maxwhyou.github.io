// 3D-модель Марии в полный рост. Модель сделана нейросетью Hunyuan3D по фотографии,
// цвета у неё нет, поэтому она показана статуэткой с бензиновым переливом, как всё на сайте.
// Крутится мышкой или пальцем; сама медленно поворачивается, если не трогать.
// Three.js лежит в самом сайте (js/vendor/three, лицензия MIT) и грузится, только когда блок виден.
import * as THREE from './vendor/three/three.module.min.js';
import { GLTFLoader } from './vendor/three/GLTFLoader.js';
import { OrbitControls } from './vendor/three/OrbitControls.js';
import { RoomEnvironment } from './vendor/three/RoomEnvironment.js';

export function pokazat(blok) {
  const tiho = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;              // иначе белая статуэтка пересвечена и форма не читается
  renderer.domElement.className = 'model__scena';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  blok.append(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0.05, 4.2);

  // свет с цветами перелива: тёплый спереди, сиреневый и мятный по краям
  scene.add(new THREE.AmbientLight('#f3e3cf', 0.15));
  const svet = [['#f7c9b4', 2.2, [2, 2, 3]], ['#cdb6f2', 2.6, [-3, 1, -1]], ['#a8e2d6', 1.8, [2, -1, -3]]];
  for (const [cvet, sila, [x, y, z]] of svet) {
    const s = new THREE.DirectionalLight(cvet, sila);
    s.position.set(x, y, z);
    scene.add(s);
  }

  const material = new THREE.MeshPhysicalMaterial({
    color: '#d8cdc2', metalness: 0.1, roughness: 0.4, clearcoat: 1, clearcoatRoughness: 0.2,
    iridescence: 1, iridescenceIOR: 1.5, iridescenceThicknessRange: [250, 800],
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI * 0.32;
  controls.maxPolarAngle = Math.PI * 0.62;
  controls.autoRotate = !tiho;
  controls.autoRotateSpeed = 1.6;

  new GLTFLoader().load(blok.dataset.model, (gltf) => {
    gltf.scene.traverse((o) => {
      if (o.isMesh) {
        o.geometry.computeVertexNormals();
        o.material = material;
      }
    });
    // ставим модель в центр и подгоняем по высоте
    const ramka = new THREE.Box3().setFromObject(gltf.scene);
    const centr = ramka.getCenter(new THREE.Vector3());
    const vysota = ramka.getSize(new THREE.Vector3()).y;
    gltf.scene.position.sub(centr);
    const gruppa = new THREE.Group();
    gruppa.add(gltf.scene);
    gruppa.scale.setScalar(2 / vysota);
    scene.add(gruppa);
    blok.classList.add('model--gotovo');
  }, undefined, () => blok.classList.add('model--oshibka'));

  function razmer() {
    const w = blok.clientWidth, h = blok.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(razmer).observe(blok);
  razmer();

  let vidno = true;
  new IntersectionObserver(([z]) => { vidno = z.isIntersecting; }).observe(blok);
  renderer.setAnimationLoop(() => {
    if (!vidno) return;
    controls.update();
    renderer.render(scene, camera);
  });
}
