// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// render scene
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create camera orbit
const orbit = new THREE.OrbitControls(camera, renderer.domElement)
orbit.update;

// create 3d object
const axesHelper = new THREE.AxesHelper(20);
const gridHelper = new THREE.GridHelper(30);

const cylinderGeometry = new THREE.CylinderBufferGeometry(2, 2, 7, 12);
const CylinderMaterial = new THREE.MeshBasicMaterial({
    color: '#8bc34a',
    wireframe: true,
});
const cylinder = new THREE.Mesh(cylinderGeometry, CylinderMaterial);
cylinder.position.x = 10;

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: '#FFFFFF',
    side: THREE.DoubleSide

});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - 0.5 * Math.PI;

// add object to scene
scene.add(axesHelper);
scene.add(gridHelper);
scene.add(cylinder);
scene.add(plane);

// animate object
const animate = () => {
    requestAnimationFrame(animate);

    // cylinder.rotation.x += 0.01;
    // cylinder.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// call animate to display
animate();

// responsive canvas
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})