import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'

export default class Physics
{
    constructor(stan)
    {
        this.scene = stan.scene
        this.world = new CANNON.World()
        this.debugger = new CannonDebugger(
            this.scene,
            this.world,
            {
                onInit(body, mesh) {
                    mesh.visible = false
                    // Toggle visibiliy on "." press
                    document.addEventListener('keydown', (event) => {
                        if (event.key === '.') {
                            mesh.visible = !mesh.visible
                        }
                    })
                },
            }
        )
        this.logger = stan.logger
        this.logger.info("Physics constructor called")
    }

    Update(dt, objects)
    {
        this.world.step(1 / 60, dt, 3)
        this.debugger.update()

        for (const object of objects)
        {
            if (object.rigidbody)
            {
                object.position.copy(object.rigidbody.position)
                object.quaternion.copy(object.rigidbody.quaternion)
            }
        }
    }

    CreateBody(options) {
        const body = new CANNON.Body(options)
        this.world.addBody(body)

        return body
    }
}
