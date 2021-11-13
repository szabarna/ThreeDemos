import * as THREE from "./three.js-r134-min/build/three.module.js";
import { TrackballControls } from './three.js-r134-min/examples/jsm/controls/TrackballControls.js';


// import Stats from './three.js-r134-min/examples/jsm/libs/stats.module.js';
// import { GUI } from './three.js-r134-min/examples/jsm/libs/dat.gui.module.js';

// global variables
var WIDTH, HEIGHT, aspectRatio;
var renderer;
var scene, camera;
var controls;
var material, circlePlaneMaterial, planematerial2, planematerial3, planematerial4;
var geometry, circlePlaneGeometry, planeGeometry2, planeGeometry3, planeGeometry4;
var mesh, circlePlane, plane2, plane3, plane4;
var light, ambientLight, pointLight;
var spotLightHelper;
var gui;
var percent;
var scrollHeight;
var tl, tl2, tl3, tl4;
var count;
var planeGroup, planeGroup2;

init();
animate();
function init() {

    // height, width of monitor
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    aspectRatio = WIDTH / HEIGHT;

    // renderer
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( WIDTH, HEIGHT );
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    // scene

    scene = new THREE.Scene();

    // Camera and its position
    camera = new THREE.PerspectiveCamera( 60, aspectRatio, 0.1, 3000 );
    controls = new TrackballControls( camera, renderer.domElement );
    camera.lookAt( scene.position );
    controls.rotateSpeed = 5.0;
    controls.panSpeed = 1.0;
    scrollHeight = document.documentElement.scrollHeight - 586;
    percent = window.scrollY / (scrollHeight * 0.01);
    controls.update();
    camera.position.z = 30;
    
    //loader
   
    // geometries

    geometry = new THREE.SphereGeometry(4, 32, 32);
    circlePlaneGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    planeGeometry2 = new THREE.PlaneGeometry(100, 100, 50, 50);
    planeGeometry3 = new THREE.PlaneGeometry(100, 100, 50, 50);
    planeGeometry4 = new THREE.PlaneGeometry(100, 100, 50, 50);

    // materials

    material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./src/abstractSphere.jpeg") });
    circlePlaneMaterial = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("./src/abstract.jpg"), side: THREE.DoubleSide, flatShading: THREE.FlatShading });
                                                        // ,  flatShading: THREE.FlatShading
    planematerial2 = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("./src/abstract.jpg"), side: THREE.DoubleSide, flatShading: THREE.FlatShading });
    planematerial3 = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("./src/abstract.jpg"), side: THREE.DoubleSide, flatShading: THREE.FlatShading });
    planematerial4 = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("./src/abstract.jpg"), side: THREE.DoubleSide, flatShading: THREE.FlatShading });

    // meshes

        // main cube mesh
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.y = -20;
        //x = 10
        mesh.position.x = 0;
        mesh.rotation.x += Math.PI * 0.075;
        mesh.rotation.z += Math.PI * -0.007;
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        mesh.rotation.set(0, 0, 0);
        
    //mesh.rotation.z += Math.PI * -0.02;
    
        // circlePlaneMesh
        circlePlane = new THREE.Mesh( circlePlaneGeometry, circlePlaneMaterial );
        circlePlane.position.x = 0;
        circlePlane.position.y = -30;
        circlePlane.receiveShadow = true;
        circlePlane.castShadow = false;
        circlePlane.rotation.set(Math.PI * 1.5, 0, 0);

        // plane2 right
        plane2 = new THREE.Mesh( planeGeometry2, planematerial2 );
        plane2.position.x = 50;
        plane2.position.y = -10;
        plane2.receiveShadow = true;
        plane2.castShadow = false;
        plane2.rotation.set(Math.PI * 1.5, Math.PI * 1.5, 0);


        // plane3 left
        plane3 = new THREE.Mesh( planeGeometry3, planematerial3 );
        plane3.position.x = -50;
        plane3.position.y = -10;
        plane3.receiveShadow = true;
        plane3.castShadow = false;
        plane3.rotation.set(Math.PI * 1.5, Math.PI * 1.5, 0);

        // plane4 top
        plane4 = new THREE.Mesh( planeGeometry4, planematerial4 );
        plane4.position.x = 0;
        plane4.position.y = 30;
        plane4.receiveShadow = true;
        plane4.castShadow = false;
        plane4.rotation.set(Math.PI * 1.5, 0, 0);


    const planeArray = circlePlane.geometry.attributes.position.array;
    const meshArray = mesh.geometry.attributes.position.array;
    let beginArray = [];
    let newArray = [];

         count = circlePlane.geometry.attributes.position.count;

    for(let i = 0; i < planeArray.length; i += 3) {

        const x = planeArray[i];
        const y = planeArray[i + 1];
        const z = planeArray[i + 2];

        newArray[i] = x;
        newArray[i + 1] = y;
        beginArray[i] = x;
        beginArray[i + 1] = y;
        beginArray[i + 2] = 1;
        
        
            
          newArray[i + 2] = z + Math.random() * 5.55;
        
        
        
    }
    console.log(planeArray.length)

    tl4 = new gsap.timeline();

        tl4.to([
            circlePlane.geometry.attributes.position.array,
            plane2.geometry.attributes.position.array,
            plane3.geometry.attributes.position.array,
            plane4.geometry.attributes.position.array
            
        ],  {
            endArray: newArray,
            duration: 3,
            ease: "back",
            // Make sure to tell it to update
            onUpdate: updateArray,

          });

    function updateArray () {
        circlePlane.geometry.attributes.position.needsUpdate = true;
        plane2.geometry.attributes.position.needsUpdate = true
        plane3.geometry.attributes.position.needsUpdate = true
        plane4.geometry.attributes.position.needsUpdate = true
    }
    /*
          tl4.to(circlePlane.geometry.attributes.position.array, {
            endArray: beginArray,
            delay: 0.5,
            duration: 3,
            ease: "back",
            // Make sure to tell it to update
            onUpdate: () => circlePlane.geometry.attributes.position.needsUpdate = true
          });
   

*/
   // console.log(circlePlane.geometry.attributes.position.array)

    // lights

    light = new THREE.SpotLight(0xffffff, 1);
    light.position.set( 0, 30, 0 );
    light.angle = Math.PI / 3;
    light.target = mesh;
    light.penumbra = 0.8;
    light.distance = 500;
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    ambientLight.position.set( 10, 50, 0 );

    
    spotLightHelper = new THREE.SpotLightHelper(light);
    
    pointLight = new THREE.PointLight( 0xffffff, 1);
    pointLight.position.set(0, -20, 0);
    // scene.add
    scene.add( mesh );
    
    scene.add( plane2 );
    scene.add( plane3 );
    scene.add( plane4 );
    scene.add( circlePlane );
   
    //scene.add( light );
   // scene.add( spotLightHelper );
    scene.add( ambientLight );
    scene.add( pointLight );
   
    
    window.addEventListener( 'resize', handleWindowResize, false );
}
    camera.position.set(0, 11.510679823749568, 54.86135913947847);
    camera.rotation.set(-0.019840756482754986, -0.047831050376982785, -0.0009487666218358663);
    // -2.484171946449548, 11.510679823749568, 54.86135913947847
   // -0.019840756482754986, -0.047831050376982785, -0.0009487666218358663
   
