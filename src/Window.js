import {EventDispatcher } from 'three'

export default class Window extends EventDispatcher
{
    constructor(stan)
    {
        super()

        this.logger = stan.logger
        this.logger.info("Sizes constructor called")
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspectRatio = this.width / this.height
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Listen to the browser resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.aspectRatio = this.width / this.height
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            // Emit an event
            this.dispatchEvent({
                type: 'resize'
            })
        })
    }
}
