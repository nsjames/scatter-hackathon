<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">
            <section class="box">
                <h2>Are you looking to join a team?</h2>
                <p>After you have created an account you can either create a team or request to join an existing one.</p>

                <router-link :to="{name:routeNames.CREATE_DEV}" class="button"><b>Create</b> Your Account</router-link>
            </section>

            <section class="search-bar">
                <input placeholder="Type in some words to find common interests.." />
            </section>

            <section class="teams">
                <section class="team">
                    <section class="top">
                        <h2>Are you looking to join a team?</h2>
                        <h3>4 Members, 2 hackers, 1 doodler, 1 big mouth.</h3>
                        <p>After you have created an account you can either create a team or request to join an existing one.</p>
                    </section>
                    <section class="bottom">
                        <section class="tags">
                            <figure class="tag-head">Related Tags</figure>
                            <figure class="tag" v-for="tag in ['Wallets', 'Browser']">{{tag}}</figure>
                        </section>
                    </section>
                </section>
            </section>

            <div style="height:2000px;"></div>
        </section>



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
                'scatter'
            ])
        },
        mounted(){

        },

        methods: {

            ...mapActions([

            ])
        }
    }
</script>

<style lang="scss">
    .search-bar {
        width:100%;
        border-bottom:1px solid #dbdbdb;
        margin-top:80px;

        input {
            font-size:18px;
            color:#b1b1b1;
            background:transparent;
            border:0;
            outline:0;
            padding-bottom:5px;
            width:100%;
        }
    }

    .teams {
        padding-top:20px;

        .team {
            cursor: pointer;

            .top {
                width:100%;
                border:1px solid #c4c4c4;
                border-bottom:0;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                padding:30px;
                text-align: left;
                overflow: hidden;
                transition: border 0.2s ease;

                h2 {
                    font-family: 'Raleway',sans-serif;
                    font-size: 24px;
                    font-weight: 800;
                }

                h3 {
                    font-size:11px;
                    color:#929292;
                    font-family: 'Open Sans', sans-serif;
                    font-weight:300;
                    margin-top:3px;
                }

                p {
                    color:#8a8a8a;
                    font-size:16px;
                    margin-top:15px;
                }
            }

            .bottom {
                width:100%;
                border:1px solid #c4c4c4;
                border-top:0;
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                padding:30px;
                text-align: left;
                margin-bottom: 20px;
                overflow: hidden;
                background:#f8f8f8;
                transition: border 0.2s ease;
            }

            &:hover {
                .top, .bottom {
                    border:1px solid #478af7;
                }

                .top { border-bottom:0; }
                .bottom { border-top:0; }
            }

            &:active {
                .top, .bottom {
                    border:1px solid #c4c4c4;
                }

                .top { border-bottom:0; }
                .bottom { border-top:0; }
            }
        }
    }
</style>