/*  
document.addEventListener('scroll', function () {
        
     percent = window.scrollY / (scrollHeight * 0.01);
            
          
            if(percent >= 0 && percent <= 100) {

                    geometry = new THREE.TetrahedronGeometry(10, parseInt(percent));
                    scene.remove( mesh );
                    mesh = new THREE.Mesh( geometry, material );
                    scene.add( mesh );
                    mesh.rotation.x = ((Math.PI * 2) * 0.01) * percent;
                    mesh.rotation.y = ((Math.PI * 2) * 0.01) * percent;  
            }
           
           
     
       
});
 */
//  main text animation

let text = document.getElementById("headline1");
let strText = text.textContent;
let splitText = strText.split("");

let text2 = document.getElementById("headline2");
let strText2 = text2.textContent;
let splitText2 = strText2.split("");

let text3 = document.getElementById("headline3");
let strText3 = text3.textContent;
let splitText3 = strText3.split("");

let span, span2, span3;
text.textContent = "";
text2.textContent = "";
text3.textContent = "";

   for(let i = 0; i < splitText.length; i++) {

    text.innerHTML += "<span>" + splitText[i] + " "  + "</span>";
       
          
   }
   for(let i = 0; i < splitText2.length; i++) {
    text2.innerHTML += "<span>" + splitText2[i]  + "</span>";
     
    }
    for(let i = 0; i < splitText3.length; i++) {
    text3.innerHTML += "<span>" + splitText3[i]  + "</span>";
        
    }

   let char = 0;
   let spans = document.querySelectorAll('span');
     let timer = setInterval(onTick, 50);
   

   function onTick() {

        span = text.querySelectorAll('span')[char];
        span.classList.add('letter');
        
       
       
       char++;
       if(char == splitText.length) {
            complete();
            return;
       }
   }

   function complete() {
       clearInterval(timer);
       timer = null;
   }

   
   
   
   for(let i = 0; i < spans.length; i++) {
        spans[i].addEventListener("mouseenter", function(e){
            /*
            anime({
                targets: spans[i],
                scale: 2,
                duration: 1000,
                elasticity: 1000
            });
            */
            gsap.to(spans[i], { scale: 2.5, duration: 1, ease: "elastic"});

        spans[i].addEventListener("mouseleave", function(e){
            
           /* anime({
                targets: spans[i],
                scale: 1,
                duration: 1000,
                elasticity: 1000
            });   
            */
           gsap.to(spans[i], { scale: 1, duration: 1, ease: "elastic"});
        });
         
    });
}
    tl = gsap.timeline();
    // main text1
    text.addEventListener("click", function() {
           
            console.log(tl.isActive());
            console.log(tl2.isActive());
            if(!tl.isActive()) {
            tl.to(mesh.position, { duration: 4, y: "+=5", ease: "back"});
            tl.to(mesh.scale, { duration: 2, x: 0.75, y: 0.75, z: 0.75, ease: "elastic"});
            tl.to(mesh.scale, { duration: 2, x: 1.5, y: 1.5, z: 1.5, ease: "back"});
            tl.to(mesh.scale, { duration: 2, x: 0.75, y: 0.75, z: 0.75, ease: "elastic"});
            tl.to(mesh.position, { duration: 4, x: "+=5", ease: "back"});
            tl.to(mesh.position, { duration: 4, x: "-=10", ease: "back"});
            tl.to(mesh.position, { duration: 4, x: "+=5", ease: "elastic"});
            
            // current position mesh x: 4.218174, y: -0.942991, z: 0
        }
    });
    // main text2
        text2.addEventListener("click", function() {

            if(!tl.isActive()) {
            tl.to(mesh.position, { duration: 4, y: "+=5", ease: "back"});
            tl.to(mesh.scale, { duration: 2, x: 0.75, y: 0.75, z: 0.75, ease: "elastic"});
            tl.to(mesh.scale, { duration: 2, x: 1.5, y: 1.5, z: 1.5, ease: "back"});
            tl.to(mesh.scale, { duration: 2, x: 0.75, y: 0.75, z: 0.75, ease: "elastic"});
            tl.to(mesh.position, { duration: 4, x: "+=5", ease: "back"});
            tl.to(mesh.position, { duration: 4, x: "-=10", ease: "back"});
            tl.to(mesh.position, { duration: 4, x: "+=5", ease: "elastic"});
         }
    });  
    // main text3
        text3.addEventListener("click", function() {
            if(!tl.isActive()) {
            tl.to(mesh.position, { duration: 4, y: "+=5", ease: "back"});
            tl.to(mesh.scale, { duration: 2, x: 0.75, y: 0.75, z: 0.75, ease: "elastic"});
            tl.to(mesh.scale, { duration: 2, x: 1.5, y: 1.5, z: 1.5, ease: "back"});
            tl.to(mesh.scale, { duration: 2, x: 0.75, y: 0.75, z: 0.75, ease: "elastic"});
            tl.to(mesh.position, { duration: 4, x: "+=5", ease: "back"});
            tl.to(mesh.position, { duration: 4, x: "-=10", ease: "back"});
            tl.to(mesh.position, { duration: 4, x: "+=5", ease: "elastic"});
        }
});    

    spotLightHelper.update();

    
    
  

    //  GUI
