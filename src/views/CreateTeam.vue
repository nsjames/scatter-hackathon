<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container" v-if="team">

            <section class="box" v-if="scatter && identity">
                <h2>Scatter Linked.</h2>
                <p>You will control this team with the user linked to your Scatter Identity.</p>
                <div style="height:20px;"></div>
            </section>




            <!-- NAME -->
            <section class="box">
                <h2>Name your team</h2>
                <div style="height:40px"></div>
                <input class="link" placeholder="HackTeam.." v-model="team.name" />
                <figure class="box-footer">{{team.name.length}}/3 characters</figure>
            </section>

            <!-- BIO -->
            <section class="box">
                <h2>Describe your team</h2>
                <p>
                    Give a brief description of what the aim of this team will be, and what kind of people you are looking for. This helps others
                    decide if they want to join you.
                </p>
                <div style="height:40px"></div>
                <textarea class="description" v-model="team.bio"></textarea>
                <figure class="box-footer">{{team.bio.length}}/500 characters</figure>
            </section>


            <!-- SOURCES -->
            <section class="box">
                <h2>Got Sources?</h2>
                <p>Add some kind of source for yourself.<br> It can be your portfolio, github, twitter, a telegram link, or anything else.</p>
                <div style="height:40px"></div>
                <section class="links">
                    <input v-for="(link, index) in team.links" class="link" placeholder="http://www..." v-model="link.url" />
                </section>
                <figure class="box-footer" style="cursor:pointer;" @click="addSource()" v-if="team.links.length < 5"><u>add another</u></figure>
            </section>


            <!-- TAGS -->
            <section class="box">
                <h2>Add Some Tags</h2>
                <p>Tags help describe your team at a glance. Split your tags using a comma ( , )</p>
                <div style="height:40px"></div>
                <section class="links">
                    <input class="link" placeholder="Kitties, Game" v-model="tagsList" />
                </section>
            </section>

            <section class="box blank">
                <figure class="button" :class="{'disabled':!identity}" @click="register()">Create this <b>Team</b></figure>
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

    import Link from '../models/Link'
    import Team from '../models/Team'

    import ecc from 'eosjs-ecc'
    import ContractService from '../services/ContractService';

    export default {
        data(){ return {
            team:new Team(),
            error:null,
            tagsList:'',
        }},
        computed: {
            ...mapState([
                'scatter',
                'identity',
                'user'
            ])
        },
        mounted(){
            this.team.links = [new Link()];
            setTimeout(() => {
                if(!this.user) this.$router.push({name:RouteNames.TEAMS});
            }, 1000)
        },

        methods: {
            addSource(){ this.team.links.push(new Link()) },
            authenticateWithScatter(){
                this.scatter.getIdentity([]).then(identity => {
                    if(identity) this[Actions.SET_IDENTITY](identity);
                });
            },
            register(){
                this.error = null;
                if(!this.scatter || !this.identity || !this.user) {
                    location.reload();
                    return false;
                }

                if(this.team.name.length < 3)
                    return this.error = `The team's name must be at least 2 characters long`;

                if(this.team.name.indexOf(' ') > -1)
                    return this.error = `Team names must contain no spaces`;


                if(this.team.bio.length > 500)
                    return this.error = `The team's bio must be less than 500 characters long`

                this.team.links = this.team.links.filter(link => link.url.length);

                this.team.tags = this.tagsList.split(',').map(x => x.trim()).filter(x => x.length);
                if(!this.team.tags.length)
                    return this.error = 'You must add at least one tag';


                this.team.key = this.user.key;

                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig) return false;

                    const created = await ContractService.createTeam(this.team, this.user, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });

                    const team = await ContractService.getTeamFromPublicKey(this.user.key).catch(() => {});
                    if(!team){
                        this.error = 'There seems to have been a problem creating this team. Try again.'
                        return false;
                    }

                    this[Actions.SET_TEAM](team);
                    this.$router.push({name:RouteNames.DASHBOARD});
                });




            },
            ...mapActions([
                Actions.SET_IDENTITY,
                Actions.SET_USER,
                Actions.SET_TEAM
            ])
        },
        watch:{
            team:{
                handler(a,b){
                    if(this.team.bio.length > 500) this.team.bio = this.user.team.substr(0,500);
                },
                deep:true
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
</style>