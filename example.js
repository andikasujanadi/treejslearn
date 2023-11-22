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
cylinder.position.y = 4;

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: '#FFFFFF',
    side: THREE.DoubleSide

});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = - 0.5 * Math.PI;

// load suzanne without default material
const loader = new THREE.GLTFLoader();
var suzzane_material = new THREE.MeshBasicMaterial({
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
        }
    } );
	scene.add(suzanne);
}, undefined, function ( error ) {
	console.error( error );
} );



// add object to scene
scene.add(axesHelper);
scene.add(gridHelper);
scene.add(cylinder);
scene.add(plane);
scene.background = new THREE.Color('#e5e5e5');

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