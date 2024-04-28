import * as dat from 'lil-gui'
import * as Stats from 'stats.js'

export default class Debug
{
    constructor(stan)
    {
        this.logger = stan.logger
        this.logger.info('Debug GUI constructor called')
        this.ui = new dat.GUI()
        this.stats = new Stats()
        this.stats.showPanel(0)
        document.body.appendChild( this.stats.dom )

        // this.active = window.location.hash === '#debug'
        // if (this.active)
        // {
        //    this.ui = new dat.GUI()
        // }
    }
}
