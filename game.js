// Basic 3D FPS Game Setup using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game').appendChild(renderer.domElement);

// Simple geometry for player gun
const gunGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.4);
const gunMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const gun = new THREE.Mesh(gunGeometry, gunMaterial);
scene.add(gun);

// Basic player controls and movement
let velocity = new THREE.Vector3();
let onGround = false;
const speed = 0.1;

const controls = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    shoot: false
};

let playerSpeed = 1;
camera.position.set(0, 1.5, 5);

// Create basic bot (just a cube for now)
const botGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const botMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const bot = new THREE.Mesh(botGeometry, botMaterial);
scene.add(bot);
bot.position.set(3, 0.25, 10);

// Handle user input for WASD movement
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyW') controls.forward = true;
    if (event.code === 'KeyS') controls.backward = true;
    if (event.code === 'KeyA') controls.left = true;
    if (event.code === 'KeyD') controls.right = true;
    if (event.code === 'Space') controls.jump = true;
    if (event.code === 'MouseButton1') controls.shoot = true;
});
document.addEventListener('keyup', (event) => {
    if (event.code === 'KeyW') controls.forward = false;
    if (event.code === 'KeyS') controls.backward = false;
    if (event.code === 'KeyA') controls.left = false;
    if (event.code === 'KeyD') controls.right = false;
    if (event.code === 'Space') controls.jump = false;
});

// Simple function to simulate shooting
function shoot() {
    if (controls.shoot) {
        console.log("Bang! Shooting!");
        // Here we would implement shooting logic (projectile, hit detection, etc.)
    }
}

// Game Loop
function animate() {
    requestAnimationFrame(animate);

    if (controls.forward) camera.position.z -= speed;
    if (controls.backward) camera.position.z += speed;
    if (controls.left) camera.position.x -= speed;
    if (controls.right) camera.position.x += speed;

    shoot();

    // Basic bot movement
    bot.position.z -= 0.02;
    if (bot.position.z < -10) bot.position.z = 10;

    renderer.render(scene, camera);
}

animate();
