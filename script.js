var World = (function(){

    var scene, camera, renderer, sphere, mesh, points;

    return {
        
        // Sets up the scene

        init: function() {
            World.windowResize();
            World.initScene();
            World.initRenderer();
            World.initCamera();
            World.initLights();
            World.loadModels();
            World.animate();
        },

        // Create the scene and get the guscene size
        initScene: function(){
            scene = new THREE.Scene();
        },

        // Create a renderer and add it to the DOM
        initRenderer: function(){
            renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.BasicShadowMap;
            document.body.appendChild(renderer.domElement);
            renderer.domElement.id = 'context';
        },

        // Create a camera, zoom it out from the model a bit and add it to the scene
        initCamera: function(){
            camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 400;
            camera.position.x = 0;
            camera.position.y = 0;
            scene.add(camera);
        },

        // Create lights
        initLights: function(){
            var ambientLight = new THREE.AmbientLight( 0xffffff );
            scene.add( ambientLight );

            var directionalLight = new THREE.DirectionalLight( 0xffffff );
            directionalLight.position.x = 5;
            directionalLight.position.y = 5;
            directionalLight.position.z = 5;
            directionalLight.position.normalize();
            scene.add( directionalLight );
        },

        // Load geometry and material assets into scene
        loadModels: function() {
            var geometry = new THREE.IcosahedronGeometry(50, 2);
            var material = new THREE.MeshPhongMaterial({
                color: 0x8b9da9,
                shading: THREE.FlatShading
            });

            sphere = new THREE.Mesh( geometry, material );
            scene.add( sphere );

            var geometry = new THREE.IcosahedronGeometry(50, 1);
            var material = new THREE.MeshPhongMaterial({
                color: 0x8b9da9,
                wireframe: THREE.DoubleSide,
                opacity: 0.3,
                transparent: true 
            });
            mesh = new THREE.Mesh(geometry, material);
            mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.2;
            scene.add( mesh );

            var geometry = new THREE.IcosahedronGeometry(50, 4);
            var material = new THREE.PointsMaterial({
                color: 0xfff6e4,
                sode: THREE.BackSide,
                opacity: 0.7,
                transparent: true
            });

            points = new THREE.Points( geometry, material );
            points.scale.x = points.scale.y = points.scale.z = 5;
            scene.add(points);
        },

        // Renders the scene and updates the render as needed
        animate: function(){
            renderer.render(scene, camera);

            sphere.rotation.y -= 0.001;

            mesh.rotation.z -= 0.001;

            points.rotation.y -= 0.0003;
            points.rotation.x -= 0.0005;
            
            requestAnimationFrame(World.animate);
        },

        // Update canvas on resize
        windowResize: function(){
            window.addEventListener('resize', function(){
                renderer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            });
        },
    }
})();

World.init();