// 3D-модель Марии в полный рост. Модель сделана нейросетью Hunyuan3D по фотографии,
// цвета у неё нет, поэтому она показана статуэткой с бензиновым переливом, как всё на сайте.
// Крутится мышкой или пальцем; сама медленно поворачивается, если не трогать.
// Кружки внизу меняют материал статуэтки: цвет плавно перетекает в новый.
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

  // материалы статуэтки: цвет, металличность, шероховатость и сила перелива
  const CVETA = [
    ['Перламутр', '#d8cdc2', 0.1, 0.4, 1],
    ['Розовое золото', '#e7a98f', 0.8, 0.3, 0.3],
    ['Лаванда', '#b9a3ea', 0.1, 0.35, 0.8],
    ['Мята', '#8fd6c4', 0.1, 0.35, 0.8],
    ['Хром', '#c9c9d1', 1, 0.15, 0.2],
    ['Чёрный с бензиновым переливом', '#2b2830', 0.6, 0.25, 1],
  ];
  const cel = { cvet: new THREE.Color(CVETA[0][1]), metalness: 0.1, roughness: 0.4, iridescence: 1 };
  const knopki = document.createElement('div');
  knopki.className = 'model__cveta';
  knopki.setAttribute('role', 'group');
  knopki.setAttribute('aria-label', 'Цвет 3D-модели');
  CVETA.forEach(([nazv, cvet, metall, sherokh, pereliv], i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'model__cvet';
    b.style.setProperty('--cvet', cvet);
    b.setAttribute('aria-label', `Цвет: ${nazv}`);
    b.title = nazv;
    b.setAttribute('aria-pressed', String(i === 0));
    b.addEventListener('click', () => {
      cel.cvet.set(cvet); cel.metalness = metall; cel.roughness = sherokh; cel.iridescence = pereliv;
      knopki.querySelectorAll('button').forEach((k) => k.setAttribute('aria-pressed', String(k === b)));
    });
    knopki.append(b);
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI * 0.32;
  controls.maxPolarAngle = Math.PI * 0.62;
  controls.autoRotate = !tiho;
  controls.autoRotateSpeed = 1.6;
  // OrbitControls запрещает браузеру любые жесты над сценой, и на телефоне страница переставала листаться.
  // pan-y: вертикальный свайп листает страницу, горизонтальный крутит модель
  renderer.domElement.style.touchAction = 'pan-y';

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
    blok.append(knopki);               // кружки цвета появляются, когда модель загрузилась
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
    material.color.lerp(cel.cvet, 0.12);
    for (const k of ['metalness', 'roughness', 'iridescence']) material[k] += (cel[k] - material[k]) * 0.12;
    controls.update();
    renderer.render(scene, camera);
  });
}
