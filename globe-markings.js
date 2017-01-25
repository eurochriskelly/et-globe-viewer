/**
 * Created by ckelly on 1/18/17.
 */
"use strict";

class GlobeMarkings {

    constructor () {
        this.circles = [];
        this.offset = 1.002;
        this.createLatLines ();
        this.createMeridia ();
    }

    getMarkings (radius) {
        // todo: scale by radius
        return this.circles.map(c => {
            c.scale.x *= radius;
            c.scale.y *= radius;
            c.scale.z *= radius;
            return c;
        });
    }

    createMeridia () {
        var angles = [];
        for (var i = 0; i < 180;i += 15) angles.push(i);

        angles.forEach((ang, i) => {
            this.circles.push(this.createMeridian(ang, i))
        });
    }

    createLatLines () {
        var angles = [];
        for (var i = -80; i < 90;i += 10) angles.push(i);

        angles.forEach((ang,i) => {
            this.circles.push(this.createLineOfLatitude(ang,i))
        });
    }

    createMeridian (ang, i) {
        const radius   = this.offset;
        const segments = 64;
        const material = new THREE.LineBasicMaterial( { color: ang !== 90 ? 0x0000ff : 0xff0000 } );
        const geometry = new THREE.CircleGeometry( radius, segments );

        // Remove center vertex
        geometry.vertices.shift();

        const line = new THREE.Line( geometry, material );
        line.rotation.y = DTR(90);
        line.rotation.y = DTR(ang);
        return line;
    }

    createLineOfLatitude (ang) {
        const radius   = this.offset * Math.cos(DTR(ang));
        const segments = 64;
        const material = new THREE.LineBasicMaterial( { color: ang ? 0x0000ff : 0xff0000 } );
        const geometry = new THREE.CircleGeometry( radius, segments );

        // Remove center vertex
        geometry.vertices.shift();

        const line = new THREE.Line( geometry, material );
        line.rotation.x = DTR(90);
        line.position.y = (this.offset * Math.sin(DTR(ang)))*6500;

        return line;
    }
}

function DTR (degs) {
    return (Math.PI/180) * degs;
}