import Tools from './tools';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

export default class Matrix extends Tools {
  constructor(options) {
    super();
    this.animateID = 0;
    this.resources = new Set();
    this.options = options;
    this.scene = new THREE.Scene();
  }

  // 初始化
  initial(selector) {
    const { options } = this;
    const sphere = new THREE.IcosahedronGeometry(1, 30);
    const material = new THREE.MeshPhongMaterial({ color: 0xff00ff, transparent: true, opacity: 0 });
    this.container = this.isDOM(selector) ? selector : document.getElementById(selector);

    this.sphere = sphere;
    this.material = material;
    this.buildCamera(options.camera);
    this.createRenderer(options); // 渲染器
    this.createLabelRenderer(options); // label标签渲染器
    this.createControls(options.controls); // 控制器
    this.statsHelper(options.stats);
    this.axisHelper(options.axis);
    this.EventResize();
    this.handleClick();
    this.animation();
  }

  // 容器尺寸
  getSize() {
    const { container } = this;
    return { width: container.offsetWidth, height: container.offsetHeight };
  }

  /**
   * 新增模型组
   * @param {String} name 组名
   * @returns
   */
  addGroup(name = 'group') {
    const group = new THREE.Group();
    group.name = name;
    return group;
  }

  /**
   * 新增3D对象
   * @param {*} name 对象名称
   * @returns
   */
  addObject3D(name = 'object3D') {
    const object = new THREE.Object3D();
    object.name = name;
    return object;
  }

  /**
   * 构建相机
   * @param {*} params
   */
  buildCamera(params = {}) {
    let camera = null;
    const offset = this.getSize(),
      { type = 'perspective', near = 1, far = 1000, position = [0, 0, 0] } = params;
    if (type === 'perspective') {
      const aspect = offset.width / offset.height;
      camera = new THREE.PerspectiveCamera(params.fov || 45, aspect, near, far);
    } else {
      const halfWidth = offset.width / 2,
        halfHeight = offset.height / 2;
      camera = new THREE.OrthographicCamera(-halfWidth, halfWidth, halfHeight, -halfHeight, near, far);
    }

    camera.position.set(...position);
    this.camera = camera;
    this.scene.add(camera);
    this.cameraHelper(camera, params.helper || false);
  }

