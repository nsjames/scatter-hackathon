<template>
    <section v-if="loaded">
        <section class="box" v-if="scatter && identity && !user">
            <h2>Sign up for Hack Til Dawn</h2>
            <p>You can either sign up as a participant or a voter.</p>

            <router-link :to="{name:routeNames.CREATE_ACCOUNT}" class="button"><b>Create</b> Your User</router-link>
        </section>
        <section class="box" v-if="scatter && !identity">
            <h2>Scatter Detected.</h2>
            <p>
                Scatter uses Identities to authenticate you with asymmetrical encryption. When you first install Scatter it will
                create an Identity for you with no information inside of it, but which can already provide secure authentication.
            </p>

            <figure class="button" @click="authenticateWithScatter()">Authenticate with <b>Scatter</b></figure>
        </section>
        <section class="box" v-if="!scatter">
            <h2>Doesn't look like you have Scatter.</h2>
            <p>
                You will need Scatter installed to participate in the hackathon as a team member or a voter.<br>
                Scatter will allow you to authenticate with Hack Til Dawn without passwords.
            </p>

            <a href="https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle" target="_blank" class="button">Scatter on <b>Chrome Store</b></a>
        </section>
    </section>
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    export default {
        data(){ return {
            routeNames:RouteNames,
            loaded:false,
        }},
        computed: {
            ...mapState([
                'scatter',
                'user',
                'identity',
            ])
        },
        mounted(){
            setTimeout(() => this.loaded = true, 1000);
        },
        methods: {
            authenticateWithScatter(){
                this.scatter.getIdentity([]).then(identity => {
                    if(identity) this[Actions.SET_IDENTITY](identity);
                });
            },
            ...mapActions([
                Actions.SET_IDENTITY
            ])
        }
    }
</script>

<style lang="scss">
    a {
        text-decoration: none !important;
    }
</style>