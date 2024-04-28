import * as THREE from 'three'

/**
 * This functions returns the normalized vector
 * that points from A to B
 * @param {THREE.Vector3} a
 * @param {THREE.Vector3} b
 * @returns {THREE.Vector3}
 */
const getABVector = (a, b) => {
    return new THREE.Vector3().subVectors(b, a).normalize()
}

export {getABVector}
