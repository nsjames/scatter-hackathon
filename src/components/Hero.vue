<template>
    <section class="hero">
        <figure class="logo">hackathon</figure>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    export default {
        data(){ return {
            routeNames:RouteNames
        }},
        computed: {
            ...mapState([

            ])
        },
        methods: {
            ...mapActions([

            ])
        }
    }
</script>

<style lang="scss">
    .hero {
        width:100%;
        height:425px;

        background-position:center;
        background-size:cover;
        background-image:url(/assets/img/hero_bg.jpg);
        position: relative;

        .logo {
            margin:0 auto;
            font-size:100px;
            font-weight:100;
            font-family: 'Raleway', sans-serif;
            color:#fff;
            text-shadow:0 5px 4px rgba(0,0,0,0.22);
            text-align:center;
            position: absolute;
            bottom:80px;
            left:0;
            right:0;
        }
    }
</style>