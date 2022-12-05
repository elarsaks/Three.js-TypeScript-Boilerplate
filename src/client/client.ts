import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
cube.scale.x = 0.7
cube.scale.y = 0.7
cube.scale.z = 0.7
scene.add(cube)

console.dir(scene)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.open()
gui.add(cube.scale, 'x', 0, Math.PI * 2)
gui.add(cube.scale, 'y', 0, Math.PI * 2)
gui.add(cube.scale, 'z', 0, Math.PI * 2)

const camerFolder = gui.addFolder('Camera')
camerFolder.add(camera.position, 'z', 0, 20)
camerFolder.open()

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.01

    controls.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()
