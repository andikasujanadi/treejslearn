// params
debugOrbit = false;
debugControlGui = true;
 debugCameraGui = true;
 debugLightGui = false;
debugMobileFrame = true;

// mobile frame
if(debugMobileFrame){
    container.insertAdjacentHTML('beforeend',`<div class="position-absolute top-0 start-50 translate-middle-x border border-2 border-danger" style="height:100vh; width:50vh"></div>`)
}

// template data
const options = {
    dirLight: '#FFFFFF',
    ambLight: '#A5A5A5',
}

const cameraOption = {
    cameraX: 1.0,
    cameraY: 8.1,
    cameraZ: 4.5,
    cameraLookX:1.0,
    cameraLookY:-1.0,
    cameraLookZ:1.0,
}

let camProp = {
    cameraX: 0.1,
    cameraY: 8.0,
    cameraZ: 4.5,
    cameraLookX:0.1,
    cameraLookY:-1.0,
    cameraLookZ:0.1,
}

const cameraCut1 = {
    cameraX: 0,
    cameraY: 11,
    cameraZ: 9,
    cameraLookX:0,
    cameraLookY:3.8,
    cameraLookZ:0,
}

const cameraCut2 = {
    cameraX: 2.7,
    cameraY: 2.5,
    cameraZ: 5.5,
    cameraLookX:0.7,
    cameraLookY:1,
    cameraLookZ:1.8,
}

const cameraCut3 = {
    cameraX: 6.1,
    cameraY: 1.8,
    cameraZ: 1.1,
    cameraLookX:2.9,
    cameraLookY:1.3,
    cameraLookZ:0.2,
}

const cameraCut4 = {
    cameraX: 2.9,
    cameraY: 2.1,
    cameraZ: -5.5,
    cameraLookX:0.4,
    cameraLookY:0.7,
    cameraLookZ:0.1,
}

const cameraCut5 = {
    cameraX: -3,
    cameraY: 2.4,
    cameraZ: -5.2,
    cameraLookX:0.7,
    cameraLookY:0.9,
    cameraLookZ:1.3,
}

const cameraCut6 = {
    cameraX: -5.9,
    cameraY: 2.8,
    cameraZ: 0.3,
    cameraLookX:1.3,
    cameraLookY:-0.2,
    cameraLookZ:-0.3,
}

const cameraCut7 = {
    cameraX: -3.6,
    cameraY: 2.4,
    cameraZ: 5.8,
    cameraLookX:0.4,
    cameraLookY:0.8,
    cameraLookZ:-0.3,
}

const cameraCut8 = {
    cameraX: 0,
    cameraY: 15.3,
    cameraZ: 7.7,
    cameraLookX:0,
    cameraLookY:6,
    cameraLookZ:0,
}

const cameraCut9 = {
    cameraX: 0,
    cameraY: 1.6,
    cameraZ: 1.5,
    cameraLookX:0,
    cameraLookY:1.6,
    cameraLookZ:0,
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
if(debugOrbit){
    const orbit = new THREE.OrbitControls(camera, renderer.domElement)
    orbit.update;
}

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
if(debugControlGui){
    const centerCamera = () =>{
        camera.lookAt(cameraOption.cameraLookX,cameraOption.cameraLookY,cameraOption.cameraLookZ);
    }
    const cameraGui = new dat.GUI({autoPlace: debugCameraGui});
    const lightGui = new dat.GUI({autoPlace: debugLightGui});
    try {document.querySelector('.dg.ac').style.top="200px";} catch (error) {}
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
}

// responsive canvas
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// scroll
// window.onscroll = function() {
//     var scrollPosition = window.scrollY;
//     suzanne.rotation.y=-scrollPosition/500;
// };

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
    cameraCut7,
    cameraCut8,
    cameraCut9,
]

// keyframing
camProp.cameraX = cameraCut1.cameraX;
camProp.cameraY = cameraCut1.cameraY;
camProp.cameraZ = cameraCut1.cameraZ;

camProp.cameraLookX = cameraCut1.cameraLookX;
camProp.cameraLookY = cameraCut1.cameraLookY;
camProp.cameraLookZ = cameraCut1.cameraLookZ;

camera.position.x = camProp.cameraX;
camera.position.y = camProp.cameraY;
camera.position.z = camProp.cameraZ;
camera.lookAt(camProp.cameraLookX,camProp.cameraLookY,camProp.cameraLookZ);

index = 1;
const next = () => {
    cameraSet = cameras[index];
    console.log(index)
    TweenLite.to(camProp, {
        cameraX: cameraSet.cameraX,
        cameraY: cameraSet.cameraY,
        cameraZ: cameraSet.cameraZ,
        cameraLookX: cameraSet.cameraLookX,
        cameraLookY: cameraSet.cameraLookY,
        cameraLookZ: cameraSet.cameraLookZ,
        duration:1,
        ease: "power1.inOut",
        onUpdate: () => {
            camera.position.x = camProp.cameraX
            camera.position.y = camProp.cameraY
            camera.position.z = camProp.cameraZ
            camera.lookAt(camProp.cameraLookX,camProp.cameraLookY,camProp.cameraLookZ);
        }
    });
    index+=1;
    if(index>=cameras.length){
        index = 0
    }
}

// call animate to display
animate();