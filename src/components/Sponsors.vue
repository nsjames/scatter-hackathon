<template>
    <section>
        <section class="sponsor-head">{{title}}</section>
        <section class="sponsors">
            <section class="sponsor" v-for="sponsor in sponsors">
                <a :href="sponsor.url" target="_blank">
                    <figure class="img" :style="{ backgroundImage: `url(${sponsor.img})` }"></figure>
                </a>
                <section class="info">
                    <figure class="name"><b>{{sponsor.name}}</b>{{sponsor.name2}}</figure>
                    <figure v-if="sponsor.url" class="url"><a :href="sponsor.url" target="_blank">{{sponsor.url}}</a></figure>
                </section>
                <figure class="bio">{{sponsor.bio}}</figure>
            </section>
        </section>
    </section>
</template>
<script>
    export default {
        data(){ return {

        }},
        props:['title','sponsors']
    }
</script>
<style>

</style>