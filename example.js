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
    cameraLookZ:0.1,
}

const camProp = {
    cameraX: 0.1,
    cameraY: 8.0,
    cameraZ: 4.5,
    cameraLookX:0.1,
    cameraLookY:-1.0,
    cameraLookZ:0.1,
}

const cameraCut1 = {
    cameraX: 0,
    cameraY: 8,
    cameraZ: 4.5,
    cameraLookX:0.1,
    cameraLookY:-1.0,
    cameraLookZ:0.1,
}

const cameraCut2 = {
    cameraX: 1.7,
    cameraY: 2.5,
    cameraZ: 4.3,
    cameraLookX:0.57,
    cameraLookY:0.6,
    cameraLookZ:2.5,
}

const cameraCut3 = {
    cameraX: 2.64,
    cameraY: 1.8,
    cameraZ: -3.8,
    cameraLookX:2.12,
    cameraLookY:0.6,
    cameraLookZ:-2.2,
}

const cameraCut4 = {
    cameraX: 3.9,
    cameraY: 3.0,
    cameraZ: 1.8,
    cameraLookX:0.57,
    cameraLookY:0.6,
    cameraLookZ:2.5,
}

const cameraCut5 = {
    cameraX: 4.5,
    cameraY: 3.1,
    cameraZ: -3.7,
    cameraLookX:0.57,
    cameraLookY:0.6,
    cameraLookZ:2.5,
}

const cameraCut6 = {
    cameraX: -0.8068846865833008,
    cameraY: 2.6521796457250355,
    cameraZ: -3.782608039318661,
    cameraLookX:0.57,
    cameraLookY:0.6,
    cameraLookZ:2.5,
}

// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#e5e5e5');

// create camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = cameraOption.cameraX
camera.position.y = cameraOption.cameraY
camera.position.z = cameraOption.cameraZ
camera.lookAt(cameraOption.cameraLookX,cameraOption.cameraLookY,cameraOption.cameraLookZ);

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
    camera.lookAt(cameraOption.cameraLookX,cameraOption.cameraLookY,cameraOption.cameraLookZ);
}
const cameraGui = new dat.GUI({autoPlace: true});
const lightGui = new dat.GUI({autoPlace: false});
document.querySelector('.dg.ac').style.top="200px";
lightGui.addColor(options, 'dirLight').onChange(function(e){
    directionalLight.color.set(e);
    centerCamera();
});
lightGui.addColor(options, 'ambLight').onChange(function(e){
    ambientLight.color.set(e);
    centerCamera();
});
cameraGui.add(cameraOption, 'cameraX').onChange(function(e){
    camera.position.x = e;
    centerCamera();
});
cameraGui.add(cameraOption, 'cameraY').onChange(function(e){
    camera.position.y = e;
    centerCamera();
});
cameraGui.add(cameraOption, 'cameraZ').onChange(function(e){
    camera.position.z = e;
    centerCamera();
});
cameraGui.add(cameraOption, 'cameraLookX').onChange(function(e){
    camera.lookAt.x = e;
    centerCamera();
});
cameraGui.add(cameraOption, 'cameraLookY').onChange(function(e){
    camera.lookAt.y = e;
    centerCamera();
});
cameraGui.add(cameraOption, 'cameraLookZ').onChange(function(e){
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
    // cameraCut4,
    // cameraCut5,
    // cameraCut6,
]

index = 1;

function getProgress () {
    var currProgress = this.progress();
    return currProgress
}

const next = () => {
    const cameraSet = cameras[index];
    index+=1;
    if(index>=cameras.length){
        index = 0
    }
    TweenLite.to(camProp, {
        cameraX: cameraSet.cameraX,
        cameraY: cameraSet.cameraY,
        cameraZ: cameraSet.cameraZ,
        cameraLookX: cameraSet.cameraLookX,
        cameraLookY: cameraSet.cameraLookY,
        cameraLookZ: cameraSet.cameraLookZ,
        duration:1,
        onUpdate: () => {
            camera.position.x = camProp.cameraX
            camera.position.y = camProp.cameraY
            camera.position.z = camProp.cameraZ
            camera.lookAt(camProp.cameraLookX,camProp.cameraLookY,camProp.cameraLookZ);
        }
    });
}

// call animate to display
animate();