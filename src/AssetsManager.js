import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default class AssetsManager extends THREE.EventDispatcher
{
    constructor(stan)
    {
        super()

        this.scene = stan.scene
        this.logger = stan.logger
        this.logger.info("Assets manager constructor called")

        this.assets = {}
        this.toLoad = 0
        this.loaded = 0
        this.assetsReady = false

        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
    }

    loadAssets(sources) {
        this.toLoad = sources.length
        for(const source of sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) =>
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    get(name) {
        return this.assets[name]
    }

    sourceLoaded(source, file)
    {
        this.assets[source.name] = file
        this.loaded++

        if(this.loaded === this.toLoad)
        {
            this.assetsReady = true
            this.dispatchEvent({
                type: 'ready',
                totalAssets: this.loaded,
                assets: this.assets
            })
        }
    }
}
