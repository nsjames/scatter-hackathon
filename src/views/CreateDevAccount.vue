<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">

            <!-- SCATTER AUTHENTICATION -->
            <section class="box" v-if="!scatter">
                <h2>Doesn't look like you have Scatter.</h2>
                <p>
                    You will need Scatter installed to create accounts and teams.<br>
                    Scatter will allow you to authenticate with Hack Til Dawn without passwords.
                </p>

                <a href="https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle" target="_blank" class="button">Scatter on <b>Chrome Store</b></a>
            </section>

            <section class="box" v-if="scatter && !identity">
                <h2>Scatter Detected.</h2>
                <p>
                    You will need an Identity, if you don't have one yet open up Scatter and create one.
                </p>

                <figure class="button" @click="authenticateWithScatter()">Authenticate with <b>Scatter</b></figure>
            </section>

            <section class="box" v-if="scatter && identity">
                <h2>Scatter Authenticated.</h2>
                <p>
                    Scatter uses asymmetric encryption to authenticate you with websites.<br>
                    No more password inputs, not more basic information inputs at all.
                </p>
                <hr/>
                <h3>{{teamMember.name}}</h3>
                <h1 style="margin-top:10px;">{{teamMember.publicKey}}</h1>
                <div style="height:20px;"></div>
            </section>



            <!-- TEAM MEMBER TYPE -->
            <section class="box">
                <h2>What are you?</h2>
                <p>Even if you are a jack of all trades try to pick something you excel at more than the rest.</p>
                <div style="height:40px"></div>
                <section class="type-box" @click="changeType(tmt.HACKER)" :class="{'blue-back':teamMember.type === tmt.HACKER}">
                    <h1>Hacker</h1>
                    <p>The Developer</p>
                </section>

                <section class="type-box" @click="changeType(tmt.DOODLER)" :class="{'blue-back':teamMember.type === tmt.DOODLER}">
                    <h1>Doodler</h1>
                    <p>The Designer</p>
                </section>

                <section class="type-box" @click="changeType(tmt.BIGMOUTH)" :class="{'blue-back':teamMember.type === tmt.BIGMOUTH}">
                    <h1>Big Mouth</h1>
                    <p>The Marketer</p>
                </section>
            </section>



            <!-- BIO -->
            <section class="box">
                <h2>Who are you?</h2>
                <p>Give a brief description of who you are and what you do. Keep it light and fun.</p>
                <div style="height:40px"></div>
                <textarea class="description" v-model="teamMember.bio"></textarea>
                <figure class="box-footer">{{teamMember.bio.length}}/500 characters</figure>
            </section>


            <!-- SOURCES -->
            <section class="box">
                <h2>Got Sources?</h2>
                <p>Add some kind of source for yourself.<br> It can be your portfolio, github, twitter, a telegram link, whatever but you must have at least one.</p>
                <div style="height:40px"></div>
                <section class="links">
                    <input v-for="(link, index) in teamMember.links" class="link" placeholder="http://www..." v-model="link.url" />
                </section>
                <figure class="box-footer" style="cursor:pointer;" @click="addSource()" v-if="teamMember.links.length < 5"><u>add another</u></figure>
            </section>

            <section class="box blank">
                <figure class="button" :class="{'disabled':!identity}" @click="register()"><b>Sign</b> me up!</figure>
            </section>

            <section class="box" v-if="error">
                <p>{{error}}</p>
            </section>

            <div style="height:200px;"></div>
        </section>



    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    import User from '../models/User'
    import {UserTypes} from '../models/User'
    import Link from '../models/Link'

    export default {
        data(){ return {
            teamMember:new User(),
            tmt:UserTypes,
            error:null
        }},
        computed: {
            ...mapState([
                'scatter',
                'identity'
            ])
        },
        mounted(){
            this.teamMember.links = [new Link()];
            this.teamMember.type = UserTypes.HACKER;
            setTimeout(() => {
                if(this.identity) {
                    this.teamMember.name = this.identity.name;
                    this.teamMember.publicKey = this.identity.publicKey;
                }
            }, 200);
        },

        methods: {
            addSource(){ this.teamMember.links.push(new Link()) },
            changeType(type){ this.teamMember.type = type; },
            authenticateWithScatter(){
                this.scatter.getIdentity([]).then(identity => {
                    if(identity) this[Actions.SET_IDENTITY](identity);
                });
            },
            register(){
                this.error = null;

                if(!this.scatter || !this.identity) return false;

                if(this.teamMember.bio.length < 100) {
                    this.error = 'Your bio must be at least 100 characters long';
                    return false;
                }

                this.teamMember.links = this.teamMember.links.filter(link => link.url.length);
                if(!this.teamMember.links.length){
                    this.teamMember.links.push(new Link());
                    this.error = 'You must have at least one source';
                    return false;
                }


            },
            ...mapActions([
                Actions.SET_IDENTITY
            ])
        },
        watch:{
            teamMember:{
                handler(a,b){
                    if(this.teamMember.bio.length > 500) this.teamMember.bio = this.teamMember.bio.substr(0,500);
                },
                deep:true
            },
            identity(){
                if(this.identity) {
                    this.teamMember.name = this.identity.name;
                    this.teamMember.publicKey = this.identity.publicKey;
                }
            }
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

    .type-box {
        width: 100%;
        border-radius: 4px;
        padding: 30px;
        text-align: left;
        margin-bottom: 10px;
        border: 1px solid #478af7;
        color: #478af7;
        overflow: hidden;
        font-family: 'Open Sans', sans-serif;
        cursor: pointer;

        h1 {
            font-size: 24px;
            font-weight: 800;
            line-height: 12px;
        }

        p {
            font-size:12px;
            color:#478af7;
            margin-top:10px;
            display:block;
        }

        &.blue-back {
            background: #478af7;
            color: #fff;

            p { color:#fff; }
        }

        &:last-child {
            margin-bottom:0;
        }

    }

    textarea {
        &.description {
            height:200px;
            width:100%;
            resize: none;
            border-radius:4px;
            border:1px solid #478af7;
            padding:20px;
            background:transparent;
            outline:0;
            font-size:18px;
            color:#7d7d7d;
            font-family: 'Raleway', sans-serif;
        }
    }

    input {
        &.link {
            height:56px;
            line-height:56px;
            width:100%;
            border-radius:4px;
            border:1px solid #478af7;
            padding:0 20px;
            background:transparent;
            outline:0;
            font-size:18px;
            color:#7d7d7d;
            font-family: 'Raleway', sans-serif;
            margin-bottom:10px;

            &:last-child {
                margin-bottom:0;
            }
        }
    }

    .box-footer {
        font-size:13px;
        color:#7d7d7d;
        text-align:right;
        width:100%;
        font-weight:500;
        margin-top:5px;
    }
</style>