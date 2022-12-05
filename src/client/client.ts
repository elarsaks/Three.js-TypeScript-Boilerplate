import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)
// Add an axis helper to the scene
// scene.add(new THREE.AxesHelper(5))
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x34baeb,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
cube.scale.x = 0.3
cube.scale.y = 0.3
cube.scale.z = 0.3
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// CUBE GUI
const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
cubeFolder.open()

// Cube Rotation
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeRotationFolder.open()

// Cube Position
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10)
cubePositionFolder.add(cube.position, 'y', -10, 10)
cubePositionFolder.add(cube.position, 'z', -10, 10)
cubePositionFolder.open()

// Cube Scale
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', 0, 5)
cubeScaleFolder.add(cube.scale, 'y', 0, 5)
cubeScaleFolder.add(cube.scale, 'z', 0, 5)
cubeScaleFolder.open()

// Cube Visibility
cubeFolder.add(cube, 'visible')

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube.rotation.z += 0.001

    stats.update()
    controls.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()
