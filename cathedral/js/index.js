var scene, camera, renderer ;
var sphere ;
var lastDate = new Date() ;

init();
animate();

function init() {
  
  scene = new THREE.Scene();
                                                                    // 1,19.5
  camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 29.5);
  
  camera.position.set(0,0,14);
  scene.add(camera);
                                        // 5,10,90
  var geometry = new THREE.SphereGeometry(5,1,1);
  var material = new THREE.MeshBasicMaterial({
    color:0xffccf,
    wireframe:true
  });
  
  sphere = new THREE.Mesh(geometry,material);
  scene.add(sphere);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x00000F);
  renderer.setSize(innerWidth,innerHeight);
  document.body.appendChild(renderer.domElement);
  
}

function animate() {

  var now = new Date();
  var delay = now - lastDate;
  lastDate = now;
                              // speed
  sphere.rotation.y += delay * 0.0005;

  requestAnimationFrame( animate );
  renderer.render( scene, camera );

}