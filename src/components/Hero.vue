<template>
    <section class="hero">
        <figure class="logo">
            <img src="/assets/img/logo.png"/>
        </figure>
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
        height:689px;

        background-position:center;
        background-size:cover;
        background-image:url(/assets/img/hero.jpg);
        position: relative;

        @media (max-width:560px) {
            height:auto;
            padding:50px 0;
        }

        .logo {
            animation-name: pulse;
            animation-duration: 10s;
            /*animation: pulse 4s 5s infinite;*/
            animation-iteration-count:infinite;

            @media (min-width:560px) {

                position:absolute;
                left:0;
                right:0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            img {

                @media (max-width:560px) {
                    width:100%;
                }
            }
        }
    }

    @keyframes pulse {
        0% {
        }
        50% {
            transform:translateY(-10px);
        }
        100% {
        }
    }
</style>