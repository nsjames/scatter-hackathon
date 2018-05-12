<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">

            <div style="height:50px;"></div>
            <h1 ref="about">team<b>work</b></h1>
            <figure class="text">
                Here you can see which teams are ramping up for the Hackathon. If you are <u>not</u> a <b>Voter</b> you can either create a new
                team or request to join an existing one.
            </figure>

            <section class="box" style="margin-top:50px;" v-if="user && !team && user.type !== userTypes.VOTER">
                <h2>Can't find a team?</h2>
                <p>
                    You can always create one, however you can only own 1 team. The teams are not deletable however you can change them
                    whenever you please.
                </p>

                <router-link :to="{name:routeNames.CREATE_TEAM}" class="button">Create a <b>Team</b></router-link>
                <hr/>
            </section>


            <section class="search-bar">
                <input v-model="searchTerms" placeholder="Search.." />
            </section>

            <section class="teams">
                <section class="team" v-for="team in filteredResults()" @click="goToTeam(team)">
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
    import {UserTypes} from '../models/User'

    export default {
        data(){ return {
            userTypes:UserTypes,
            routeNames:RouteNames,
            teams:[],
            searchTerms:'',
        }},
        computed: {
            ...mapState([
                'scatter',
                'user',
                'team'
            ])
        },
        mounted(){
            ContractService.getAllTeams().then(teams => this.teams = teams);
        },

        methods: {
            filteredResults(){
                if(!this.searchTerms.trim().length) return this.teams;
                const termsArray = this.searchTerms.split(' ').filter(x => x.length).map(x => x.trim().toLowerCase());
                return this.teams.filter(team => termsArray.some(word => team.bio.toLowerCase().indexOf(word) > -1
                || team.tags.map(tag => tag.toLowerCase()).some(tag => tag.indexOf(word) > -1)
                || team.name.toLowerCase().indexOf(word) > -1));
            },
            goToTeam(team){ this.$router.push({name:RouteNames.TEAM, params:{name:team.name}}) },
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


</style>