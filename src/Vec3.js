import * as THREE from 'three'

export default class Vec3 extends THREE.Vector3
{
    constructor(x = 0, y = 0, z = 0)
    {
        super(x, y, z)
    }
}
