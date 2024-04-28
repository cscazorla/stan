import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor(stan)
    {
        this.logger = stan.logger
        this.logger.info("Camera constructor called")
        this.window = stan.window
        this.scene = stan.scene
        this.debug = stan.debug

        this.instance = new THREE.PerspectiveCamera(
            45,
            this.window.aspectRatio,
            1,
            1000
        )
        // this.instance = new THREE.OrthographicCamera(
        //     -this.window.width,
        //     this.window.width,
        //     this.window.height,
        //     -this.window.height
        // )
        // this.instance.position.set(0, 0, 125)
        this.scene.add(this.instance)
    }

    setOrbitControls(canvas)
    {
        this.controls = new OrbitControls(this.instance, canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.window.aspectRatio
        this.instance.updateProjectionMatrix()
    }

    frame()
    {
        // This is for the OrbitControls damping
        if (this.controls && this.controls.enabled)
            this.controls.update()
    }

    CreateHelper(camera) {
        const helper = new THREE.CameraHelper(camera)
        this.scene.add(helper)
        this.logger.info("Camera helper added")
        return helper
    }
}
