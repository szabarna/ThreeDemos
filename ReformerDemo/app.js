import * as THREE from "./three.js-r134-min/build/three.module.js";
import { TrackballControls } from './three.js-r134-min/examples/jsm/controls/TrackballControls.js';
// import Stats from './three.js-r134-min/examples/jsm/libs/stats.module.js';
// import { GUI } from './three.js-r134-min/examples/jsm/libs/dat.gui.module.js';

// global variables
var WIDTH, HEIGHT, aspectRatio;
var renderer;
var scene, camera;
var controls;
var material, circlePlaneMaterial;
var geometry, circlePlaneGeometry;
var mesh, circlePlane;
var color;
var loader;
var light, ambientLight, pointLight;
var spotLightHelper;
var gui;
var percent;
var scrollHeight;
var tl, tl2, tl3, tl4;


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
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    // scene

    scene = new THREE.Scene();

    // Camera and its position
    camera = new THREE.PerspectiveCamera( 60, aspectRatio, 0.1, 3000 );
   // controls = new TrackballControls( camera, renderer.domElement );
    camera.lookAt( scene.position );
   // controls.rotateSpeed = 5.0;
   // controls.panSpeed = 1.0;
    scrollHeight = document.documentElement.scrollHeight - 586;
    percent = window.scrollY / (scrollHeight * 0.01);
   // controls.update();
    camera.position.z = 30;
    
    //loader
   
    // geometries
    geometry = new THREE.SphereGeometry(4);
    circlePlaneGeometry = new THREE.CircleGeometry(500, 30);

    // materials
    material =  new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("./src/sphereTexture.jpg"), side: THREE.DoubleSide});
    circlePlaneMaterial = new THREE.MeshPhongMaterial({map: new THREE.TextureLoader().load("./src/circleTexture.jpg"), side: THREE.DoubleSide, wireframe: true});
    // meshes

        // main cube mesh
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.y = -20;
        mesh.position.x = 10;
        mesh.rotation.x += Math.PI * 0.075;
        mesh.rotation.z += Math.PI * -0.007;
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        mesh.rotation.set(0, 0, 0);
        
    //mesh.rotation.z += Math.PI * -0.02;
    
        // circlePlaneMesh
        circlePlane = new THREE.Mesh( circlePlaneGeometry, circlePlaneMaterial );
        circlePlane.position.x = 10;
        circlePlane.position.y = -10;
        circlePlane.receiveShadow = true;
        circlePlane.castShadow = false;
        circlePlane.rotation.set(Math.PI * 1.5, 0, 0);


    // lights

    light = new THREE.SpotLight(0xffffff, 1);
    light.position.set( 10, 30, 0 );
    light.angle = Math.PI / 12;
    light.target = mesh;
    light.penumbra = 0.8;
    light.distance = 100;
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.position.set( 10, 30, 0 );

    
    spotLightHelper = new THREE.SpotLightHelper(light);

    // scene.add
    scene.add( mesh );
    scene.add( circlePlane );
    scene.add( light );
   // scene.add( spotLightHelper );
    scene.add( ambientLight );
   
    
    window.addEventListener( 'resize', handleWindowResize, false );
}
    camera.position.set(-0.3187, 16.856, 24.40);
    camera.rotation.set(-0.6044, -0.01, -0.01);
    // -0.3187, 16.856, 24.40 
   // -0.6044, -0.01, -0.01
   
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
    mesh.rotation.y += 0.01;
    circlePlane.rotation.z -= 0.002;
   // controls.update();
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
console.log(headlines);

for(let i = 0; i < headlines.length; i++) {
        gsap.to(headlines[i], { duration: 0.1, opacity: 0.35});
        headlines[i].addEventListener("mouseover", function() {
            console.log("hello");
            gsap.to(headlines[i], { duration: 0.4, backgroundColor: "red", opacity: 1});
        });
        headlines[i].addEventListener("mouseleave", function() {
            console.log("hello");
            gsap.to(headlines[i], { duration: 0.4, backgroundColor: "transparent", opacity: 0.35});
        });
}


