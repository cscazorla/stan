export default class Input {

    constructor(stan)
    {
        this.logger = stan.logger
        this.logger.info("Input constructor called")

        this.pressedKeys = {}

        window.addEventListener(
            "keydown",
            (event) => {
                this._setKeyValue(event.key, true)
            }
        )
        window.addEventListener(
            "keyup",
            (event) => {
                this._setKeyValue(event.key, false)
            }
        )
    }

    _setKeyValue(key, value)
    {
        this.pressedKeys[key] = value
    }

    isKeyPressed(key)
    {
        return this.pressedKeys[key]
    }
}
