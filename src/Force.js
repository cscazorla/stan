import * as CANNON from 'cannon-es'

export default class Force
{
    constructor() {}

    GenerateGravitational(pA, pB, mA, mB, G, minDistance, maxDistance)
    {
        // Calculate the distance between the two objects
        let baVector = new CANNON.Vec3(
            pB.x - pA.x,
            pB.y - pA.y,
            pB.z - pA.z,
        )
        let distanceSquared = baVector.lengthSquared()

        // Clamp the values of the distance (to allow for some insteresting visual effects)
        distanceSquared = Math.min(Math.max(distanceSquared, minDistance), maxDistance)

        // Calculate the direction of the attraction force
        baVector.normalize()

        // Calculate the strength of the attraction force
        const attractionMagnitude = G * (mA * mB) / distanceSquared

        // Calculate the final resulting attraction force vector
        const force = baVector.scale(attractionMagnitude)

        return force
    }

    GenerateDrag(k, objectVelocity) {
        let dragVector = new CANNON.Vec3()

        // We only apply the friction force if the object is moving
        if (objectVelocity.lengthSquared() > 0) {
            // Calculate the drag direction (inverse of velocity unit vector)
            let dragDirection = objectVelocity.clone()
            dragDirection.normalize()
            dragDirection = dragDirection.negate()

            // Calculate the drag magnitude, k * |v|^2
            const dragMagnitude = k * objectVelocity.lengthSquared()

            // Generate the final drag force with direction and magnitude
            dragVector = dragDirection.scale(dragMagnitude)
        }

        return dragVector
    }

    GenerateMagnus(linearVelocity, angularVelocity, k) {
        let magnusDirection = new CANNON.Vec3()
        angularVelocity.cross(linearVelocity, magnusDirection)
        magnusDirection.normalize()

        const magnusMagnitude = linearVelocity.length() * angularVelocity.length() * k

        const magnusForce = magnusDirection.scale(magnusMagnitude)

        return magnusForce
    }
}
