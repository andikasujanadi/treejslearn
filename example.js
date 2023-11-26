// template data
const options = {
    dirLight: '#FFFFFF',
    ambLight: '#A5A5A5',
}

const cameraOption = {
    cameraX: 0.1,
    cameraY: 8.0,
    cameraZ: 4.5,
    cameraLookX:0.1,
    cameraLookY:-1.0,
    CameraLookZ:0.1,
}

const cameraCut1 = {
    cameraX: 0,
    cameraY: 8,
    cameraZ: 4.5,
    cameraRotationX:-1.1071487177940904,
    cameraRotationY:0,
    CameraRotationZ:0,
}

const cameraCut2 = {
    cameraX: 0,
    cameraY: 2.5,
    cameraZ: 4.5,
    cameraRotationX:-0.32175055439664224,
    cameraRotationY:0,
    CameraRotationZ:0,
}

const cameraCut3 = {
    cameraX: 2.3,
    cameraY: 2.5,
    cameraZ: 3.8,
    cameraRotationX:-1.1136189251769462,
    cameraRotationY:0.49956010330636486,
    CameraRotationZ:0.7721146406652785,
}

const cameraCut4 = {
    cameraX: 3.9,
    cameraY: 3.0,
    cameraZ: 1.8,
    cameraRotationX:-1.2610670403004278,
    cameraRotationY:0.5507373140124942,
    CameraRotationZ:1.0219339106944585,
}

const cameraCut5 = {
    cameraX: 4.5,
    cameraY: 3.1,
    cameraZ: -3.7,
    cameraRotationX:-2.3075552143175866,
    cameraRotationY:0.4822415270203947,
    CameraRotationZ:2.669004141505082,
}

const cameraCut6 = {
    cameraX: -2,
    cameraY: 3.6,
    cameraZ: -4.5,
    cameraRotationX:-1.9723641818256934,
    cameraRotationY:0.45683107579898935,
    CameraRotationZ:-2.3371799539275013,
}

// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#e5e5e5');

// create camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = cameraOption.cameraX
camera.position.y = cameraOption.cameraY
camera.position.z = cameraOption.cameraZ
camera.lookAt(cameraOption.cameraLookX,cameraOption.cameraLookY,cameraOption.CameraLookZ);

// render scene
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled  = true;
renderer.shadowMap.type  = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
threeContainer.appendChild(renderer.domElement);

// create camera orbit
const orbit = new THREE.OrbitControls(camera, renderer.domElement)
orbit.update;

// add light
const ambientLight = new THREE.AmbientLight(0xA5A5A5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.set(3,10,3);
directionalLight.castShadow = true;
directionalLight.shadow.bias = -0.0002;
scene.add(directionalLight);

// load model
const loader = new THREE.GLTFLoader();
var suzzane_material = new THREE.MeshStandardMaterial();
var suzanne;
loader.load( 'ring.glb', function (gltf) {
    suzanne = gltf.scene
    suzanne.traverse(function(child){
        if (child instanceof THREE.Mesh) {
            // child.material = suzzane_material;
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
	scene.add(suzanne);
}, undefined, function ( error ) {
	console.error( error );
});

// animate object
const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

// add dat gui
const centerCamera = () =>{
    camera.lookAt(cameraOption.cameraLookX,cameraOption.cameraLookY,cameraOption.CameraLookZ);
}
const gui = new dat.GUI();
gui.addColor(options, 'dirLight').onChange(function(e){
    directionalLight.color.set(e);
    centerCamera();
});
gui.addColor(options, 'ambLight').onChange(function(e){
    ambientLight.color.set(e);
    centerCamera();
});
gui.add(cameraOption, 'cameraX').onChange(function(e){
    camera.position.x = e;
    centerCamera();
});
gui.add(cameraOption, 'cameraY').onChange(function(e){
    camera.position.y = e;
    centerCamera();
});
gui.add(cameraOption, 'cameraZ').onChange(function(e){
    camera.position.z = e;
    centerCamera();
});
gui.add(cameraOption, 'cameraLookX').onChange(function(e){
    camera.lookAt.x = e;
    centerCamera();
});
gui.add(cameraOption, 'cameraLookY').onChange(function(e){
    camera.lookAt.y = e;
    centerCamera();
});
gui.add(cameraOption, 'CameraLookZ').onChange(function(e){
    camera.lookAt.z = e;
    centerCamera();
});

// responsive canvas
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// scroll
window.onscroll = function() {
    var scrollPosition = window.scrollY;
    suzanne.rotation.y=-scrollPosition/500;
};

// GSAP testing
window.addEventListener('mousedown', () => {
    
});

const cameras = [
    cameraCut1,
    cameraCut2,
    cameraCut3,
    cameraCut4,
    cameraCut5,
    cameraCut6,
]

index = 0;

const next = () => {
    const angle = cameras[index];
    index+=1;
    if(index>=cameras.length){
        index = 0
    }
    gsap.to(camera.position, {
        x:angle.cameraX,
        y:angle.cameraY,
        z:angle.cameraZ,
        duration:1.5,
        onUpdate: () =>{
            // camera.lookAt(angle.cameraLookX,angle.cameraLookY,angle.CameraLookZ);
        }
    });

    gsap.to(camera.rotation, {
        x:angle.cameraRotationX,
        y:angle.cameraRotationY,
        z:angle.CameraRotationZ,
        duration:1.5,
    });
}

// call animate to display
animate();