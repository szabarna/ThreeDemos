import * as THREE from "./three.js-r134/build/three.module.js"
import { TrackballControls } from './three.js-r134/examples/jsm/controls/TrackballControls.js';
// global variables
var WIDTH, HEIGHT, aspectRatio;
var renderer;
var scene, camera;
var controls;
var material, geometry, geometry2, mesh;
var color;
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
    document.body.appendChild( renderer.domElement );

    // scene

    scene = new THREE.Scene();

    // Camera and its position
    camera = new THREE.PerspectiveCamera( 60, aspectRatio, 0.1, 3000 );
    controls = new TrackballControls( camera, renderer.domElement );
    camera.position.z = 75;
    camera.lookAt( scene.position );
    controls.rotateSpeed = 5.0;
    controls.panSpeed = 1.0;



    // geometry
    geometry = new THREE.SphereGeometry(100, 128, 128);
    geometry2 = new THREE.BoxGeometry(100, 100, 100, 128, 128);

    // material
    material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    
    // mesh
    mesh = new THREE.Mesh( geometry, material );

    mesh = new THREE.Mesh( geometry2, material);

    mesh.rotation.x = Math.PI * 1.5;

    scene.add( mesh );

    window.addEventListener( 'resize', handleWindowResize, false );
}

var button = document.getElementsByClassName("clickme");

button[0].addEventListener("click", function (){

   if(mesh.geometry.type == "SphereGeometry") {
        color = THREE.MathUtils.randInt(0, 0xffffff);
        material = new THREE.MeshBasicMaterial({color, wireframe: true});
        scene.remove( mesh );
        mesh = new THREE.Mesh( geometry2, material);
        mesh.rotation.x = Math.PI * 1.5;
        scene.add( mesh);

   }
   else {
        color = THREE.MathUtils.randInt(0, 0xffffff);
        material = new THREE.MeshBasicMaterial({color, wireframe: true});
        scene.remove( mesh );
        mesh = new THREE.Mesh( geometry, material);
        mesh.rotation.x = Math.PI * 1.5;
        scene.add( mesh);
   }
  
});





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

    mesh.rotation.y += 0.001;

    controls.update();

    render();
}


function render() {
    renderer.render( scene, camera );
}