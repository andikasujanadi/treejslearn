// create scene
const scene = new THREE.Scene();

// create camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 5;
camera.rotation.x = -0.5;

const moveCamera = (x) => {
    const resolution = 100;
    for (let index = 0; index < Math.abs(x)*resolution; index++) {
        setTimeout(() => {
            camera.position.x += Math.abs(x)/x/resolution;
        }, index);
    }
}

// render scene
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled  = true;
renderer.setSize(window.innerWidth, window.innerHeight);
threeContainer.appendChild(renderer.domElement);

// create camera orbit
const orbit = new THREE.OrbitControls(camera, renderer.domElement)
orbit.update;

// add light
const ambientLight = new THREE.AmbientLight(0x505090);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFF30);
directionalLight.position.set(-20,10,20);
directionalLight.castShadow = true;
scene.add(directionalLight);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightHelper);

const dLightShadowHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(dLightShadowHelper);

// create 3d object
const axesHelper = new THREE.AxesHelper(20);
const gridHelper = new THREE.GridHelper(30);

const cylinderGeometry = new THREE.CylinderBufferGeometry(1, 1, 2, 12);
const CylinderMaterial = new THREE.MeshStandardMaterial({
    color: '#8bc34a',
    // wireframe: true,
});
const cylinder = new THREE.Mesh(cylinderGeometry, CylinderMaterial);
cylinder.position.x = -2;
cylinder.position.y = 1;
cylinder.castShadow = true;
cylinder.receiveShadow = true;

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#FFFFFF',
    side: THREE.DoubleSide

});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - 0.5 * Math.PI;
plane.receiveShadow = true;

// load suzanne without default material
const loader = new THREE.GLTFLoader();
var suzzane_material = new THREE.MeshStandardMaterial({
    color: '#FF0000',
    // side: THREE.DoubleSide

});
loader.load( 'suzanne.gltf', function (gltf) {
    const suzanne = gltf.scene
    suzanne.position.y = 0.3;
    suzanne.position.x = 0.3;
    suzanne.traverse(function(child){
        if (child instanceof THREE.Mesh) {
            child.material = suzzane_material;
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
	scene.add(suzanne);
}, undefined, function ( error ) {
	console.error( error );
});


// add object to scene
// scene.add(axesHelper);
scene.add(gridHelper);
scene.add(cylinder);
scene.add(plane);
scene.background = new THREE.Color('#e5e5e5');

// animate object
const animate = () => {
    requestAnimationFrame(animate);

    cylinder.rotation.x += 0.01;
    cylinder.rotation.z += 0.01;

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