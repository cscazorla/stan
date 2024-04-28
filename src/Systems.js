import ECS from 'ecs'
import * as THREE from 'three'
import * as CANNON from 'cannon'

// function kinematicSystem (world) {
//     const onUpdate = function (dt) {
//         for (const entity of ECS.getEntities(world, ['transform', 'kinematic'])) {
//             // Linear
//             entity.kinematic.linearVelocity.x += entity.kinematic.linearAcceleration.x * dt
//             entity.kinematic.linearVelocity.y += entity.kinematic.linearAcceleration.y * dt
//             entity.kinematic.linearVelocity.z += entity.kinematic.linearAcceleration.z * dt

//             entity.transform.position.x += entity.kinematic.linearVelocity.x * dt
//             entity.transform.position.y += entity.kinematic.linearVelocity.y * dt
//             entity.transform.position.z += entity.kinematic.linearVelocity.z * dt

//             // Angular
//             entity.kinematic.angularVelocity.x += entity.kinematic.angularAcceleration.x * dt
//             entity.kinematic.angularVelocity.y += entity.kinematic.angularAcceleration.y * dt
//             entity.kinematic.angularVelocity.z += entity.kinematic.angularAcceleration.z * dt

//             entity.transform.rotation.x += entity.kinematic.angularVelocity.x * dt
//             entity.transform.rotation.y += entity.kinematic.angularVelocity.y * dt
//             entity.transform.rotation.z += entity.kinematic.angularVelocity.z * dt
//         }
//     }

//     return { onUpdate }
// }

// function renderingSystem (world) {
//     const onUpdate = function (dt) {
//         for (const entity of ECS.getEntities(world, ['transform', 'mesh'])) {
//             entity.mesh.position.copy(entity.transform.position)
//             entity.mesh.rotation.copy(entity.transform.rotation)
//             entity.mesh.scale.copy(entity.transform.scale)
//         }
//     }

//     return { onUpdate }
// }

function rigidbodySystem (world) {
    const onUpdate = function (dt) {
        for (const entity of ECS.getEntities(world, ['mesh', 'rigidbody'])) {
            entity.mesh.position.copy(entity.rigidbody.position)
            entity.mesh.quaternion.copy(entity.rigidbody.quaternion)

            // const idx = world.entities.indexOf(entity)
            // console.log("Entity " + idx)
            // console.log(entity.mesh.quaternion, entity.rigidbody.quaternion)
        }
    }

    return { onUpdate }
}

export {rigidbodySystem}
