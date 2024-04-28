import * as THREE from 'three'

export default class Light
{
    constructor(stan)
    {
        this.scene = stan.scene
        this.logger = stan.logger
        this.logger.info("Light constructor called")
    }

    CreateAmbient(color, intensity) {
        const light = new THREE.AmbientLight(color, intensity)
        this.scene.add(light)
        this.logger.info("Ambient light created")
        return light
    }

    CreateDirectional(color, intensity) {
        const light = new THREE.DirectionalLight(color, intensity)
        light.castShadow = true
        light.shadow.mapSize.width = 1024
        light.shadow.mapSize.height = 1024
        this.scene.add(light)

        this.logger.info("Directional light created")
        return light
    }

    CreateDirectionalHelper(light, size) {
        const helper = new THREE.DirectionalLightHelper( light, size )
        this.scene.add(helper)
        return helper
    }

    CreatePoint(color, intensity) {
        const light = new THREE.PointLight(color, intensity)
        light.castShadow = true
        light.shadow.mapSize.width = 1024
        light.shadow.mapSize.height = 1024
        this.scene.add(light)

        this.logger.info("Point light created")
        return light
    }

    CreatePointHelper(light, size) {
        const helper = new THREE.PointLightHelper( light, size )
        this.scene.add(helper)
        return helper
    }

}
