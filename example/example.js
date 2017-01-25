/**
 * Created by ckelly on 1/18/17.
 */

(function () {
    const viewport = new Viewport3D();
    const globe    = new EtGlobe(6500);

    globe.addMarks([[0, 0, 6500]], 'red');
    globe.addMarks([
        [113.44, -226.82, 6495.05],
        [0, -1128.71, 6401.25]
    ]);
    viewport.setup(globe.getSceneGeometry(), globe.lookFrom);
})();
