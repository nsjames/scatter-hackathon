<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container" v-if="openUser && loaded">
            <div style="height:50px;"></div>


            <section v-if="!editing">
                <section style="width:100%; text-align:center">
                    <h3>{{openUser.type}}</h3>
                </section>
                <h1 class="notop">{{openUser.name}}</h1>

                <section class="actions center" v-if="isOwner()">
                    <figure class="action" @click="editUser()">Edit User</figure>
                </section>

                <section class="tags center" v-if="error">
                    <figure class="tag">{{error}}</figure>
                </section>

                <hr />

                <p>{{openUser.bio}}</p>
                <div style="margin-top:30px;"></div>

                <!-- LINKS -->
                <section class="flat-links tags" v-if="openUser.links.length">
                    <figure class="tag-head">Links</figure>
                    <a :href="link.url" target="_blank" class="link" v-for="link in openUser.links">{{link.url}}</a>
                </section>
                <hr class="short" />


                <!-- TEAMS -->
                <section v-if="teams.length">
                    <h3 style="margin-bottom:5px;">Teams</h3>
                    <section class="teams">
                        <section class="team" v-for="team in teams" @click="goToTeam(team)">
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
                </section>
            </section>




            <!-- EDITING -->
            <section v-else>
                <section class="actions center">
                    <figure class="action" @click="cancelEditing()">Cancel Edit</figure>
                </section>

                <!-- NAME -->
                <section class="box">
                    <h2>Want to change your name?</h2>
                    <p>
                        Your name here is your unique Scatter RIDL integrated name.<br>
                        RIDL ( Reputation and Identity Layer ) is a sister system for Scatter which makes your name unique across
                        all networks and blockchains. No one else can impersonate you on websites integrated with RIDL, and your name
                        can hold decentralized reputation.
                    </p>
                    <div style="height:20px"></div>
                    <h2>{{cloneUser.name}}</h2>
                    <div style="height:20px"></div>
                    <figure class="button" @click="updateUsername()">Re-Fetch from <b>Scatter</b></figure>
                </section>

                <!-- TEAM MEMBER TYPE -->
                <section class="box" v-if="cloneUser.type !== userTypes.VOTER">
                    <h2>What are you?</h2>
                    <p>Feel like doing something else?</p>
                    <div style="height:40px"></div>

                    <section class="type-box" @click="changeType(userTypes.HACKER)" :class="{'blue-back':cloneUser.type === userTypes.HACKER}">
                        <figure class="type">Hacker</figure>
                        <figure class="text">The Developer</figure>
                    </section>

                    <section class="type-box" @click="changeType(userTypes.DOODLER)" :class="{'blue-back':cloneUser.type === userTypes.DOODLER}">
                        <figure class="type">Doodler</figure>
                        <figure class="text">The Designer</figure>
                    </section>

                    <section class="type-box" @click="changeType(userTypes.BIGMOUTH)" :class="{'blue-back':cloneUser.type === userTypes.BIGMOUTH}">
                        <figure class="type">Big Mouth</figure>
                        <figure class="text">The Marketer</figure>
                    </section>
                </section>

                <!-- BIO -->
                <section class="box">
                    <h2>Who are you?</h2>
                    <p>Give a brief description of who you are and what you do. Keep it light and fun.</p>
                    <div style="height:40px"></div>
                    <textarea class="description" v-model="cloneUser.bio"></textarea>
                    <figure class="box-footer">{{cloneUser.bio.length}}/500 characters</figure>
                </section>

                <!-- LINKS -->
                <section class="box">
                    <h2>Got Sources?</h2>
                    <p>Add some kind of source for yourself.<br> It can be your portfolio, github, twitter, a telegram link, whatever but you must have at least one.</p>
                    <div style="height:40px"></div>
                    <section class="links">
                        <input v-for="(link, index) in cloneUser.links" class="link" placeholder="http://www..." v-model="link.url" />
                    </section>
                    <figure class="box-footer" style="cursor:pointer;" @click="addSource()" v-if="cloneUser.links.length < 5"><u>add another</u></figure>
                </section>


                <section class="box blank">
                    <figure class="button" @click="updateUser()">Update your <b>User</b></figure>
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
    import ContractService from '../services/ContractService'
    import Link from '../models/Link'
    import {UserTypes} from '../models/User'
    import User from '../models/User'


    export default {
        data(){ return {
            userTypes:UserTypes,
            openUser:null,
            cloneUser:null,
            loaded:false,
            editing:false,
            error:null,
            teams:[],
        }},
        mounted(){
            this.getUser();
        },
        computed: {
            ...mapState([
                'user',
                'scatter'
            ])
        },
        methods: {
            changeType(type){
                if(type === UserTypes.VOTER) return false;
                this.cloneUser.type = type;
            },
            goToTeam(team){
                this.$router.push({name:RouteNames.TEAM, params:{name:team.name}});
            },
            getUser(){
                ContractService.getUser(this.$route.params.name).then(async user => {
                    if(!user) this.$router.push({name:RouteNames.INDEX});
                    else this.openUser = user;

                    await ContractService.getTeamsForMember(this.openUser.keyid).then(teams => this.teams = teams);

                    this.loaded = true;
                });

            },
            isOwner(){
                if(!this.user) return false;
                return this.openUser.key === this.user.key;
            },
            cancelEditing(){ this.editing = false; },
            editUser(){
                this.error = null;
                this.cloneUser = this.openUser.clone();
                if(!this.cloneUser.links.length) this.addSource();
                this.editing = true;
            },
            addSource(){ this.cloneUser.links.push(new Link()) },
            updateUsername(){
                this.scatter.getIdentity().then(id => {
                    this.cloneUser.name = id.name;
                })
            },
            updateUser(){
                this.error = null;
                if(!this.isOwner()) {
                    location.reload();
                    return false;
                }

//                if(this.cloneUser.name.length < 3){
//                    this.error = `The team's name must be at least 2 characters long`;
//                    return false;
//                }

                if(this.cloneUser.bio.length > 500){
                    this.error = `The user's bio must be less than 500 characters long`
                    return false;
                }

                this.cloneUser.links = this.cloneUser.links.filter(link => link.url.length);

                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig) return false;
                    const updated = await ContractService.updateUser(this.cloneUser, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });
                    if(!updated) return false;
                    await this.getUser();
                    this.editing = false;
                })

            },
            ...mapActions([

            ])
        }
    }
</script>

<style lang="scss">

</style>