/*
gui = new GUI();
const cubeFolder = gui.addFolder('Cube');
cubeFolder.add(mesh.position, 'x', -100, 100);
cubeFolder.add(mesh.position, 'y', -100, 100);
cubeFolder.add(mesh.position, 'z', -100, 100);
cubeFolder.open();
const stats = Stats();
document.body.appendChild(stats.dom);

*/

 




function handleWindowResize() {
    // Az ablak átméretezése esetén a kamera vetítési paraméterek újraszámolása
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    console.log( 'WIDTH=' + WIDTH + '; HEIGHT=' + HEIGHT );
    renderer.setSize( WIDTH, HEIGHT );
    aspectRatio = WIDTH / HEIGHT;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    render();
}



 
function animate() {
    requestAnimationFrame( animate );
    
    const now = Date.now() / 1500;
    for(let i = 0; i < count; i++) {

        const x = circlePlane.geometry.attributes.position.getX(i);
        const y = circlePlane.geometry.attributes.position.getY(i);
        const xsin = Math.sin(x + now);
        const ycos = Math.cos(y + now);
        circlePlane.geometry.attributes.position.setZ(i, xsin + ycos);
        plane2.geometry.attributes.position.setZ(i, xsin + ycos);
        plane3.geometry.attributes.position.setZ(i, xsin + ycos);
        plane4.geometry.attributes.position.setZ(i, xsin + ycos);
        
    }
    circlePlane.geometry.attributes.position.needsUpdate = true;
    circlePlane.geometry.computeVertexNormals();

    plane2.geometry.attributes.position.needsUpdate = true;
    plane2.geometry.computeVertexNormals();
    
    plane3.geometry.attributes.position.needsUpdate = true;
    plane3.geometry.computeVertexNormals();
    
    plane4.geometry.attributes.position.needsUpdate = true;
    plane4.geometry.computeVertexNormals();
    
    
    mesh.rotation.y += 0.01;
    
    controls.update();
    render();

   
}


