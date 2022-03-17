import * as THREE from "./three.js-r134-min/build/three.module.js";
import { EffectComposer } from './three.js-r134-min/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './three.js-r134-min/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from './three.js-r134-min/examples/jsm/postprocessing/UnrealBloomPass.js';
import { TrackballControls } from './three.js-r134-min/examples/jsm/controls/TrackballControls.js';

const _VS = `

    varying vec3 v_Normal;
    varying vec2 vertexUV;


    void main() {

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

        vertexUV = uv;
        v_Normal = normal;
    }
`;

const _FS = `

    uniform vec3 sphereColour;
    uniform sampler2D sphereTexture;

    
    varying vec3 v_Normal;
    varying vec2 vertexUV;
    

    void main() {

        float intensity = pow(0.8 + dot(v_Normal, vec3(0.0, 0.0, 1.0)), 0.1);
        
        vec3 atmosphere = vec3(0.0, 0.0, 1.0) * pow(intensity, 0.1);

        float each = 10.0;

      //  gl_FragColor = vec4(v_Normal * 0.5, 1.0);
         gl_FragColor = vec4(atmosphere * intensity * each * texture2D(sphereTexture, vertexUV).xyz, 1.0);
    }
`;


// global variables
var WIDTH, HEIGHT, aspectRatio;
var renderer;
var scene, camera;
var controls;
var composer;
var mesh;


init();
animate();
function init() {

    // height, width of monitor
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    aspectRatio = WIDTH / HEIGHT;

    // renderer
    renderer = new THREE.WebGLRenderer( {
         antialias: true
         } );

    renderer.setSize( WIDTH, HEIGHT );
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( 2 );
    document.body.appendChild( renderer.domElement );

    // scene

    scene = new THREE.Scene();

    // Camera and its position
    camera = new THREE.PerspectiveCamera( 60, aspectRatio, 0.1, 500 );
    controls = new TrackballControls( camera, renderer.domElement );
    camera.lookAt( scene.position );
    controls.rotateSpeed = 5.0;
    controls.panSpeed = 1.0;
    controls.update();
    camera.position.z = 30;


    const material = new THREE.MeshBasicMaterial({
         map: new THREE.TextureLoader().load('./src/texture.jpg'),
         displacementMap: new THREE.TextureLoader().load('./src/texture.png'),
         wireframe: false,
         flatShading: THREE.FlatShading,
         });
    const pointsMaterial = new THREE.PointsMaterial({
         map: new THREE.TextureLoader().load('./src/texture.jpg'),

        });

    const sphereGeometry = new THREE.BoxBufferGeometry(25, 25, 1, 64, 64, 64);
    


    mesh = new THREE.Mesh(sphereGeometry, material);
    let meshPosArray = mesh.geometry.attributes.position.array;
    let beginArray = [];
    let newArray = [];
  
       for(let i = 0; i < meshPosArray.length; i+=3) {

            let x = meshPosArray[i];
            let y = meshPosArray[i+1];
            let z = meshPosArray[i+2];

            beginArray[i] = x;
            beginArray[i+1] = y;
            beginArray[i+2] = z;

            newArray[i] = x + Math.random() * 0.25;
            newArray[i+1] = y + Math.random() * 0.25;
            newArray[i+2] = z + Math.random() * 0.25;

            // meshPosArray[i + 0] = x + Math.random();
            // meshPosArray[i + 1] = y + Math.random();
            // // meshPosArray[i + 2] = z + Math.random();
       }




    mesh.position.set(0, 0, -10);
    scene.add( mesh );


    let tl4 = new gsap.timeline();

        tl4.to([
            meshPosArray,
        ],  {
            endArray: newArray,
            //3
            delay: 0,
            duration: 2.5,
            ease: "none",
            // Make sure to tell it to update
            onUpdate: updateArray,

          });

    function updateArray () {
        mesh.geometry.attributes.position.needsUpdate = true;
      
    }


    // geometries

    composer = new EffectComposer( renderer );
    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );


    const unRealBloomPass = new UnrealBloomPass( window.aspectRatio, 0.1, 0, 0.1);
    
    window.addEventListener( 'resize', handleWindowResize, false );
    composer.addPass(unRealBloomPass);

}       
 

function handleWindowResize() {
    // Az ablak átméretezése esetén a kamera vetítési paraméterek újraszámolása
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    console.log( 'WIDTH=' + WIDTH + '; HEIGHT=' + HEIGHT );
    renderer.setSize( WIDTH, HEIGHT );
    aspectRatio = WIDTH / HEIGHT;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();

    composer.render();
    // render();
}

console.log()
function animate() {
    requestAnimationFrame( animate );

   // mesh.rotation.y += 0.005;
    controls.update();
    // render();
    composer.render();
  

   
}

function render() {
    renderer.render( scene, camera );
}
   
    
 

  

