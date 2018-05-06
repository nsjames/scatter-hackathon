<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">

            <div style="height:50px;"></div>
            <h1 ref="about">hackathon <b>projects</b></h1>
            <figure class="text">
                By voting on projects you are helping to shape the future of EOS. Make sure you do your due diligence and test out the applications.
                You only have 30 votes, use them wisely.
            </figure>


            <section class="search-bar">
                <input v-model="searchTerms" placeholder="Search.." />
            </section>

            <section class="teams">
                <section class="team" v-for="project in filteredResults()" @click="goToProject(project)">
                    <section class="top">
                        <h2>{{project.team.name}}</h2>
                        <h3>{{project.team.member_count}} Member{{project.team.member_count !== 1 ? 's' : '' }}</h3>
                        <p>{{project.team.bio}}</p>
                    </section>
                    <section class="bottom">
                        <section class="tags">
                            <figure class="tag-head">Related Tags</figure>
                            <figure class="tag" v-for="tag in project.team.tags">{{tag}}</figure>
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
            projects:[],
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
            ContractService.getAllProjects().then(projects => {
                projects.map(async project => {
                    await ContractService.getProject('', project.teamid).then(p => this.projects.unshift(p));
                });
//                this.projects = projects
            });
            setTimeout(() => {
                console.log(this.user);
            }, 1000)
        },

        methods: {
            filteredResults(){
                if(!this.searchTerms.trim().length) return this.projects;
                const termsArray = this.searchTerms.split(' ').filter(x => x.length).map(x => x.trim().toLowerCase());
                return this.projects.filter(team => termsArray.some(word => team.bio.toLowerCase().indexOf(word) > -1
                || team.tags.map(tag => tag.toLowerCase()).some(tag => tag.indexOf(word) > -1)
                || team.name.toLowerCase().indexOf(word) > -1));
            },
            goToProject(project){ this.$router.push({name:RouteNames.PROJECT, params:{name:project.team.name}}) },
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