<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container" v-if="openTeam && loaded">
            <div style="height:50px;"></div>

            <section v-if="!editing">
                <h1>{{openTeam.name}}</h1>

                <section class="actions center" v-if="isOwner()">
                    <figure class="action" @click="editTeam()">Edit Team</figure>
                </section>

                <section class="actions center" v-if="user && user.type !== userTypes.VOTER">
                    <figure class="action" v-if="!isMember()" @click="requestJoin()">Request To Join Team</figure>
                </section>
                <section class="tags center" v-if="error">
                    <figure class="tag">{{error}}</figure>
                </section>

                <hr />

                <p>{{openTeam.bio}}</p>
                <div style="margin-top:30px;"></div>

                <!-- TAGS -->
                <section class="tags">
                    <figure class="tag-head">Tags</figure>
                    <figure class="tag" v-for="tag in openTeam.tags">{{tag}}</figure>
                </section>
                <hr class="short" />

                <!-- LINKS -->
                <section class="flat-links tags" v-if="openTeam.links.length">
                    <figure class="tag-head">Links</figure>
                    <a :href="link.url" target="_blank" class="link" v-for="link in openTeam.links">{{link.url}}</a>
                </section>
                <hr class="short" />


                <!-- TEAM MEMBERS -->
                <h3 style="margin-bottom:5px;">Members</h3>
                <section class="box">
                    <section v-for="member in openTeam.users" class="type-box" :class="{'blue-back':member.keyid === openTeam.keyid}">
                        <figure class="type" @click="goToUser(member)">{{member.name}}</figure>
                        <figure class="text">{{member.type}}</figure>
                        <figure v-if="isOwner() && member.keyid !== openTeam.keyid" class="button smaller inline" @click="kickMember(member)">Kick</figure>
                    </section>
                </section>

                <!-- TEAM REQUESTS -->
                <section v-if="user && openTeam.keyid === user.keyid && requests && requests.users.length">
                    <hr />
                    <h3 style="margin-bottom:5px;">Member Requests</h3>
                    <section class="box">
                        <section v-for="member in requests.users" class="type-box">
                            <figure class="type" @click="goToUser(member)">{{member.name}}</figure>
                            <figure class="text">{{member.type}}</figure>
                            <figure class="button smaller inline" @click="answerRequest(member, true)">Accept</figure>
                            <figure class="button smaller inline" @click="answerRequest(member, false)">Deny</figure>
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
                    <h2>Name your team</h2>
                    <div style="height:40px"></div>
                    <input class="link" placeholder="The Avengers.." v-model="cloneTeam.name" />
                    <figure class="box-footer">{{cloneTeam.name.length}}/3 characters</figure>
                </section>

                <!-- BIO -->
                <section class="box">
                    <h2>Describe your team</h2>
                    <p>
                        Give a brief description of what the aim of this team will be, and what kind of people you are looking for. This helps others
                        decide if they want to join you.
                    </p>
                    <div style="height:40px"></div>
                    <textarea class="description" v-model="cloneTeam.bio"></textarea>
                    <figure class="box-footer">{{cloneTeam.bio.length}}/500 characters</figure>
                </section>


                <section class="box">
                    <h2>Add Some Tags</h2>
                    <p>Tags help describe your team at a glance. Split your tags using a comma ( , )</p>
                    <div style="height:40px"></div>
                    <section class="links">
                        <input class="link" placeholder="Kitties, Game" v-model="tagsList" />
                    </section>
                </section>

                <!-- LINKS -->
                <section class="box">
                    <h2>Got Sources?</h2>
                    <p>Add some kind of source for yourself.<br> It can be your portfolio, github, twitter, a telegram link, whatever but you must have at least one.</p>
                    <div style="height:40px"></div>
                    <section class="links">
                        <input v-for="(link, index) in cloneTeam.links" class="link" placeholder="http://www..." v-model="link.url" />
                    </section>
                    <figure class="box-footer" style="cursor:pointer;" @click="addSource()" v-if="cloneTeam.links.length < 5"><u>add another</u></figure>
                </section>


                <section class="box blank">
                    <figure class="button" @click="updateTeam()">Update this <b>Team</b></figure>
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

    export default {
        data(){ return {
            requests:null,
            error:null,
            userTypes:UserTypes,
            routeNames:RouteNames,
            openTeam:null,
            loaded:false,
            editing:false,
            tagsList:'',
            cloneTeam:null,
        }},
        computed: {
            ...mapState([
                'scatter',
                'user',
                'team'
            ])
        },
        mounted(){
            this.getTeam();
        },

        methods: {
            goToUser(user){
                this.$router.push({name:RouteNames.USER, params:{name:user.name}});
            },
            cancelEditing(){ this.editing = false; },
            editTeam(){
                this.error = null;
                this.cloneTeam = this.openTeam.clone();
                if(!this.cloneTeam.links.length) this.addSource();
                this.tagsList = this.cloneTeam.tags.join(',');
                this.editing = true;
            },
            addSource(){ this.cloneTeam.links.push(new Link()) },
            getTeam(){
                ContractService.getTeam(this.$route.params.name).then(async team => {
                    if(!team) this.$router.push({name:RouteNames.TEAMS});
                    else {
                        this.openTeam = team;
                        await ContractService.getTeamMemberRequests(team.keyid).then(requests => this.requests = requests);
                    }

                    this.loaded = true;
                });
            },
            isMember(){
                if(this.requests && this.requests.length && this.requests.userids.includes(this.user.keyid)) return true;
                return this.openTeam.members.includes(this.user.keyid);
            },
            isOwner(){
                if(!this.user) return false;
                return this.openTeam.key === this.user.key;
            },
            requestJoin(){
                this.error = null;
                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig) return false;
                    const requested = await ContractService.joinTeam(this.openTeam, this.user, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });
                    if(!requested) return false;
                    this.getTeam();
                })
            },
            answerRequest(user, accepted){
                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig) return false;
                    const answered = await ContractService.answerTeamJoinRequest(this.openTeam, user, accepted, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });
                    if(!answered) return false;
                    this.getTeam();
                })
            },
            kickMember(user){
                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig) return false;
                    const kicked = await ContractService.teamKick(this.openTeam, user, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });
                    if(!kicked) return false;
                    this.getTeam();
                })
            },
            updateTeam(){
                this.error = null;
                if(!this.isOwner()) {
                    location.reload();
                    return false;
                }

                if(this.cloneTeam.name.length < 3){
                    this.error = `The team's name must be at least 2 characters long`;
                    return false;
                }

                if(this.cloneTeam.bio.length > 500){
                    this.error = `The team's bio must be less than 500 characters long`
                    return false;
                }

                this.cloneTeam.links = this.cloneTeam.links.filter(link => link.url.length);

                this.cloneTeam.tags = this.tagsList.split(',').map(x => x.trim()).filter(x => x.length);
                if(!this.cloneTeam.tags.length){
                    this.error = 'You must add at least one tag';
                    return false;
                }
                ContractService.getSignature(this.scatter, this.user.key).then(async sig => {
                    if(!sig) return false;
                    const updated = await ContractService.updateTeam(this.cloneTeam, sig).catch(error => {
                        this.error = JSON.parse(error).error.details[0].message.replace('condition: assertion failed: ', '');
                    });
                    if(!updated) return false;
                    await this.getTeam();
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