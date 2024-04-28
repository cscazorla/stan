import * as THREE from 'three'

import AssetsManager from './AssetsManager'
import Camera from './Camera'
import Debug from './Debug'
import Force from './Force'
import Input from './Input'
import Light from './Light'
import Logger from './Logger'
import Mesh from './Mesh'
import Physics from './Physics'
import Renderer from './Renderer'
import Window from './Window'

class Stan {
    constructor() {
        // Global access (debugging purposes only)
        window.stan = this

        // Game loop
        this.isRunning = false
        this.startTime = Date.now()
        this.lastFrameTime = this.startTime
        this.dt = 1 / 60                // seconds
        this.totalElapsed = 0           // miliseconds
        this.totalElapsedInSeconds = 0  // seconds

        // Game objects
        this.objects = []
        this.objectsToBeDestroyed = []

        this.logger = new Logger()
        this.logger.info('Stan constructor called')
        this.debug = new Debug(this)
        this.window = new Window(this)
        this.scene = new THREE.Scene()
        this.camera = new Camera(this)
        this.renderer = new Renderer(this)
        this.camera.setOrbitControls(this.renderer.instance.domElement)
        this.assets = new AssetsManager(this)
        this.physics = new Physics(this)
        this.mesh = new Mesh(this)
        this.light = new Light(this)
        this.input = new Input(this)
        this.forces = new Force()

        // Events
        this.window.addEventListener('resize', (e) => { this.resize(e) })
        this.assets.addEventListener('ready', (e) => {
            this.logger.info("Successfully loaded " + e.totalAssets + " assets.")
            this.onAssetsLoaded(e)
        })

        // Custom update method overwritten by user
        this.onAssetsLoaded = () => {};
        this.update = () => {};
    }

    createObject(name = "") {
        let object = new THREE.Object3D()
        if ( name !== '' ) object.name = name

        // Append axes helper gizmo
        object.axesHelper = new THREE.AxesHelper(1)
        object.axesHelper.visible = false
        this.scene.add(object.axesHelper)

        this.logger.info('Created object ' + object.name + ' #' + object.id)
        this.objects.push(object)

        return object
    }

    destroyObject(object) {
        const index = this.objects.indexOf(object);
        if(index !== -1) {
            this.objects.splice(index, 1);
        }

        this.objectsToBeDestroyed.push(object)
    }

    getObjects() {
        return this.objects
    }

    getObjectById(id) {
        return this.objects.find(object => object.id == id)
    }

    // ToDo
    getObjectByName(name) {
        return null
    }

    addComponentToObject(object, name, data) {
        data.objectID = object.id
        object[name] = data
    }

    resize(e) {
        this.logger.debug('Stan heard a resize: ' + this.window.width)
        // Propagating down the event
        this.camera.resize()
        this.renderer.resize()
    }

    frame() {
        this.debug.stats.begin()

        // Ask the browser to call this method ASAP
        window.requestAnimationFrame(() => {
            this.frame()
        })

        if (this.isRunning)
        {
            const now = Date.now()
            this.dt = (now - this.lastFrameTime) / 1000
            this.lastFrameTime = now
            this.totalElapsed = this.lastFrameTime - this.startTime
            this.totalElapsedInSeconds = this.totalElapsed / 1000

            // Custom update
            this.update(this.dt)

            // Cascade down manual changes on position
            // and rotation to the rigidbody
            for (const object of this.objects)
            {
                if (object.rigidbody) {
                    object.rigidbody.position.copy(object.position)
                    object.rigidbody.quaternion.copy(object.quaternion)
                }
            }

            // Update physics and translate physics properties from
            // rigidbody to Mesh and Object
            this.physics.Update(this.dt, this.objects)

            // Do we need to remove any object?
            let object = null
            while (typeof (object = this.objectsToBeDestroyed.shift()) !== "undefined") {
                // Rigidbody
                if (object.rigidbody) {
                    this.physics.world.removeBody(object.rigidbody)
                }

                // Destroy object from scene
                if (object.mesh) {
                    object.mesh.geometry.dispose()
                    object.mesh.material.dispose()
                    this.scene.remove(object.mesh)
                }
            }

        }

        this.camera.frame()
        this.renderer.frame()

        this.debug.stats.end()
    }

    // To Do
    destroy()
    {
        this.sizes.off('size')
    }

    loadTexture(texturePath) {
        return this.textureLoader.load(texturePath)
    }

    start() {
        this.isRunning = true
        this.logger.info('Stan engine starts')

        // Start the game loop
        this.frame()
    }
}

export {Stan as default}
