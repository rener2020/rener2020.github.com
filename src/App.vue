<template>
    <!-- header nav -->
    <IndexNav /> <!-- 传递数据到 "header" 组件 -->
    <!-- content -->
    <div class="container text-left">
        <!-- main -->
        <div class="row">
            <div class="col-md-2">
                <!-- catalogue -->
                <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary catalogue">
                    <div class="list-group list-group-flush border-bottom scrollarea" id="catalogue">
                        <!-- catalogue one -->
                        <a :href="'#' + item.name" @click="view_note(item.download_url)"
                            class="list-group-item list-group-item-action py-3 lh-sm " v-for="(item) in catalogue">
                            <div class="d-flex w-100 align-items-center justify-content-between">
                                <strong class="mb-1">{{ item.name }}</strong>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-md-10" id="content" v-html="note_content">
            </div>
        </div>
    </div>
    <!-- maybe have foot -->
</template>

<script>
import IndexNav from "./components/header.vue";


function get_catalogue_from_url() {
    console.log("get_catalogue_from_url")
    const catalogue_url = "https://api.github.com/repos/rener2020/note/contents/SLAM/orbslam";
    return fetch(catalogue_url)
        .then(response => response.json())
        .then(data => {
            const catalogue = data
                .filter(element => element['download_url'] !== null)
                .map(element => ({
                    'name': element['name'].substr(0, element['name'].length - 3),
                    'download_url': element['download_url']
                }))
            return catalogue;
        });
}

export default {
    mounted() {
        this.init();
    },
    components: {
        IndexNav: IndexNav,
    },
    data() {
        return {
            catalogue: null,// 设置初始值
            note_content: null,
        };
    },
    methods: {
        async init() {
            // console.log()  // 输出当前路由信息
            var catalogue = this.get_catalogue_from_cookie();
            if (!catalogue) {
                catalogue = await get_catalogue_from_url();
                // set catalogue to cookie
                this.$cookies.set("catalogue", JSON.stringify(catalogue));
                console.log("Cookie set successfully");
                console.log(JSON.stringify(catalogue));
                console.log(this.$cookies.get("catalogue"));
            }
            this.catalogue = catalogue;
            var note_name = decodeURIComponent(window.location.hash.slice(1));
            var note = catalogue.find(element => element.name === note_name);
            if (note) {
                // 显示路由文章
                this.view_note(note.download_url);
            } else {
                // 显示第一篇文章
                this.view_note(catalogue[0].download_url);
            }
        },

        get_catalogue_from_cookie() {
            console.log("get_catalogue_from_cookie");
            return this.$cookies.get('catalogue');
        },
        async view_note(note_url) {

            fetch(note_url)
                .then(response => response.text())
                .then(async text => {
                    // 使用正则表达式进行替换
                    const replacedText = text.replace(/\!\[([^\]]+)\]\(\.\/([^\)]+)\)/g, "![\$1](https://raw.githubusercontent.com/rener2020/note/main/SLAM/orbslam/\$2)");
                    this.note_content = this.$markjax.render(replacedText);
                });
        }
    },
    watch: {

    },
};
</script>

<style>
img {
    max-width: 100%;
    /* 图片的最大宽度为父元素的宽度 */
    height: auto;
    /* 高度自动调整以保持纵横比 */
}
</style>
