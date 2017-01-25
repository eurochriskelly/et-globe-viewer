/**
 * Created by ckelly on 1/18/17.
 */
class EtGlobe {

    constructor (radius) {
        this.radius = radius;
        this.haveMarks = [];
        this.gmarks = new GlobeMarkings();
    }

    createSphere () {
        var sphereMaterial =
            new THREE.MeshLambertMaterial({
                color: 0xCCCCCC
            });

        return new THREE.Mesh(
            new THREE.SphereGeometry(this.radius, 48, 48),
            sphereMaterial
        );
    }

    _createAxes (length) {
        var axes = new THREE.Object3D();

        axes.add(createAxis(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(length, 0, 0),
            'red', false)); // +X

        axes.add(createAxis(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(-length, 0, 0),
            'red', true)); // -X

        axes.add(createAxis(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, length, 0),
            'blue', false)); // +Y

        axes.add(createAxis(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, -length, 0),
            'blue', true)); // -Y

        axes.add(createAxis(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, length),
            'green', false)); // +Z

        axes.add(createAxis(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, -length),
            'green', true)); // -Z

        return axes;

        function createAxis (src, dst, colorHex, dashed) {
            var geom = new THREE.Geometry(), mat;

            if (dashed) {
                mat = new THREE.LineDashedMaterial({
                    linewidth: 3,
                    color: colorHex,
                    dashSize: 3,
                    gapSize: 3
                });
            }
            else {
                mat = new THREE.LineBasicMaterial(
                    {
                        linewidth: 3,
                        color: colorHex
                    });
            }

            geom.vertices.push(src.clone());
            geom.vertices.push(dst.clone());
            // This one is SUPER important, otherwise
            // dashed lines will appear as simple plain
            // lines
            geom.computeLineDistances();

            return new THREE.Line(geom, mat, THREE.LinePieces);
        }
    };

    markCoordinate (coord, color) {
        var col;
        switch (color) {
            case 'red' :
                col = 0xFF2222;
                break;
            default:
                col = 0x000000;
                break;
        }

        var sphereMaterial =
            new THREE.MeshLambertMaterial({color: col});

        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(this.radius / 250, 8, 8),
            sphereMaterial
        );

        mesh.position.x = coord[0];
        mesh.position.y = coord[1];
        mesh.position.z = coord[2];
        return mesh;
    }

    addMarks (marks, color) {
        marks.forEach(m => {
            this.haveMarks.push({
                coord: m,
                color : color
            });
        });
    }

    get lookFrom () {
        const camdist = this.radius * 1.4;
        return [camdist, camdist, camdist]
    }

    getSceneGeometry () {
        // Add geometry
        const marks = this.haveMarks.map(m => {
            return this.markCoordinate(m.coord, m.color)
        });

        return [
            this._createAxes(this.radius*1.3),
            this.createSphere(this.radius) ]
            .concat(this.gmarks.getMarkings(this.radius))
            .concat(marks);
    }
}
