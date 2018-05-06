<template>
    <section>
        <div ref="fmenu" class="floating-menu-placeholder" :class="{'active':floatMenu}"></div>
        <section class="floating-menu" :class="{'float':floatMenu}">
            <router-link :to="{name:routeNames.INDEX}" class="link">Info</router-link>
            <router-link :to="{name:routeNames.IDEAS}" class="link">Ideas</router-link>
            <router-link :to="{name:routeNames.TEAMS}" class="link">Teams</router-link>
            <router-link :to="{name:routeNames.PROJECTS}" class="link">Projects</router-link>
            <router-link :to="{name:routeNames.RULES_AND_FAQ}" class="link">Rules & FAQ</router-link>
            <router-link v-if="identity" :to="{name:routeNames.DASHBOARD}" class="link">Dashboard</router-link>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    export default {
        data(){ return {
            floatMenu:false,
            routeNames:RouteNames
        }},
        computed: {
            ...mapState([
                'user',
                'identity',
                'team'
            ])
        },
        created () { window.addEventListener('scroll', this.handleScroll); },
        destroyed () { window.removeEventListener('scroll', this.handleScroll); },
        mounted(){ setTimeout(() => this.handleScroll(), 50); },
        methods: {
            handleScroll(){
                const scroll = window.scrollY;
                this.floatMenu = !this.floatMenu
                    ?this.$refs.fmenu.offsetTop-20 < scroll
                    :this.$refs.fmenu.offsetTop+20 < scroll;
            },
            ...mapActions([

            ])
        }
    }
</script>

<style lang="scss">
    .floating-menu-placeholder {
        height:0;

        &.active {
            height:140px;
        }
    }

    .floating-menu {
        height:40px;
        line-height:40px;
        padding:0 25px;
        border-radius:4px;
        border:1px solid #e5e5e5;
        box-shadow:0 1px 2px rgba(0,0,0,0.05);
        display:table;
        margin:50px auto;
        background:#fff;
        transition: box-shadow 0.4s ease;
        z-index:9999;

        &.float {
            position:fixed;
            top:20px;
            right:0;
            left: 50%;
            transform: translateX(-50%);
            margin:0 auto;
            box-shadow: 0 8px 10px rgba(0,0,0,0.04);
        }

        .link {
            cursor: pointer;
            font-size:11px;
            font-weight:500;
            font-family: 'Open Sans', sans-serif;
            color:#cfcfcf;
            display:inline-block;
            margin-right:20px;
            transition:all 0.2s ease;

            &:last-child {
                margin:0;
            }

            &:hover, &.router-link-exact-active {
                color:#478af7;
            }
        }
    }
</style>