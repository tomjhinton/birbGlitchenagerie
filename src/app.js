import './style.scss'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')

const textureLoader = new THREE.TextureLoader()

const birdTexture = textureLoader.load('../bird.jpg')

const cowTexture = textureLoader.load('../cow.jpg')

const dudeTexture = textureLoader.load('../dude.jpg')


import birdVertexShader from './shaders/vertBird.glsl'
import birdFragmentShader from './shaders/fragBird.glsl'


import cowVertexShader from './shaders/vertCow.glsl'
import cowFragmentShader from './shaders/fragCow.glsl'


import dudeVertexShader from './shaders/vertDude.glsl'
import dudeFragmentShader from './shaders/fragDude.glsl'

import vertexShader from './shaders/vert.glsl'

const scene = new THREE.Scene()

// Loading Bar Stuff

const loadingBarElement = document.querySelector('.loading-bar')
const loadingBarText = document.querySelector('.loading-bar-text')
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () =>{
    window.setTimeout(() =>{
      gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

      loadingBarElement.classList.add('ended')
      loadingBarElement.style.transform = ''

      loadingBarText.classList.add('fade-out')

    }, 500)
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) =>{
    const progressRatio = itemsLoaded / itemsTotal
    loadingBarElement.style.transform = `scaleX(${progressRatio})`

  }
)

