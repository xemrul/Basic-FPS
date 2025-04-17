const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });
const controls = new THREE.PointerLockControls(camera, document.body);

let health = 100;
let ammo = 30;
let score = 0;
let gameOver = false;
let isShooting = false;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3D Environment
const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
floor.position.y = -5;
scene.add(floor);

// Create walls (just as simple box placeholders)
const wallGeometry = new THREE.BoxGeometry(1, 10, 100);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(50, 5, 0);
scene.add(wall1);

// Enemies
const enemyGeometry = new THREE.BoxGeometry(2, 3, 2);
const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
enemy.position.set(20, 0, -10);
scene.add(enemy);

// Add gun
const gunGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5);
const gunMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
const gun = new THREE.Mesh(gunGeometry, gunMaterial);
gun.position.set(0, -0.5, -1);
camera.add(gun);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Set camera position
camera.position.y = 2;
camera.position.z = 10;
scene.add(camera);

// Movement and shooting
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let keys = {};
document.addEventListener('keydown', (event) => { keys[event.key] = true; });
document.addEventListener('keyup', (event) => { keys[event.key] = false; });
document.addEventListener('click', () => { controls.lock(); });

function shoot() {
  if (ammo > 0) {
    ammo--;
    document.getElementById('ammo').innerText = ammo;
    console.log("Shot fired!");
    // Placeholder for shooting effect (raycasting or projectile)
    score += 10;  // Increase score when shooting
    document.getElementById('score').innerText = score;
  }
}

// Update health
function updateHealth(amount) {
  health += amount;
  document.getElementById('health').innerText = health;
  if (health <= 0 && !gameOver) {
    gameOverScreen();
  }
}

function gameOverScreen() {
  gameOver = true;
  document.getElementById('finalScore').innerText = score;
  document.getElementById('gameOver').style.display = 'block';
}

function restartGame() {
  location.reload();  // Restart the game by reloading the page
}

function animate() {
  requestAnimationFrame(animate);

  // Movement and controls
  velocity.x = 0;
  velocity.z = 0;
  if (keys['w']) velocity.z -= 0.1;
  if (keys['s']) velocity.z += 0.1;
  if (keys['a']) velocity.x -= 0.1;
  if (keys['d']) velocity.x += 0.1;

  camera.translateX(velocity.x);
  camera.translateZ(velocity.z);
  controls.update();

  // Simulate shooting
  if (isShooting) shoot();

  // Game logic: decrease health over time for testing
  updateHealth(-0.1);

  // Render the scene
  renderer.render(scene, camera);
}
animate();

// Pointer lock
window.addEventListener('mousemove', (event) => {
  const deltaX = event.movementX;
  const deltaY = event.movementY;
  camera.rotation.y -= deltaX * 0.1;
  camera.rotation.x -= deltaY * 0.1;
});
