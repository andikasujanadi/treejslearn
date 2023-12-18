// params
debugOrbit = false;
debugControlGui = false;
    debugCameraGui = true;
    debugLightGui = false;
debugMobileFrame = false;

// mobile frame
if(debugMobileFrame){
    container.insertAdjacentHTML('beforeend',`<div class="pe-none position-absolute top-0 start-50 translate-middle-x border border-2 border-danger" style="height:100vh; width:50vh"></div>`)
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

const cameraCutHigh1 = {
    cameraX: 0,
    cameraY: 11,
    cameraZ: 9,
    cameraLookX:0,
    cameraLookY:3.8,
    cameraLookZ:0,
}

const cameraCut1 = {
    cameraX: 2.7,
    cameraY: 2.5,
    cameraZ: 5.5,
    cameraLookX:0.7,
    cameraLookY:1,
    cameraLookZ:1.8,
}

const cameraCut2 = {
    cameraX: 6.1,
    cameraY: 1.8,
    cameraZ: 1.1,
    cameraLookX:2.9,
    cameraLookY:1.3,
    cameraLookZ:0.2,
}

const cameraCut3 = {
    cameraX: 2.9,
    cameraY: 2.1,
    cameraZ: -5.5,
    cameraLookX:0.4,
    cameraLookY:0.7,
    cameraLookZ:0.1,
}

const cameraCut4 = {
    cameraX: -3,
    cameraY: 2.4,
    cameraZ: -5.2,
    cameraLookX:0.7,
    cameraLookY:0.9,
    cameraLookZ:1.3,
}

const cameraCut5 = {
    cameraX: -5.9,
    cameraY: 2.8,
    cameraZ: 0.3,
    cameraLookX:1.3,
    cameraLookY:-0.2,
    cameraLookZ:-0.3,
}

const cameraCut6 = {
    cameraX: -3.6,
    cameraY: 2.4,
    cameraZ: 5.8,
    cameraLookX:0.4,
    cameraLookY:0.8,
    cameraLookZ:-0.3,
}

const cameraCutHigh2 = {
    cameraX: 0,
    cameraY: 15.3,
    cameraZ: 7.7,
    cameraLookX:0,
    cameraLookY:6,
    cameraLookZ:0,
}

const cameraCutRing = {
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
}, undefined, function ( error ) {});

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

let index = 0;

// scene
const scenes = [
    [screenOpener,cameraCutHigh2],
    [screenHome,cameraCutHigh1],
    [screenWelcome,cameraCut1],
    [screenGroom,cameraCut2],
    [screenBride,cameraCut3],
    [screenEvent,cameraCut4],
    [screenEvent2,cameraCut5],
    [screenEvent3,cameraCut6],
    [screenLocation,cameraCut1],
    [screenGalery,cameraCut2],
    [screenStory,cameraCut3],
    [screenQuote,cameraCut4],
    [screenWish,cameraCut5],
    [screenGift,cameraCut6],
    [screenLiveFilter,cameraCutHigh2],
    [screencloser,cameraCutRing],
]

// keyframing
camProp.cameraX = cameraCutHigh1.cameraX;
camProp.cameraY = cameraCutHigh1.cameraY;
camProp.cameraZ = cameraCutHigh1.cameraZ;

camProp.cameraLookX = cameraCutHigh1.cameraLookX;
camProp.cameraLookY = cameraCutHigh1.cameraLookY;
camProp.cameraLookZ = cameraCutHigh1.cameraLookZ;

camera.position.x = camProp.cameraX;
camera.position.y = camProp.cameraY;
camera.position.z = camProp.cameraZ;
camera.lookAt(camProp.cameraLookX,camProp.cameraLookY,camProp.cameraLookZ);