const gtlfLoader = new GLTFLoader(loadingManager)

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  depthWrite: false,
  uniforms:
    {
      uAlpha: { value: 1 }
    },
  transparent: true,
  vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
  fragmentShader: `
  uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)



const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

birdTexture.flipY = false
birdTexture.encoding = THREE.sRGBEncoding

const birdMaterial = new THREE.MeshBasicMaterial({ map: birdTexture,
  side: THREE.DoubleSide})

cowTexture.flipY = false
cowTexture.encoding = THREE.sRGBEncoding

const cowMaterial = new THREE.MeshBasicMaterial({ map: cowTexture,
  side: THREE.DoubleSide})


dudeTexture.flipY = false
dudeTexture.encoding = THREE.sRGBEncoding

const dudeMaterial = new THREE.MeshBasicMaterial({ map: dudeTexture,
    side: THREE.DoubleSide})


//Resizing handler

window.addEventListener('resize', () =>{



  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2 ))


})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, .1, 2000)
camera.position.x = 20
// camera.position.y = 20
// camera.position.z = 55
scene.add(camera)




// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0x000000, 0 )


const birdShaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: birdFragmentShader,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },
    uTexture: {
      value: cowTexture
    },

    uMouse: {
      value: {x: 0.5, y: 0.5}
    },
    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uValueA: {
      value: .5
    },
    uValueB: {
      value: .5
    },
    uValueC: {
      value: .5
    }
  }
})


const cowShaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: cowFragmentShader,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },
    uTexture: {
      value: dudeTexture
    },

    uMouse: {
      value: {x: 0.5, y: 0.5}
    },
    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uValueA: {
      value: .5
    },
    uValueB: {
      value: .5
    },
    uValueC: {
      value: .5
    }
  }
})


const dudeShaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: dudeFragmentShader,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },
    uTexture: {
      value: birdTexture
    },

    uMouse: {
      value: {x: 0.5, y: 0.5}
    },
    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uValueA: {
      value: .5
    },
    uValueB: {
      value: .5
    },
    uValueC: {
      value: .5
    }
  }
})




let bird
gtlfLoader.load(
  'bird.glb',
  (gltf) => {
    console.log(gltf)
    gltf.scene.scale.set(4.5,4.5,4.5)
    bird = gltf.scene.children[0]
    bird.needsUpdate = true
    // bird.position.y -= 4.5
    scene.add(bird)


    bird.material = birdMaterial


  }
)

let cow
gtlfLoader.load(
  'cow.glb',
  (gltf) => {
    console.log(gltf)
    gltf.scene.scale.set(4.5,4.5,4.5)
    cow = gltf.scene.children[0]
    cow.needsUpdate = true
    cow.position.z -= 6.5
    scene.add(cow)


    cow.material = cowMaterial


  }
)


let dude
gtlfLoader.load(
  'dude.glb',
  (gltf) => {
    console.log(gltf)
    gltf.scene.scale.set(4.5,4.5,4.5)
    dude = gltf.scene.children[0]
    dude.needsUpdate = true
    dude.position.z = 6.5
    scene.add(dude)


    dude.material = dudeMaterial


  }
)

const panel = document.getElementById('panel')

let glitch = false
document.querySelector('#titular').addEventListener('click', (e) => {
  if(!glitch){
    dude.material = dudeShaderMaterial
    cow.material = cowShaderMaterial
    bird.material = birdShaderMaterial
    glitch = true
    panel.style.display = 'block'

  }else if(glitch){
    dude.material = dudeMaterial
    cow.material = cowMaterial
    bird.material = birdMaterial
    glitch = false
    panel.style.display = 'none'

  }

})


const birdCheck = document.getElementById('birdCheck')
birdCheck.addEventListener('click', (e) => {
  if(birdCheck.checked){
    birdShaderMaterial.vertexShader = birdVertexShader
    birdShaderMaterial.needsUpdate = true
  } else if(!birdCheck.checked){
    birdShaderMaterial.vertexShader = vertexShader
    birdShaderMaterial.needsUpdate = true
  }
})

const dudeCheck = document.getElementById('dudeCheck')
dudeCheck.addEventListener('click', (e) => {
  if(dudeCheck.checked){
    dudeShaderMaterial.vertexShader = dudeVertexShader
    dudeShaderMaterial.needsUpdate = true
  } else if(!dudeCheck.checked){
    dudeShaderMaterial.vertexShader = vertexShader
    dudeShaderMaterial.needsUpdate = true
  }
})

const cowCheck = document.getElementById('cowCheck')
cowCheck.addEventListener('click', (e) => {
  if(cowCheck.checked){
    cowShaderMaterial.vertexShader = cowVertexShader
    cowShaderMaterial.needsUpdate = true
  } else if(!cowCheck.checked){
    cowShaderMaterial.vertexShader = vertexShader
    cowShaderMaterial.needsUpdate = true
  }
})




const birdRangeA = document.getElementById('birdRangeA')
birdRangeA.addEventListener('input', (e) => {

  birdShaderMaterial.uniforms.uValueA.value = birdRangeA.valueAsNumber / 100
  birdShaderMaterial.needsUpdate = true

})
const birdRangeB = document.getElementById('birdRangeB')
birdRangeB.addEventListener('input', (e) => {

  birdShaderMaterial.uniforms.uValueB.value = birdRangeB.valueAsNumber / 100
  birdShaderMaterial.needsUpdate = true

})
const birdRangeC = document.getElementById('birdRangeC')
birdRangeC.addEventListener('input', (e) => {

  birdShaderMaterial.uniforms.uValueC.value = birdRangeC.valueAsNumber / 100
  birdShaderMaterial.needsUpdate = true

})

//

const cowRangeA = document.getElementById('cowRangeA')
cowRangeA.addEventListener('input', (e) => {

  cowShaderMaterial.uniforms.uValueA.value = cowRangeA.valueAsNumber / 100
  cowShaderMaterial.needsUpdate = true

})
const cowRangeB = document.getElementById('cowRangeB')
cowRangeB.addEventListener('input', (e) => {

  cowShaderMaterial.uniforms.uValueB.value = cowRangeB.valueAsNumber / 100
  cowShaderMaterial.needsUpdate = true

})
const cowRangeC = document.getElementById('cowRangeC')
cowRangeC.addEventListener('input', (e) => {

  cowShaderMaterial.uniforms.uValueC.value = cowRangeC.valueAsNumber / 100
  cowShaderMaterial.needsUpdate = true

})

//

const dudeRangeA = document.getElementById('dudeRangeA')
dudeRangeA.addEventListener('input', (e) => {

  dudeShaderMaterial.uniforms.uValueA.value = dudeRangeA.valueAsNumber / 100
  dudeShaderMaterial.needsUpdate = true

})
const dudeRangeB = document.getElementById('dudeRangeB')
dudeRangeB.addEventListener('input', (e) => {

  dudeShaderMaterial.uniforms.uValueB.value = dudeRangeB.valueAsNumber / 100
  dudeShaderMaterial.needsUpdate = true

})
const dudeRangeC = document.getElementById('dudeRangeC')
dudeRangeC.addEventListener('input', (e) => {

  dudeShaderMaterial.uniforms.uValueC.value = dudeRangeC.valueAsNumber / 100
  dudeShaderMaterial.needsUpdate = true

})









const clock = new THREE.Clock()
let oldElapsedTime = 0
const tick = () =>{
  // if ( mixer ) mixer.update( clock.getDelta() )
  const elapsedTime = clock.getElapsedTime()

  const deltaTime = elapsedTime - oldElapsedTime
  oldElapsedTime = elapsedTime
  //Update Physics World

  birdShaderMaterial.uniforms.uTime.value = elapsedTime
  cowShaderMaterial.uniforms.uTime.value = elapsedTime
  dudeShaderMaterial.uniforms.uTime.value = elapsedTime


  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
