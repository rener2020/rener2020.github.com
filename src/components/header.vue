<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32">
        </svg>
        <span class="fs-4">{{ pageTitle }}</span> <!-- 使用数据来显示页面标题 -->
      </a>
      <ul class="nav nav-pills">
        <li class="nav-item"><a href="#" class="nav-link active" aria-current="page" data-custom-html v-html="mail"> </a></li>
        <!-- 使用数据来显示链接文本 -->
        <li class="nav-item"><a :href="githubLink" class="nav-link">GitHub</a></li> <!-- 使用数据来设置GitHub链接 -->
        <li class="nav-item"><a :href="csdnLink" class="nav-link">CSDN</a></li> <!-- 使用数据来设置CSDN链接 -->
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  name: "IndexNav",
  data() {
    return {
      pageTitle: "2Index",
      mail: this.$markjax.render("$1295606692@qq.com$"),
      githubLink: "https://github.com/rener2020",
      csdnLink: "https://blog.csdn.net/qq_36782182",
    };
  },
};
</script>


<style>
[data-custom-html] p {
  /* 样式处理，例如 display: inline; 或 display: block; */
  display: inline;
  /* 这会将<p>标签样式设置为内联元素 */
}
</style>