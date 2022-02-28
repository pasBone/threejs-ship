<template>
  <Renderer
    ref="renderer"
    antialias
    resize
    :orbit-ctrl="{ enableDamping: true }"
  >
    <Camera :position="{ x: 1, y: 0, z: 0 }" />
    <Scene>
      <AmbientLight color="#ffffff"></AmbientLight>
      <GltfModel src="/models/container-ship/scene.gltf" />
    </Scene>
  </Renderer>
</template>


<style>

#app{
  height: 100vh;
  width: 100vw;
}
</style>
<script>
export default {
  mounted() {
  
  },
};
</script>
