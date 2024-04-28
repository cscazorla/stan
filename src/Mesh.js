import * as THREE from 'three'

export default class Mesh
{
    constructor(stan)
    {
        this.scene = stan.scene
        this.logger = stan.logger
        this.logger.info("Mesh constructor called")
    }

    CreateFromVertices(vertices, color) {
        const geometry = new THREE.BufferGeometry()
        const positionsAttribute = new THREE.BufferAttribute(vertices, 3)
        geometry.setAttribute('position', positionsAttribute)
        const material = new THREE.MeshBasicMaterial({color:color})
        const mesh = new THREE.Mesh( geometry, material )
        this.scene.add( mesh )

        return mesh
    }

    CreateFromGeometry(geometry, material) {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.castShadow = true
        mesh.receiveShadow = true
        this.scene.add(mesh)
        return mesh
    }

    CreateAxesHelper(size = 2) {
        const axesHelper = new THREE.AxesHelper( size )
        this.scene.add( axesHelper )
        return axesHelper
    }

    CreateArrowHelper(dir, origin, length, color) {
        const normalizedDir = dir.clone().normalize()
        const arrowHelper = new THREE.ArrowHelper( normalizedDir, origin, length, color )
        this.scene.add( arrowHelper )
        return arrowHelper
    }

    CreateGridHelper(size = 10, divisions = 10) {
        const mesh = new THREE.GridHelper( size, divisions )
        this.scene.add( mesh )
        return mesh
    }
}