function render() {
    renderer.render( scene, camera );
}
    for(let i = 0; i < spans.length; i++) {
        if(spans[i].innerText.length == 0) {
            spans[i].classList.add("whitespace");
        }
    }
    //     GSAP
gsap.to("h1", {duration: 2, y: 500, padding: "10px", ease: "back"});
gsap.to("span", {duration: 2});

tl2 = new gsap.timeline();
tl2.to(mesh.position, { y: 0, duration: 3, ease: "back"});

    setInterval(function() {
            tl3 = new gsap.timeline();
            if(!tl2.isActive()){
            tl3.to(mesh.position, {  y: 1, duration: 2,   ease: Sine. easeInOut});
            tl3.to(mesh.position, { y: -1, duration: 2, ease: Sine. easeInOut});
            tl3.to(mesh.position, { y: 1, duration: 2, ease: Sine. easeInOut});
        }
    }, 4025);

const headline1 = document.getElementById("headline1");
const headline2 = document.getElementById("headline2");
const headline3 = document.getElementById("headline3");
gsap.to(headline1, { duration: 2, right: "0px", ease: "back"});
gsap.to(headline2, { delay: 0.2, duration: 2, right: "0px", ease: "back"}); 
gsap.to(headline3, { delay: 0.4, duration: 2, right: "0px", ease: "back", paddingRight: "0px"});


// h1 main mouseover animation
let headlines = [];
for(let i = 1; i <= 3; i++) {
    headlines.push(document.getElementById(`headline${i}`));
}


for(let i = 0; i < headlines.length; i++) {
        gsap.to(headlines[i], { duration: 0.1, opacity: 0.35});
        headlines[i].addEventListener("mouseover", function() {
            gsap.to(headlines[i], { duration: 0.4, backgroundColor: "red", opacity: 1});
        });
        headlines[i].addEventListener("mouseleave", function() {
            gsap.to(headlines[i], { duration: 0.4, backgroundColor: "transparent", opacity: 0.35});
        });
}


