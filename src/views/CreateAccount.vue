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
                <h3>{{user.name}}</h3>
                <h1 style="margin-top:10px;">{{user.publicKey}}</h1>
                <div style="height:20px;"></div>
            </section>



            <!-- TEAM MEMBER TYPE -->
            <section class="box">
                <h2>What are you?</h2>
                <p>
                    Voters can not be part of teams, and Hackers, Doodlers and Big Mouths ( Team Members ) can not vote.
                    You can not switch between being a Voter user and a Team Member user later. You <i>will</i> be able to switch between the Team Member user types though.
                </p>
                <div style="height:40px"></div>

                <section class="type-box" @click="changeType(userTypes.VOTER)" :class="{'blue-back':user.type === userTypes.VOTER}">
                    <figure class="type">Voter</figure>
                    <figure class="text">You may only vote on projects</figure>
                </section>

                <section class="type-box" @click="changeType(userTypes.HACKER)" :class="{'blue-back':user.type === userTypes.HACKER}">
                    <figure class="type">Hacker</figure>
                    <figure class="text">The Developer</figure>
                </section>

                <section class="type-box" @click="changeType(userTypes.DOODLER)" :class="{'blue-back':user.type === userTypes.DOODLER}">
                    <figure class="type">Doodler</figure>
                    <figure class="text">The Designer</figure>
                </section>

                <section class="type-box" @click="changeType(userTypes.BIGMOUTH)" :class="{'blue-back':user.type === userTypes.BIGMOUTH}">
                    <figure class="type">Big Mouth</figure>
                    <figure class="text">The Marketer</figure>
                </section>
            </section>



            <!-- BIO -->
            <section class="box" v-if="user.type !== userTypes.VOTER">
                <h2>Who are you?</h2>
                <p>Give a brief description of who you are and what you do. Keep it light and fun.</p>
                <div style="height:40px"></div>
                <textarea class="description" v-model="user.bio"></textarea>
                <figure class="box-footer">{{user.bio.length}}/500 characters</figure>
            </section>


            <!-- SOURCES -->
            <section class="box" v-if="user.type !== userTypes.VOTER">
                <h2>Got Sources?</h2>
                <p>Add some kind of source for yourself.<br> It can be your portfolio, github, twitter, a telegram link, or anything else.</p>
                <div style="height:40px"></div>
                <section class="links">
                    <input v-for="(link, index) in user.links" class="link" placeholder="http://www..." v-model="link.url" />
                </section>
                <figure class="box-footer" style="cursor:pointer;" @click="addSource()" v-if="user.links.length < 5"><u>add another</u></figure>
            </section>

            <section class="recaptcha">
                <!--<div class="g-recaptcha" data-sitekey="" data-callback="recatch"></div>-->
                <recaptcha @verify="recatch" sitekey="6LcCMFYUAAAAANjC_Xi2UwLFDIIyvxOKeBC9hZe5"></recaptcha>
            </section>

            <section class="box blank">
                <figure class="button" :class="{'disabled':!identity || !recaptcha}" @click="register()"><b>Sign</b> me up!</figure>
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

    import ecc from 'eosjs-ecc'
    import ContractService from '../services/ContractService';

    export default {
        data(){ return {
            recaptcha:false,
            user:new User(),
            userTypes:UserTypes,
            error:null
        }},
        computed: {
            ...mapState([
                'scatter',
                'identity'
            ])
        },
        mounted(){
            this.user.links = [new Link()];
            this.user.type = UserTypes.VOTER;
            setTimeout(() => {
                if(this.identity) {
                    this.user.name = this.identity.name;
                    this.user.key = this.identity.publicKey;
                }
            }, 200);
        },

        methods: {
            recatch(args){
                this.recaptcha = ecc.sha256(args);
            },
            addSource(){ this.user.links.push(new Link()) },
            changeType(type){ this.user.type = type; },
            authenticateWithScatter(){
                this.scatter.getIdentity([]).then(identity => {
                    if(identity) this[Actions.SET_IDENTITY](identity);
                });
            },
            register(){
                this.error = null;

                if(!this.scatter || !this.identity) return false;
                if(!this.recaptcha) return false;

                this.user.links = this.user.links.filter(link => link.url.length);

                if(this.user.type !== UserTypes.VOTER && this.user.bio.length < 100)
                    return this.error = 'Your bio must be at least 100 characters long';

                ContractService.getSignature(this.scatter, this.identity.publicKey).then(async sig => {
                    if(!sig) return this.error = 'Could not get signature';

                    const created = await ContractService.createUser(this.user, sig, this.identity.hash).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });

                    const user = await ContractService.getUserFromPublicKey(this.identity.publicKey).catch(() => {});
                    if(!user) return this.error = 'There seems to have been a problem creating this user. Try again.'

                    this[Actions.SET_USER](user);
                    if(this.user.type === UserTypes.VOTER) this.$router.push({name:RouteNames.TEAMS});
                    else this.$router.push({name:RouteNames.TEAMS});
                });
            },
            ...mapActions([
                Actions.SET_IDENTITY,
                Actions.SET_USER,
            ])
        },
        watch:{
            user:{
                handler(a,b){
                    if(this.user.bio.length > 500) this.user.bio = this.user.bio.substr(0,500);
                },
                deep:true
            },
            identity(){
                if(this.identity) {
                    this.user.name = this.identity.name;
                    this.user.key = this.identity.publicKey;
                }
            }
        }
    }
</script>

<style lang="scss">
    .recaptcha {
        text-align:center;
        margin-bottom:20px;
        * {
            display: inline-block;
        }
    }
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

        .type {
            font-size: 24px;
            font-weight: 800;
            line-height: 12px;
        }

        .text {
            font-size:12px;
            color:#478af7;
            margin-top:10px;
            display:block;
        }

        &.blue-back {
            background: #478af7;
            color: #fff;

            .text { color:#fff; }
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
</style>