const manuverTo = (index) => {
    cameraSet = scenes[index][1];
    TweenLite.to(camProp, {
        cameraX: cameraSet.cameraX,
        cameraY: cameraSet.cameraY,
        cameraZ: cameraSet.cameraZ,
        cameraLookX: cameraSet.cameraLookX,
        cameraLookY: cameraSet.cameraLookY,
        cameraLookZ: cameraSet.cameraLookZ,
        duration:2,
        ease: "power1.inOut",
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

// data things
// can't fetch yet bruh
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    openerHost.innerHTML = data.host;
    openerReceiver.innerHTML = data.receiver;

    homeHost.innerHTML = data.host;

    welcomeHeading.innerHTML = data.content.welcome.headingText;
    welcomeText.innerHTML = data.content.welcome.welcomeText;

    groomName.innerHTML = data.content.groom.fullName;
    if(data.content.groom.father){
        groomParents.innerHTML = "Putra dari bapak "+data.content.groom.father;
    }
    if(data.content.groom.mother){
        groomParents.innerHTML += " dan ibu "+data.content.groom.mother;
    }
    if(data.content.groom.account.instagram){
        groomIg.classList.remove('d-none');
        groomIg.setAttribute('href', `https://instagram.com/${data.content.groom.account.instagram}`);
        groomIg.innerHTML += data.content.groom.account.instagram;
    }
    if(data.content.groom.account.facebook){
        groomFb.classList.remove('d-none');
        groomFb.setAttribute('href', `https://facebook.com/${data.content.groom.account.facebook}`);
        groomFb.innerHTML += data.content.groom.account.facebook;
    }
    if(data.content.groom.account.twitter){
        groomTw.classList.remove('d-none');
        groomTw.setAttribute('href', `https://twitter.com/${data.content.groom.account.twitter}`);
        groomTw.innerHTML += data.content.groom.account.twitter;
    }

    brideName.innerHTML = data.content.bride.fullName;
    if(data.content.bride.father){
        brideParents.innerHTML = "Putri dari bapak "+data.content.bride.father;
    }
    if(data.content.bride.mother){
        brideParents.innerHTML += " dan ibu "+data.content.bride.mother;
    }
    if(data.content.bride.account.instagram){
        brideIg.classList.remove('d-none');
        brideIg.setAttribute('href', `https://instagram.com/${data.content.bride.account.instagram}`);
        brideIg.innerHTML += data.content.bride.account.instagram;
    }
    if(data.content.bride.account.facebook){
        brideFb.classList.remove('d-none');
        brideFb.setAttribute('href', `https://facebook.com/${data.content.bride.account.facebook}`);
        brideFb.innerHTML += data.content.bride.account.facebook;
    }
    if(data.content.bride.account.twitter){
        brideTw.classList.remove('d-none');
        brideTw.setAttribute('href', `https://twitter.com/${data.content.bride.account.twitter}`);
        brideTw.innerHTML += data.content.bride.account.twitter;
    }

    
    })
  .catch(error => console.log(error));

// leaflet map
// geo:-6.17540,106.82683?z=19
const openMap = () => {
    var map = L.map('map').setView([-6.17553,106.82712], 19);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

// navigation
const goTo = (index) => {
    try {
        containerCard.querySelector('div').classList.remove('opacity-100');
    } catch (error) {
        
    }
    setTimeout(() => {
        containerCard.innerHTML = scenes[index][0].outerHTML
        setTimeout(() => {
            containerCard.querySelector('div').classList.add('opacity-100');
        }, 50);
    }, 500);
    manuverTo(index)
}

const openInvitation = (newIndex) => {
    containerCard.classList.remove('card-full');
    index = 1;
    if(newIndex == undefined){
    }
    else{
        index = newIndex;
    }
    goTo(index);
}
goTo(0);

const cardExpand = () => {
    containerCard.classList.add('card-full');
}

const cardMinimize = () => {
    containerCard.classList.remove('card-full');
}

const cardToggle = () => {
    containerCard.classList.toggle('card-full');
}

let touchstartY = 0
let touchendY = 0
let finishTouch = true;

const goToRelative = (newIndex) => {
    oldIndex = index
    index += newIndex;
    checkIndex();
    if(index!=oldIndex){
        goTo(index);
    }
}

const checkIndex = () => {
    if(index == 8){
        setTimeout(() => {
            openMap();
        }, 1000);
    }
    if(index<1){
        index = 1;
    }
    else if(index>=scenes.length){
        index=scenes.length-1
    }
}

// swipe control
function checkDirection() {
    const treshold = 100;
    if (touchendY+treshold < touchstartY){
        // swipe up
        goToRelative(1);
        finishTouch=false;
    }
    if (touchendY-treshold > touchstartY){
        // swipe down
        goToRelative(-1);
        finishTouch=false;
    }
}

threeContainer.addEventListener('touchstart', e => {
  touchstartY = e.changedTouches[0].screenY;
})

threeContainer.addEventListener('touchmove', e => {
  touchendY = e.changedTouches[0].screenY;
  if(finishTouch && index!=0){
      checkDirection()
  }
})

threeContainer.addEventListener('touchend', e => {
    finishTouch = true;
})

// scroll control
let scrolltemp = 0;
let firstTriggerScroll = true;
threeContainer.addEventListener("wheel", function (e) {
    const stunt = 500;
    const treshold = 100;
    if(firstTriggerScroll){
        firstTriggerScroll = false;
        setTimeout(() => {
            firstTriggerScroll = true;
            scrolltemp = 0;
        }, stunt);
    }
    if(finishTouch && index!=0){
        var scrollVal = parseInt(e.deltaY);
        scrolltemp+=scrollVal;
        if(scrolltemp>treshold){
            scrolltemp = 0;
            goToRelative(1);
            finishTouch = false;
            setTimeout(() => {
                finishTouch = true;
            }, stunt);
        }
        if(scrolltemp<-treshold){
            scrolltemp = 0;
            goToRelative(-1);
            finishTouch = false;
            setTimeout(() => {
                finishTouch = true;
            }, stunt);
        }
    }
});

// fslightbox
var lightbox = new FsLightbox();
lightbox.props.sources = [
    "https://res.cloudinary.com/tpq-mis/image/upload/v1700529268/yukdatang-main/images/wedding-rings-with-ornaments_vn7qet.jpg",
    "https://res.cloudinary.com/tpq-mis/image/upload/v1700529264/yukdatang-main/images/wedding-invitation-card_a74n8w.jpg",
    "https://res.cloudinary.com/tpq-mis/image/upload/v1697359853/yukdatang-main/images/wedding-rings-made-white-gold-lie-cloth-flower_soqu6n.jpg",
    "https://res.cloudinary.com/tpq-mis/image/upload/v1697359722/yukdatang-main/images/golden-wedding-rings-white-rose-from-wedding-bouquet_u9c9yv.jpg",
    "https://res.cloudinary.com/tpq-mis/image/upload/v1697351503/yukdatang-main/images/top-view-wedding-rings-with-flowers-table_1_llwuts.jpg",
    "https://res.cloudinary.com/tpq-mis/image/upload/v1697351500/yukdatang-main/images/two-gold-wedding-ring-white-background_n5e5mb.jpg",
];

const openGallery = (i) => {
    lightbox.open(i);
}

openInvitation(6);