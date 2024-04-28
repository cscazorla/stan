import * as THREE from 'three'
class TransformComponent extends THREE.Object3D {
    constructor ()
    {
        super()
    }
}

// class KinematicComponent {
//     constructor (
//             {
//                 linearVelocity = {x: 0, y: 0, z: 0},
//                 linearAcceleration = {x: 0, y: 0, z: 0},
//                 angularVelocity = {x: 0, y: 0, z: 0},
//                 angularAcceleration = {x: 0, y: 0, z: 0}
//             } = {}
//         )
//     {
//         this.linearVelocity = {x: linearVelocity.x, y: linearVelocity.y, z: linearVelocity.z}
//         this.linearAcceleration = {x: linearAcceleration.x, y: linearAcceleration.y, z: linearAcceleration.z}
//         this.angularVelocity = {x: angularVelocity.x, y: angularVelocity.y, z: angularVelocity.z}
//         this.angularAcceleration = {x: angularAcceleration.x, y: angularAcceleration.y, z: angularAcceleration.z}
//     }
// }

export {TransformComponent}
