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
                        <a :href="'#' + item.name" @click="view_note(item.download_url)" class="list-group-item list-group-item-action py-3 lh-sm "
                            v-for="(item) in catalogue">
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
import {marked} from 'marked'

function get_catalogue_from_url() {
    console.log("get_catalogue_from_url")
    const catalogue_url = "https://api.github.com/repos/rener2020/note/contents/SLAM/orbslam";
    return fetch(catalogue_url)
        .then(response => response.json())
        .then(data => {
            const catalogue = data.map(element => ({
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
            catalogue: null ,// 设置初始值
            note_content: null,
        };
    },
    methods: {
        async init() {
            var catalogue = this.get_catalogue_from_cookie();
            if (!catalogue) {
                catalogue = await get_catalogue_from_url();
                // set catalogue to cookie
                this.$cookies.set("catalogue", JSON.stringify(catalogue));
            }
            this.catalogue = catalogue;
        },

        get_catalogue_from_cookie() {
            console.log("get_catalogue_from_cookie");
            return this.$cookies.get('catalogue');
        },
        async view_note(note_url) {
            fetch(note_url)
                .then(response => response.text())
                .then(text => {
                    this.note_content = marked.parse(text);
                    console.log(text);
                })
        }
    },
    watch: {

    },
};
</script>