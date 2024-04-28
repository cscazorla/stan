import * as THREE from 'three'

export default class Renderer
{
    constructor(stan)
    {
        this.logger = stan.logger
        this.logger.info("Renderer constructor called")
        this.window = stan.window
        this.scene = stan.scene
        this.camera = stan.camera
        this.objects = stan.objects

        this.instance = new THREE.WebGLRenderer({
            antialias: true
        })
        document.body.appendChild( this.instance.domElement )
        this.instance.setSize( this.window.width, this.window.height )
        this.instance.setPixelRatio(this.window.pixelRatio)
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    }

    resize()
    {
        this.instance.setSize(this.window.width, this.window.height)
        this.instance.setPixelRatio(this.window.pixelRatio)
    }

    frame()
    {
        for (const object of this.objects)
        {
            // Update axes helper position if visible
            if (object.axesHelper.visible) {
                object.axesHelper.position.copy(object.position)
                object.axesHelper.quaternion.copy(object.quaternion)
            }

            // Update mesh
            if (object.mesh) {
                object.mesh.quaternion.copy(object.quaternion)
                object.mesh.position.copy(object.position)
            }
        }

        // Render all meshes in the scene
        this.instance.render(this.scene, this.camera.instance)
    }
}
