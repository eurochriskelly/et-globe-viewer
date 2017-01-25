/**
 * Created by ckelly on 1/17/17.
 */

class Viewport3D {

    constructor () {
        this.width = 400;
        this.height = 300;
        this.aspect = this.width / this.height;
        this.near = 1;
        this.far = 100000;
        this.angle = 45;


        this.createScene();
        this.createCamera();
        this.createControls();
        Viewport3D.createLight().forEach(light => this.scene.add(light));
    }

    createRenderer () {
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        return renderer;
    }

    createCamera () {
        this.camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            this.near,
            this.far
        );

        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }

    createScene () {
        this.scene = new THREE.Scene();
    }

    createControls() {
        var controls = new THREE.TrackballControls(this.camera);

        controls.rotateSpeed = 3.0;
        controls.zoomSpeed = 0.3;
        controls.panSpeed = 0.8;

        controls.noZoom = false;
        controls.noPan = false;

        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        controls.keys = [65, 83, 68];

        this.controls = controls;
    }

    static createLight () {
        var lightt = new THREE.PointLight(0xFF0880);
        lightt.position.x = 0;
        lightt.position.y = 10000000;
        lightt.position.z = 0;

        var light = new THREE.PointLight(0xFFFF00);
        light.position.x = 0;
        light.position.y = 0;
        light.position.z = 10000000;

        var lightb = new THREE.PointLight(0xFF00FF);
        lightb.position.x = 0;
        lightb.position.y = 0;
        lightb.position.z = (-1000000);

        var lightA = new THREE.AmbientLight(0x404040);

        return [light, lightb, lightt, lightA];
    }

    setup (geom, cam) {

        geom.forEach(g => this.scene.add(g));

        this.camera.position.set(cam[0], cam[1], cam[2]);

        var renderer = this.createRenderer();
        var render = () => {
            renderer.render(this.scene, this.camera);
        };
        this.controls.addEventListener('change', render);
        var animate = () => {
            requestAnimationFrame(animate);
            render();
            this.controls.update();
        };

        animate();

        document.body.appendChild(renderer.domElement);
    }

}