  // 创建渲染器
  createRenderer() {
    const { options, container } = this;
    const offset = this.getSize();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
      premultipliedAlpha: false,
      depthWrite: false,
      preserveDrawingBuffer: true,
    });

    // renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize(offset.width, offset.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    if (options.shadow) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    if (options.onRender) {
      options.onRender(renderer);
    }
    this.renderer = renderer;
    return renderer;
  }

  // 创建2D渲染器
  createLabelRenderer() {
    const { options, container } = this;
    if (options.labelRender) {
      const offset = this.getSize();
      const styles = 'position: absolute; top: 0; pointer-events: none';
      const labelRenderer = new CSS2DRenderer();

      labelRenderer.setSize(offset.width, offset.height);
      labelRenderer.domElement.setAttribute('style', styles);
      options.onLabelRender && options.onLabelRender(labelRenderer);
      container.appendChild(labelRenderer.domElement);
      this.labelRenderer = labelRenderer;
      return labelRenderer;
    }
  }

  // 创建控制器
  createControls(params = {}) {
    const { camera, renderer } = this;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableDamping = false;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = params.rotate || 0.9;
    controls.maxDistance = params.distance || 30000;
    controls.maxPolarAngle = Math.PI / 2;
    params.setController && params.setController(controls);
    this.controls = controls;
  }

  // 生成HTML标签
  addElementLabel(data, visible = false) {
    const group = this.addGroup('labelText');
    const sphere = new THREE.IcosahedronGeometry(1, 30);
    const material = new THREE.MeshPhongMaterial({ color: 0xff00ff, transparent: true, opacity: 0 });

    data.forEach(item => {
      if (!item) return;
      const objectMesh = new THREE.Mesh(sphere, material),
        objectLabel = new CSS2DObject(item.html);
      objectMesh.position.copy(item.point);
      objectLabel.position.copy(objectMesh.position);
      objectLabel.name = item.name;
      objectLabel.visible = visible;
      group.add(objectMesh);
      group.add(objectLabel);
    });
    return group;
  }

  // 生成HTML标签
  addElementTag(data, visible = true) {
    if (!data) return;
    const { sphere, material } = this;
    const objectMesh = new THREE.Mesh(sphere, material);
    const objectLabel = new CSS2DObject(data.html);
    objectMesh.position.copy(data.point);
    objectLabel.position.copy(objectMesh.position);
    objectLabel.visible = true;
    objectLabel.name = data.name;
    return [objectMesh, objectLabel];
  }

  // 创建自然光
  addAmbientLight(color = 0xffffff, rate = 0.5) {
    const ambientLight = new THREE.AmbientLight(color, rate);
    this.scene.add(ambientLight);
  }

  // 创建点光灯
  addPointLight(params = [0xffffff, 1, 100], position = [10, 10, 10]) {
    const light = this.tracker(new THREE.PointLight(...params));
    light.position.set(...position);
    this.scene.add(light);
    this.pointLightHelper(light, this.options.helper);
  }

  // 创建聚光灯
  addSpotLight(params = [0xffffff, 1, 100], position = [0, 2, 0]) {
    const { options } = this,
      light = this.tracker(new THREE.SpotLight(...params));
    light.position.set(...position);
    if (options.shadow) {
      light.castShadow = true;
      light.angle = Math.PI / 4;
      // light.penumbra = 1
      light.shadow.mapSize.width = 1024;
      light.shadow.mapSize.height = 1024;
      // light.shadow.camera.focus = 1
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 500;
      light.intensity = 0.3;
    }
    this.scene.add(light);
    this.spotLightHelper(light, options.helper);
  }

  // 加载贴图
  loadTexture(image) {
    return new THREE.TextureLoader().load(image);
  }

  // JSON加载器
  loadObjectJSON(path, callback) {
    const { isFunc, parser } = this,
      loader = new THREE.FileLoader(),
      error = err => this.dispatchEvent('error', err),
      success = res => this.dispatchEvent('success', isFunc(callback) ? callback(parser(res)) : parser(res)),
      progress = res => this.dispatchEvent('progress', res);
    loader.load(path, success, progress, error);
  }

  // 改变相机位置
  setlookAt(point) {
    const { camera } = this;
    new TWEEN.Tween(camera.position).to(point, 500).start();
  }

  // 相机巡航
  cruiseAround(step = 0.1, infinite = true) {
    let aId = 0,
      count = 0;
    const { isNum, camera, options } = this,
      { position = [] } = options.camera || {},
      x = position[0],
      z = position[2],
      round = Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2)) * 100000) / 100000,
      angle = (Math.atan(z / x) * 180) / Math.PI,
      animation = () => {
        const rotate = angle + count,
          LocateX = Math.ceil(round * Math.cos((Math.PI * rotate) / 180) * 100000) / 100000,
          LocateZ = Math.ceil(round * Math.sin((Math.PI * rotate) / 180) * 100000) / 100000;
        camera.position.x = LocateX;
        camera.position.z = LocateZ;
        camera.updateProjectionMatrix();
        count = count + step;
        aId = requestAnimationFrame(animation);
        if (isNum(infinite) && count >= infinite) cancelAnimationFrame(aId);
      };

    return {
      start: () => {
        count = 0;
        cancelAnimationFrame(aId);
        new TWEEN.Tween(camera.position)
          .to({ x: position[0], y: position[1], z: position[2] }, 500)
          .onComplete(() => setTimeout(() => animation(), 500))
          .start();
      },
      stop: () => cancelAnimationFrame(aId),
      goon: () => setTimeout(() => animation(), 100),
    };
  }

  // 渲染动画
  animation() {
    const { scene, camera } = this;
    if (!scene || !camera) return false;

    const animation = () => {
      // this.updater();
      this.controls.update();
      // this.dispatchEvent('animate', this);
      this.renderer.render(scene, camera);
      this.labelRenderer && this.labelRenderer.render(scene, camera);
      this.animationID = requestAnimationFrame(animation);
      camera.updateProjectionMatrix();
      TWEEN.update();
    };

    animation();
  }

  // 模型居中
  setCenter(mesh) {
    const { options } = this,
      box = new THREE.Box3().setFromObject(mesh),
      size = box.getSize(new THREE.Vector3()),
      center = box.getCenter(new THREE.Vector3()),
      maxAxis = Math.max(size.x, size.y, size.z);
    mesh.scale.multiplyScalar(16 / maxAxis);
    box.setFromObject(mesh);
    box.getCenter(center);
    box.getSize(size);
    mesh.position.copy(center).multiplyScalar(-1);
    this.box3Helper(box, options.helper);
    return mesh;
  }

  // 模型中心点
  getCenter(mesh, times = [1, 1, 1]) {
    const box = new THREE.Box3().setFromObject(mesh);
    const locate = box.getCenter(new THREE.Vector3());
    return {
      x: locate.x * times[0],
      y: locate.y * times[1],
      z: locate.z * times[2],
      maxX: box.max.x,
      maxY: box.max.y,
      maxZ: box.max.z,
    };
  }

  // 更新器
  updater() {
    this.stats && this.stats.update();
  }

  // 跟踪器
  tracker(obj) {
    if (!obj) return obj;
    if (Array.isArray(obj)) {
      obj.forEach(item => this.tracker(item));
      return obj;
    }

    if (obj.dispose || obj instanceof THREE.Object3D) {
      this.resources.add(obj);
    }

    if (obj instanceof THREE.Object3D) {
      this.tracker(obj.geometry);
      this.tracker(obj.material);
      this.tracker(obj.children);
    } else if (obj instanceof THREE.Material) {
      for (const value of Object.values(obj)) {
        if (value instanceof THREE.Texture) this.tracker(value);
      }

      if (obj.uniforms) {
        for (const value of Object.values(obj.uniforms)) {
          if (value) {
            const uniformValue = value.value;
            if (uniformValue instanceof THREE.Texture || Array.isArray(uniformValue)) {
              this.tracker(uniformValue);
            }
          }
        }
      }
    }
    return obj;
  }

  // 窗口改变
  EventResize() {
    const { camera, throttle, renderer, container, labelRenderer } = this,
      resizeHandler = throttle(event => {
        setTimeout(() => {
          const containerWidth = container.offsetWidth;
          const containerHeight = container.offsetHeight;

          camera.aspect = containerWidth / containerHeight;
          renderer.setSize(containerWidth, containerHeight);
          labelRenderer && labelRenderer.setSize(containerWidth, containerHeight);
          camera.updateProjectionMatrix();

          this.dispatchEvent('resize', event);
        }, 50);
      }, 50);

    window.addEventListener('resize', resizeHandler, false);
  }

  // 双击事件
  handleClick() {
    const { isMobile, renderer } = this;
    const eventName = isMobile() ? 'touchstart' : 'dblclick';

    const EventHandler = event => {
      this.dispatchEvent('douberTouch', this.getObjectBySite(event) || {});
    };
    renderer.domElement.addEventListener(eventName, EventHandler, false);
  }

  getObjectBySite(event) {
    let startX = 0;
    let startY = 0;

    let intersects = null;
    const { camera, object, container, isMobile } = this;
    const range = container.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    if (isMobile()) {
      startX = event.touches[0].pageX;
      startY = event.touches[0].pageY;
    } else {
      startX = event.clientX;
      startY = event.clientY;
    }
    const offsetTop = startY - range.top;
    const offsetLeft = startX - range.left;

    if (!object) return;
    mouse.x = (offsetLeft / range.width) * 2 - 1;
    mouse.y = -(offsetTop / range.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(object.children, true);
    if (!intersects[0]) return false;
    if (!intersects[0].object) return false;
    return intersects[0].object;
  }

  // 点光源辅助
  pointLightHelper(obj, visible) {
    if (visible) {
      const helper = new THREE.PointLightHelper(obj, 5);
      this.scene.add(helper);
    }
  }

  // 聚光灯辅助
  spotLightHelper(obj, visible) {
    if (visible) {
      const helper = this.tracker(new THREE.SpotLightHelper(obj, 5));
      this.scene.add(helper);
    }
  }

  // 相机helper
  cameraHelper(obj, visible = false) {
    if (visible) {
      const helper = new THREE.CameraHelper(obj);
      this.scene.add(helper);
    }
  }

  // 性能指标
  statsHelper(visible = false) {
    if (visible) {
      const stats = new Stats();
      this.container.appendChild(stats.dom);
      stats.dom.style.position = 'absolute';
      this.stats = stats;
    }
  }

  // box3的辅助
  box3Helper(obj, visible = false) {
    if (visible) {
      const helper = this.tracker(new THREE.Box3Helper(obj, 0xffff00));
      this.scene.add(helper);
    }
  }

  // 坐标轴
  axisHelper(visible = false) {
    if (visible) {
      const axesHelper = new THREE.AxesHelper(5);
      this.scene.add(axesHelper);
    }
  }

  // 操作指导
  guiHelper(data, visible = false) {
    const { isUndef } = this;
    if (isUndef(data)) return;
    if (visible) {
      const gui = new GUI();
      data.forEach(item => gui.add(item.params, item.name).onChange(item.change));
      gui.open();
      this.gui = gui;
    }
  }

  // 清除模型
  clear() {
    const { object, animationID } = this;
    if (!this.renderer) return;
    const gl = this.renderer.domElement.getContext('webgl');
    gl && gl.getExtension('WEBGL_lose_context').loseContext();
    cancelAnimationFrame(animationID);

    this.tracker(object);
    this.scene.clear();
    this.scene.remove();
    this.renderer.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.clearEventListener();
    this.renderer.content = null;
    this.renderer.domElement = null;
    this.renderer.info.reset();
    this.resources.forEach(item => {
      if (item.dispose) item.dispose();
      if (item instanceof THREE.Object3D) object.remove(item);
    });
    this.resources.clear();
    this.object.remove();
  }
}
