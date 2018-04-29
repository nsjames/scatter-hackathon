<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">

            <div style="height:50px;"></div>
            <h1>dash<b>board</b></h1>
            <section class="actions center">
                <figure class="action" @click="logout()">Log Out</figure>
            </section>


            <section class="teams" v-if="loaded">

                <section v-if="user">

                    <donate v-if="user.type === userTypes.VOTER"></donate>

                    <section v-else>
                        <section v-if="team" class="team" @click="goToTeam(team)">
                            <section class="top">
                                <h2>{{team.name}}</h2>
                                <h3>{{team.member_count}} Member{{team.member_count !== 1 ? 's' : '' }}</h3>
                                <p>{{team.bio}}</p>
                            </section>
                            <section class="bottom">
                                <section class="tags">
                                    <figure class="tag-head">Related Tags</figure>
                                    <figure class="tag" v-for="tag in team.tags">{{tag}}</figure>
                                </section>
                            </section>
                        </section>
                        <section v-else class="box">
                            <h2>You don't own a team</h2>
                            <h3>If you want to make a team click the button below.</h3>
                            <router-link :to="{name:routeNames.CREATE_TEAM}" class="button">Create a <b>Team</b></router-link>

                        </section>

                        <section v-for="memberTeam in teams" class="team" @click="goToTeam(memberTeam)">
                            <section class="top">
                                <h2>{{memberTeam.name}}</h2>
                                <h3>{{memberTeam.member_count}} Member{{memberTeam.member_count !== 1 ? 's' : '' }}</h3>
                                <p>{{memberTeam.bio}}</p>
                            </section>
                            <section class="bottom">
                                <section class="tags">
                                    <figure class="tag-head">Related Tags</figure>
                                    <figure class="tag" v-for="tag in memberTeam.tags">{{tag}}</figure>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>

                <section v-else>
                    <join></join>
                </section>

            </section>

            <div style="height:500px;"></div>
        </section>



    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    import ContractService from '../services/ContractService'
    import Idea from '../models/Idea'
    import IdeaAction from '../models/IdeaAction'
    import murmur from 'murmurhash'
    import {UserTypes} from '../models/User'

    export default {
        data(){ return {
            routeNames:RouteNames,
            loaded:false,
            teams:[],
            userTypes:UserTypes,
        }},
        computed: {
            ...mapState([
                'scatter',
                'identity',
                'user',
                'team'
            ])
        },
        mounted(){
            setTimeout(async () => {
                if(!this.identity){
                    this.$router.push({name:RouteNames.INDEX});
                    return false;
                }
                if(this.user){
                    this.teams = await ContractService.getTeamsForMember(this.user.keyid);
                }
                this.loaded = true
            }, 800);
        },

        methods: {
            goToTeam(team){ this.$router.push({name:RouteNames.TEAM, params:{name:team.name}}) },
            logout(){
                this.scatter.forgetIdentity().then(res => {
                    this[Actions.SET_IDENTITY](null);
                    this.$router.push({name:RouteNames.INDEX});
                })
            },
            ...mapActions([
                Actions.SET_IDENTITY
            ])
        }
    }
</script>

<style lang="scss">
</style>