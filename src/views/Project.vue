<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container" v-if="openProject && loaded">
            <div style="height:50px;"></div>

            <section v-if="!editing">
                <section style="width:100%; text-align:center;">
                    <h2>{{openProject.category}} Project</h2>
                </section>
                <h1 class="notop">{{openProject.team.name}}</h1>

                <section class="actions center">
                    <figure class="action" v-if="isOwner()" @click="editProject()">Edit Project</figure>
                    <figure class="action" @click="goToTeam()">Go To Team</figure>
                </section>

                <hr />

                <!-- TAGS -->
                <section class="tags">
                    <figure class="tag-head">Tags</figure>
                    <figure class="tag" v-for="tag in openProject.team.tags">{{tag}}</figure>
                </section>
                <hr class="short" />

                <!-- LINKS -->
                <section class="box blank" v-if="openProject.links.length">
                    <a :href="link.url" target="_blank" class="button" v-for="link in openProject.links">{{link.name}}</a>
                </section>

                <hr class="short" />

                <!-- VOTES -->
                <section class="box">
                    <h2>Votes</h2>
                    <p v-if="canVote()">Your vote weighs 100 EOS.</p>
                    <hr class="short" />
                    <section class="votes">
                        <section class="vote" v-for="vote in votes().toArray()">
                            <section class="vote-type">{{vote[0]}}</section>
                            <section class="vote-num">
                                {{vote[1]}}
                                <span v-if="projectVoteLoaded">
                                    <span>+ {{projectVote[vote[2]]}}</span>
                                    <i @click="deltaVote(vote[2])" v-if="canVote() && isNewVote" class="fa fa-plus-square" :class="{'active':projectVote[vote[2]] === 1}"></i>
                                </span>
                            </section>
                        </section>
                    </section>

                    <div style="height:40px;"></div>
                    <section class="actions center">
                        <figure class="action" @click="castVote" v-if="user && user.type === userTypes.VOTER && isNewVote" style="margin-right:0;">Cast Vote</figure>
                        <figure class="action" @click="retractVote" v-if="!isNewVote" style="margin-right:0;">Retract Vote</figure>
                        <section class="tags center" v-if="voteError">
                            <figure class="tag">{{voteError}}</figure>
                        </section>
                    </section>
                </section>

                <!-- WHITE PAPER -->
                <hr class="short" />
                <section class="box blank markdown" v-html="whitepaperHTML"></section>


                <!-- TEAM MEMBERS -->
                <hr class="short" />
                <h3 style="margin-bottom:5px;">Project Team Members</h3>
                <section class="box">
                    <section v-for="member in openProject.team.users" class="type-box" :class="{'blue-back':member.keyid === openProject.teamid}">
                        <figure class="type" @click="goToUser(member)">{{member.name}}</figure>
                        <figure class="text">{{member.type}}</figure>
                    </section>
                </section>
            </section>




            <!-- EDITING -->
            <section v-else>
                <!--<section class="actions center">-->
                    <!--<figure class="action" @click="editing = false;">Cancel Project Creation</figure>-->
                <!--</section>-->

                <!-- NAME -->
                <section class="box">
                    <h2>Your Project's name will always match your Team's name.</h2>
                    <p>If you change your team name your project name will change as well.</p>
                    <div style="height:20px;"></div>
                </section>

                <!-- LINKS -->
                <section class="box">
                    <h2>Project Links</h2>
                    <p v-if="cloneProject.category !== categories.TOOL">Some project links are mandatory, such as <b>GitHub</b> and <b>Live Demo</b>.</p>
                    <p v-else>Some project links are mandatory, such as <b>GitHub</b>.</p>
                    <div style="height:40px"></div>
                    <section class="links">
                        <section class="named-link" v-for="link in cloneProject.links">
                            <input class="link" :disabled="link.name === linkNames.GITHUB || link.name === linkNames.LIVE_DEMO"
                                   placeholder="Name this Link" v-model="link.name" />
                            <input v-if="link.name === linkNames.LIVE_DEMO" class="link" placeholder="http://domain... OR http://192.16..." v-model="link.url" />
                            <input v-else class="link" placeholder="http://domain..." v-model="link.url" />
                        </section>

                    </section>
                    <figure class="box-footer" style="cursor:pointer;" @click="addProjectSource()" v-if="cloneProject.links.length < 5"><u>add another</u></figure>
                </section>

                <!-- WHITEPAPER -->
                <section class="box">
                    <h2>Project Whitepaper</h2>
                    <p>You can use markdown to format the look of your Miniature Whitepaper.</p>
                    <div style="height:40px"></div>
                    <textarea class="description resizeable" v-model="whitepaper"></textarea>
                    <figure class="box-footer">{{whitepaper.length}}/500 characters</figure>
                </section>
                <section class="box markdown" v-html="cloneWhitepaperHTML"></section>

                <section class="box blank">
                    <figure class="button" @click="saveProject()">Save <b>Project</b></figure>
                </section>

                <section class="box" v-if="error">
                    <p>{{error}}</p>
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
    import {UserTypes} from '../models/User'
    import Link from '../models/Link'
    import ContractService from '../services/ContractService'
    import {CATEGORIES, LINK_NAMES} from '../models/Project'
    import ProjectVote from '../models/ProjectVote'
    const showdown  = require('showdown');
    const converter = new showdown.Converter();

    export default {
        data(){ return {
            requests:null,
            error:null,
            userTypes:UserTypes,
            routeNames:RouteNames,
            categories:CATEGORIES,
            linkNames:LINK_NAMES,
            openProject:null,
            loaded:false,
            editing:false,
            tagsList:'',
            cloneProject:null,
            whitepaperHTML:'',
            whitepaper:'',
            cloneWhitepaperHTML:'',
            projectVote:null,
            voteError:null,
            projectVoteLoaded:false,
            isNewVote:true,
        }},
        computed: {
            ...mapState([
                'scatter',
                'user',
                'team'
            ])
        },
        mounted(){
            this.getProject();
        },

        methods: {
            addProjectSource(){
                this.cloneProject.links.push(new Link());
            },
            canVote(){
                return this.user && this.user.type === UserTypes.VOTER;
            },
            castVote(){
                this.voteError = null;
                const sum = this.projectVote.toArray().reduce((acc, k) => {
                    acc+=k[1];
                    return acc;
                }, 0);

                if(!sum) return this.voteError = 'You must select at least one voting criteria.';

                ContractService.vote(this.projectVote, this.openProject.teamid, this.user).catch(error => {
                    this.voteError = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                }).then(() => {
                    this.getProject();
                    this.getVoteRecord();
                })
            },
            retractVote(){
                this.voteError = null;
                ContractService.unvote(this.openProject.teamid, this.user).catch(error => {
                    this.voteError = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                }).then(() => {
                    this.getProject();
                    this.getVoteRecord();
                })
            },
            votes(){
                const votes = ProjectVote.fromJson(this.openProject.votes);
                if(!this.projectVote || this.isNewVote) return votes;
                Object.keys(votes).map(key => {
                    votes[key] -= this.projectVote[key];
                });
                return votes;
            },
            getVoteRecord(){
                if(!this.openProject) return false;
                if(!this.user || this.user.type !== UserTypes.VOTER) return false;
                ContractService.getProjectVoteRecords(this.user.keyid).then(records => {
                    const record = !records ? null : records.votes.find(vote => vote.projectid === this.openProject.teamid);
                    this.projectVote = record ? record.vote : new ProjectVote();
                    this.isNewVote = !record;
                    this.projectVoteLoaded = true;
                })
            },
            deltaVote(key){
                this.projectVote[key] = this.projectVote[key] === 1 ? 0 : 1;
            },
            goToUser(user){ this.$router.push({name:RouteNames.USER, params:{name:user.name}}); },
            goToTeam(){ this.$router.push({name:RouteNames.TEAM, params:{name:this.openProject.team.name}}); },
            getProject(){
                ContractService.getProject(this.$route.params.name).then(async project => {
                    if(!project) return this.$router.push({name:RouteNames.PROJECTS});

                    this.openProject = project;
                    this.whitepaperHTML = converter.makeHtml(project.whitepaper);
                    this.loaded = true;
                    this.editing = false;
                });
            },
            isOwner(){
                if(!this.team) return false;
                return this.openProject.teamid === this.team.keyid;
            },
            cancelEditing(){ this.editing = false; },
            addSource(){ this.cloneProject.links.push(new Link()) },
            editProject(){
                this.error = null;
                this.cloneProject = this.openProject.clone();
                this.whitepaper = this.cloneProject.whitepaper;
                this.editing = true;
            },
            saveProject(){
                const links = this.cloneProject.links.filter(link => link.url.length && link.url.indexOf('http') === 0);
                if(this.cloneProject.category === CATEGORIES.DAPP && links.length < 2)
                    return this.error = 'You must fill out both the GitHub link and the Front-End link';
                if(this.cloneProject.category === CATEGORIES.TOOL && links.length < 1)
                    return this.error = 'You must fill out the GitHub link';

                if(this.cloneProject.links.find(link => link.name === LINK_NAMES.GITHUB).url.toLowerCase().indexOf('github.com') === -1)
                    return this.error = 'The GitHub url you put in is not a valid GitHub URL';
                this.cloneProject.links = links;

                this.cloneProject.whitepaper = this.whitepaper;

                ContractService.updateProject(this.cloneProject).catch(error => {
                    this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                }).then(() => {
                    this.getProject();
                });
            },
            ...mapActions([

            ])
        },
        watch:{
            whitepaper(){
                this.cloneWhitepaperHTML = converter.makeHtml(this.whitepaper);
            },
            user(){
                this.getVoteRecord();
            },
            openProject(){
                this.getVoteRecord();
            }
        }
    }
</script>

<style lang="scss">
    .votes {
        width:100%;

        .vote {
            width:100%;
            overflow:hidden;
            border-bottom:1px solid rgba(0,0,0,0.1);
            margin-bottom:10px;
            font-size:24px;

            .vote-type {
                width:50%;
                text-align:left;
                float:left;
                text-transform: capitalize;
            }

            .vote-num {
                width:50%;
                text-align:right;
                float:left;
                font-weight:bold;

                i {
                    cursor: pointer;
                    color:rgba(0,0,0,0.2);
                    transition: color 0.2s ease;

                    &:hover, &.active {
                        color:#478af7;
                    }
                }

                span {
                    color:#478af7;
                }
            }
        }
    }
</style>