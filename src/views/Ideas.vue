<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">

            <div style="height:50px;"></div>
            <h1 ref="about">light<b>bulb</b></h1>
            <figure class="text">
                Sometimes it's hard to find great ideas to make when in a jam. To make sure teams are able to spend time on creation instead of
                thinking about ideas we've compiled a decentralized list of ideas.
            </figure>

            <section class="box" v-if="user && !creatingIdea" style="margin-top:50px;">
                <h2>Do you have a great idea?</h2>
                <p>
                    If you have a great idea but not the skill sets to accomplish it post it here and maybe a team will pick it up.
                </p>

                <figure @click="creatingIdea = !creatingIdea" class="button">Create an <b>Idea</b></figure>
            </section>

            <section class="box" v-if="user && creatingIdea" style="margin-top:50px;">
                <h2>What's this great idea?</h2>

                <textarea class="description" v-model="idea.description"></textarea>

                <figure @click="postIdea" class="button">Post this <b>Idea</b></figure>
                <figure class="box-footer" :class="{'red':idea.description.length < 200}">{{idea.description.length}}/200 characters</figure>
                <section class="box" style="margin-top:10px;" v-if="error">
                    <p>{{error}}</p>
                </section>
            </section>

            <hr/>

            <section v-if="ideas.length">
                <section class="search-bar">
                    <input v-model="searchTerms" placeholder="Search.." />
                </section>

                <section class="teams" v-for="idea in filteredResults()">
                    <section class="team">
                        <section class="top">
                            <h3>
                                <b>{{idea.upvotes}}</b> Upvote{{idea.upvotes !== 1 ? 's' : ''}},
                                <b>{{idea.flags}}</b> Flag{{idea.flags !== 1 ? 's' : ''}} and
                                <u><b>{{idea.teamids.length}} Team{{idea.teamids.length !== 1 ? 's' : ''}} working on this</b></u></h3>
                            <p>{{idea.description}}</p>
                        </section>
                        <section class="bottom">
                            <section class="actions left" v-if="user">
                                <figure class="action" @click="commitToIdea(idea)" v-if="team">Commit your Team to this Idea</figure>
                                <figure class="action" @click="upvote(idea)"><i class="fa fa-thumbs-up"></i></figure>
                                <figure class="action light" @click="flag(idea)"><i class="fa fa-flag"></i></figure>
                            </section>
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
    import Idea from '../models/Idea'
    import IdeaAction from '../models/IdeaAction'
    import murmur from 'murmurhash'

    export default {
        data(){ return {
            error:null,
            creatingIdea:false,
            submittingIdea:false,
            createdIdea:null,
            idea:new Idea(),
            routeNames:RouteNames,
            ideas:[],
            searchTerms:'',
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
            ContractService.getAllIdeas().then(ideas => {
                this.ideas = ideas;
            })
        },

        methods: {
            filteredResults(){
                if(!this.searchTerms.trim().length) return this.ideas;
                const termsArray = this.searchTerms.split(' ').filter(x => x.length).map(x => x.trim().toLowerCase());
                return this.ideas.filter(idea => termsArray.some(word => idea.description.toLowerCase().indexOf(word) > -1));
            },
            upvote(idea){
                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                   if(!sig) return false;
                   const act = new IdeaAction(this.user.keyid, idea.id);
                   const actioned = await ContractService.ideaVote(act, this.user, sig).catch(() => null);
                   if(actioned) idea.upvotes++;
                });
            },
            flag(idea){
                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                   if(!sig) return false;
                   const act = new IdeaAction(this.user.keyid, idea.id);
                   await ContractService.ideaFlag(act, this.user, sig).catch(() => null);
                });
            },
            commitToIdea(idea){
                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig) return false;

                    const committed = await ContractService.teamwork(this.team, idea, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });
                    if(!committed) return false;
                    ContractService.getAllIdeas().then(ideas => {
                        this.ideas = ideas;
                    })
                });
            },
            postIdea(){
                this.submittingIdea = true;
                this.error = null;
                if(this.idea.description.length < 200){
                    this.error = 'Description must be at least 200 characters';
                    this.submittingIdea = false;
                    return false;
                }

                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig){
                        this.error = 'Could not get signature';
                        this.submittingIdea = false;
                        return false;
                    }

                    const created = await ContractService.createIdea(this.idea, this.user, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                        return null;
                    });
                    if(!created){
                        this.error = 'Could not create idea, please try again';
                        this.submittingIdea = false;
                        return false;
                    }

                    this.creatingIdea = false;
                    this.submittingIdea = false;
                    ContractService.getIdea(murmur.v2(this.idea.description)).then(idea => {
                        console.log('idea', idea);
                        if(idea) this.ideas.unshift(idea);
                    })
                });

            },
            ...mapActions([

            ])
        }
    }
</script>

<style lang="scss">


    textarea {
        &.description {
            margin-top:20px;
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