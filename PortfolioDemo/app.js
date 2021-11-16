import * as THREE from "./three.js-r134-min/build/three.module.js";
import { TrackballControls } from './three.js-r134-min/examples/jsm/controls/TrackballControls.js';
import { ScrollTrigger } from "./gsap-public/esm/ScrollTrigger.js";


//import { ScrollTrigger } from './gsap-public/';

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
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );

    // scene

    scene = new THREE.Scene();

    // Camera and its position
    camera = new THREE.PerspectiveCamera( 60, aspectRatio, 0.1, 3000 );
   // controls = new TrackballControls( camera, renderer.domElement );
    camera.lookAt( scene.position );
    //controls.rotateSpeed = 5.0;
   // controls.panSpeed = 1.0;
    scrollHeight = document.documentElement.scrollHeight - 586;
    percent = window.scrollY / (scrollHeight * 0.01);
   // controls.update();
    camera.position.z = 30;
    

    // geometries

    geometry = new THREE.SphereGeometry(4, 32, 32);
    circlePlaneGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
    planeGeometry2 = new THREE.PlaneGeometry(100, 100, 100, 100);
    planeGeometry3 = new THREE.PlaneGeometry(100, 100, 100, 100);
    planeGeometry4 = new THREE.PlaneGeometry(100, 100, 100, 100);

    // materials


    material = new THREE.MeshBasicMaterial({ color: 0xffffff });

   
    circlePlaneMaterial = new THREE.MeshPhysicalMaterial({
            map: new THREE.TextureLoader().load("./src/abstract2.jpeg"),
           // color: 0xffffff,
            side: THREE.DoubleSide,
            flatShading: THREE.FlatShading,
            reflectivity: 1,
            metalness: 1,
            roughness: 0,
            emissive: 0x0,
            fog: true,
           });
      
    // ,  flatShading: THREE.FlatShading
    planematerial2 = new THREE.MeshPhysicalMaterial({
            map: new THREE.TextureLoader().load("./src/abstract2.jpeg"),
            side: THREE.DoubleSide,
            flatShading: THREE.FlatShading,
            reflectivity: 1,
            metalness: 1,
            roughness: 0,
            emissive: 0x0,
            fog: true,
           });
    planematerial3 = new THREE.MeshPhysicalMaterial({
            map: new THREE.TextureLoader().load("./src/abstract2.jpeg"),
            side: THREE.DoubleSide,
            flatShading: THREE.FlatShading,
            reflectivity: 1,
            metalness: 1,
            roughness: 0,
            emissive: 0x0,

            });

    planematerial4 = new THREE.MeshPhysicalMaterial({
            map: new THREE.TextureLoader().load("./src/abstract2.jpeg"),
            side: THREE.DoubleSide,
            flatShading: THREE.FlatShading,
            reflectivity: 1,
            metalness: 1,
            roughness: 0,
       
         });

    // meshes

        // main cube mesh
        mesh = new THREE.Mesh( geometry, material );
        mesh.position.y = 0;
        //x = 10
        mesh.position.x = 0;
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        
       
    //mesh.rotation.z += Math.PI * -0.02;
    
        // circlePlaneMesh bottom
        circlePlane = new THREE.Mesh( circlePlaneGeometry, circlePlaneMaterial );
        circlePlane.position.x = 0;
        circlePlane.position.y = -40;
        circlePlane.receiveShadow = true;
        circlePlane.castShadow = false;
        circlePlane.rotation.set(Math.PI * 1.5, 0, 0);

        // plane2 left
        plane2 = new THREE.Mesh( planeGeometry2, planematerial2 );
        plane2.position.x = 40;
        plane2.position.y = 0;
        plane2.receiveShadow = true;
        plane2.castShadow = false;
        plane2.rotation.set(Math.PI * 1.5, Math.PI * 1.5, 0);


        // plane3 right
        plane3 = new THREE.Mesh( planeGeometry3, planematerial3 );
        plane3.position.x = -40;
        plane3.position.y = 0;
        plane3.receiveShadow = true;
        plane3.castShadow = false;
        plane3.rotation.set(Math.PI * 1.5, Math.PI * 2.5, 0);

        // plane4 top
        plane4 = new THREE.Mesh( planeGeometry4, planematerial4 );
        plane4.position.x = 0;
        plane4.position.y = 40;
        plane4.receiveShadow = true;
        plane4.castShadow = false;
        plane4.rotation.set(Math.PI * 2.5, 0, 0);

        // GROUP
            // MAIN
        planeGroup = new THREE.Group();
        planeGroup.add( circlePlane );
        planeGroup.add( plane2 );
        planeGroup.add( plane3 );
        planeGroup.add( plane4 );
        planeGroup.rotation.z = Math.PI * 0.75;
            // SUB

            for(let i = 0; i < 5; i++) {
                 planeGroup2 = new THREE.Group();
                planeGroup2.add( circlePlane.clone() );
                planeGroup2.add( plane2.clone() );
                planeGroup2.add( plane3.clone() );
                planeGroup2.add( plane4.clone() );
                planeGroup2.position.z = 100 * (1 + i);
                planeGroup2.rotation.z = Math.PI * 0.75;
                scene.add(planeGroup2);
            }

            scene.add( planeGroup );
            
        
    const planeArray = circlePlane.geometry.attributes.position.array;
    const meshArray = mesh.geometry.attributes.position.array;
    let beginArray = [];
    let newArray = [];

         count = circlePlane.geometry.attributes.position.count;

    for(let i = 0; i < planeArray.length; i += 3) {

        const x = planeArray[i];
        const y = planeArray[i + 1];
        const z = planeArray[i + 2];

        newArray[i] = x + Math.random() * 5;
        newArray[i + 1] = y + Math.random() * 5;
        beginArray[i] = x;
        beginArray[i + 1] = y;
        beginArray[i + 2] = 1;
        

            if(i % 15 == 0) newArray[i + 2] = z + Math.random() * 7.5;
            else newArray[i + 2] = z;
          
    }

    tl4 = new gsap.timeline();

        tl4.to([
            circlePlane.geometry.attributes.position.array,
            plane2.geometry.attributes.position.array,
            plane3.geometry.attributes.position.array,
            plane4.geometry.attributes.position.array
            
        ],  {
            endArray: newArray,
            //3
            duration: 8,
            ease: "back",
            // Make sure to tell it to update
            onUpdate: updateArray,

          });

    function updateArray () {
        circlePlane.geometry.attributes.position.needsUpdate = true;
        plane2.geometry.attributes.position.needsUpdate = true;
        plane3.geometry.attributes.position.needsUpdate = true;
        plane4.geometry.attributes.position.needsUpdate = true;
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

    ambientLight = new THREE.AmbientLight(0xff0000, 0.4);
    ambientLight.position.set( 0, 0, 0 );
                                    // 10, 50, 0
    
    spotLightHelper = new THREE.SpotLightHelper(light);
    
    pointLight = new THREE.PointLight( 0xff0000, 1000, 350, 2);
    pointLight.position.set(0, 0, 0);
    pointLight.add( mesh );
   
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 4);
    // scene.add
   // scene.add( mesh );
    /*
    scene.add( plane2 );
    scene.add( plane3 );
    scene.add( plane4 );
    scene.add( circlePlane );
   */
    //scene.add( light );
   // scene.add( spotLightHelper );
    scene.add( ambientLight );
    scene.add( pointLight );
   // scene.add( pointLightHelper );
   
    camera.position.set(0, 0, -60)
    camera.lookAt(mesh.position);
  //  camera.updateProjectionMatrix(); 
   // camera.position.set(0, 11.510679823749568, 54.86135913947847);
    // -2.484171946449548, 11.510679823749568, 54.86135913947847
   // -3.141592653589793, 0, -3.141592653589793
    
    window.addEventListener( 'resize', handleWindowResize, false );
        
}       
    
   
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
    text2.innerHTML += "<span>" + splitText2[i] + " "  + "</span>";
     
    }
    
    for(let i = 0; i < splitText3.length; i++) {
    text3.innerHTML += "<span>" + splitText3[i] + " "  + "</span>";
        
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
            gsap.to(spans[i], { scale: 1.25, duration: 1, ease: "elastic"});

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
   /*
    const now = Date.now() / 10000;
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
   */

    planeGroup.rotation.z += 0.001;
    scene.children[0].rotation.z -= 0.001;
    scene.children[1].rotation.z += 0.001;
    scene.children[2].rotation.z -= 0.001;
    scene.children[3].rotation.z += 0.001;
    scene.children[4].rotation.z -= 0.001;
    mesh.rotation.y += 0.01;
       
  //  controls.update();
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

        // SPHERE FLOAT ANIMATION

tl2 = new gsap.timeline();
tl2.to(mesh.position, { y: 0, duration: 3, ease: "back"});

    setInterval(function() {
            tl3 = new gsap.timeline();
            if(!tl2.isActive()){
            tl3.to([mesh.position, pointLight.position], {  y: 2, duration: 2,   ease: Sine.easeInOut});
            tl3.to([mesh.position, pointLight.position], { y: -2, duration: 2, ease: Sine.easeInOut});
            tl3.to([mesh.position, pointLight.position], { y: 2, duration: 2, ease: Sine.easeInOut});
        }
    }, 4000);
    /*

    gsap.to([mesh.position, pointLight.position], {z: 250, duration: 4, ease: Sine});
    gsap.to([mesh.position, pointLight.position], {z: 0, duration: 4, delay: 4, ease: Sine});
    setInterval(function() {
      gsap.to([mesh.position, pointLight.position], {z: 250, duration: 4, ease: Sine});
      gsap.to([mesh.position, pointLight.position], {z: 0, duration: 4, delay: 4, ease: Sine});
      
}, 10000);   
*/
const headline1 = document.getElementById("headline1");
const headline2 = document.getElementById("headline2");
const headline3 = document.getElementById("headline3");
gsap.to(headline1, { duration: 2, right: "0", ease: "back"});
gsap.to(headline2, {  duration: 2, right: "35.75%", top: "2%", ease: "back"}); 
gsap.to(headline3, {  duration: 2, right: "76.75%", top: "8%", ease: "back", paddingRight: "0px"});


// h1 main mouseover animation
let headlines = [];
for(let i = 1; i <= 3; i++) {
    headlines.push(document.getElementById(`headline${i}`));
}

/*
for(let i = 0; i < headlines.length; i++) {
        gsap.to(headlines[i], { duration: 0.1, opacity: 0.35});
        headlines[i].addEventListener("mouseover", function() {
            gsap.to(headlines[i], { duration: 0.4,  });
        });
        headlines[i].addEventListener("mouseleave", function() {
            gsap.to(headlines[i], { duration: 0.4, });
        });
}
*/


// CHANGE COLOR ANIMATION

let counter = 0;
setInterval(() => {

       if(counter == 0)  gsap.to(pointLight.color, { r: 0, g: 0, b: 1, duration: 5, ease: Sine });
       else if(counter == 1)  gsap.to(pointLight.color, { r: 0, g: 1, b: 0, duration: 5, ease: Sine });
       else if(counter == 2)  gsap.to(pointLight.color, { r: 1, g: 0, b: 0, duration: 5, ease: Sine });

       if(counter != 2) counter += 1;
       else counter = 0
       
        
    
}, 5000);

// GSAP.SCROLLTRIGGER
mesh.geometry.scale(0.75, 0.75, 0.75);
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
    immediateRender: true,
    ease: "power1.inOut",
    scrub: true,
    scrub: 1
  });
console.log(pointLight)

// MAIN ANIMATION
let scene_anim = gsap.timeline();

  scene_anim.to([camera.position, pointLight.position], { z: "+=520", scrollTrigger: {

        trigger: ".section-two",
        
        start: "top bottom",
        end: "top top",
        update: camera.updateProjectionMatrix() 

  }});

