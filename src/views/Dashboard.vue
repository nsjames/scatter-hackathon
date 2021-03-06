<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">

            <div style="height:50px;"></div>
            <h1>dash<b>board</b></h1>
            <br>
            <section class="actions center">
                <figure class="action" @click="goToUser()" v-if="user">Go To User</figure>
                <figure class="action" @click="logout()">Log Out</figure>
            </section>


            <section class="teams" v-if="loaded">

                <!-- JOIN AS USER -->
                <section v-if="!user">
                    <join></join>
                </section>

                <!-- ALREADY USER -->
                <section v-else>



                    <section class="box" v-if="user.account === ''">
                        <section v-if="!generatedAccount">
                            <h2>You need an EOS Account</h2>
                            <p>You will need an account to vote or create projects</p><br>
                            <section class="box dashed">
                                <p>
                                    Go into Scatter and click <b>Key Pairs</b><br>
                                    Go through the process of adding an EOS keypair to Scatter. Make sure you click <b>Copy</b> when generating the keypair
                                    and save the private key somewhere.
                                    Once you're done click the <b>Copy</b> button on the keypair and paste it here.
                                    <br><br>
                                    Then put the public key below.
                                </p>
                            </section>
                            <br>
                            <input class="link" v-model="publicKey" placeholder="EOS791DBd6KK1CU...." />
                            <figure @click="generateAccount" :class="{'disabled':!publicKey.length}" class="button short-top">Generate <b>Account</b></figure>
                        </section>

                        <section v-else>
                            <h2>Your account has been generated!</h2>
                            <p>
                                Go into Scatter and import the account into your Identity using the network that was just added.
                                We also gave you 200 EOS to play around with on the hackathon Dapps, don't spend it all in one place.
                                <br><br>
                                Once you're done refresh this page.
                            </p>
                        </section>
                    </section>


                    <!-- SHARE -->
                    <share v-if="user.type === userTypes.VOTER"></share>



                    <!-- DONATE OR TEAMS -->
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

                    <section class="box" v-if="user.type === userTypes.VOTER && projectVotes.length">
                        <h2>Project Votes</h2>
                        <h3>These are the projects you have voted on.</h3>
                        <div style="height:30px;"></div>
                        <section class="prize-box" style="cursor: pointer;" @click="goToProject(voteRecord.project)" v-for="voteRecord in projectVotes">
                            <figure class="left">{{voteRecord.project.team.name}}</figure>
                            <figure class="right">
                                {{voteRecord.vote.toArray().map(x => x[1]).join('/')}}
                            </figure>
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
    import {UserTypes} from '../models/User'

    let timer = null;

    export default {
        data(){ return {
            routeNames:RouteNames,
            loaded:false,
            teams:[],
            userTypes:UserTypes,
            generatedAccount:false,
            publicKey:'',
            projectVotes:[],
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
            if(this.identity){
                if(this.user) this.loadUserData();
                this.loaded = true;
            }
            setTimeout(async () => {
                if(!this.identity) return this.$router.push({name:RouteNames.INDEX});
            }, 2000);
        },

        methods: {
            goToProject(project){
                this.$router.push({name:RouteNames.PROJECT, params:{name:project.team.name}});
            },
            goToUser(){
                if(!this.user) return false;
                this.$router.push({name:RouteNames.USER, params:{name:this.user.name}});
            },
            generateAccount(){
                if(!this.publicKey.length) return false;
                const gen = async() => {
                    ContractService.getScatterEos();
                    const addedNetwork = await this.scatter.suggestNetwork(ContractService.getEosNetwork()).catch(() => false);
                    if(!addedNetwork) return false;

                    ContractService.getSignature(this.scatter, this.user.key).then(sig => {
                        if(!sig) return false;
                        const generated = ContractService.generateAccount(this.user, this.publicKey, sig).catch(error => {
                            this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                        });
                        if(!generated) return false;
                        this.generatedAccount = true;
                    })
                };
                gen();
            },
            async loadUserData(){
                this.teams = await ContractService.getTeamsForMember(this.user.keyid)
                    .then(teams => teams.filter(team => team.keyid !== this.team.keyid));

                ContractService.getProjectVoteRecords(this.user.keyid).then(async records => {
                    if(!records) return;
                    records.votes.map(async record => this.projectVotes.push({
                        vote:record.vote,
                        project:await ContractService.getProject('', record.projectid)
                    }))
                });
            },
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
        },
        watch:{
            async user(){
                if(!this.user) return false;
                this.loadUserData();
            },
            identity(){
                if(this.user) this.loadUserData();
                this.loaded = true;
            }
        }
    }
</script>

<style lang="scss">

</style>