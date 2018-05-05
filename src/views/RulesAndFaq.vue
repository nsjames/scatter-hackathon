<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container">
            <div style="height:50px;"></div>

            <section class="box">
                <h2>FAQ</h2>
                <a href="#uses-scatter">Hack Til Dawn uses Scatter</a>
                <a href="#creating-your-user">Creating Your User</a>
                <a href="#voting-on-projects">Voting on Projects</a>
                <div style="height:20px;"></div>
            </section>

            <hr />

            <h1 id="uses-scatter" class="notop">hack til dawn uses <b>scatter</b></h1>
            <hr />
            <figure class="text">
                <figure class="center">
                    <h2>What is Scatter?</h2>
                </figure>
                <hr class="short" />
                Scatter is a browser extension that allows you to sign transactions for web applications without giving them your private keys.
                It also allows you to authenticate with websites without passwords ( by using asymmetrical encryption ).
                <hr class="short" />

                <join></join>
            </figure>

            <hr />

            <h1 id="creating-your-user" class="notop">creating your <b>user</b></h1>
            <hr />
            <figure class="text">
                <figure class="center">
                    <h2>You need a User.</h2>
                    <i>There are different types of users.</i>
                </figure>
                <hr class="short" />
                There are 4 types of users, within 2 classes.
                <br><br>
                <h3>Voters</h3>
                Voter users can only vote on projects. They can not create or join teams or work on projects.
                Voting users start with 10,000 EOS.
                <br><br>
                <h3>Hackers, Doodlers and Big Mouths</h3>
                These are the team member users. Each serves a different purpose in the team and they should work together to create
                truly unique projects. Team members can not vote on projects.
                <hr class="short" />
            </figure>

            <hr />

            <h1 id="voting-on-projects" class="notop"><b>voting</b> on projects</h1>
            <hr />
            <figure class="text">
                <figure class="center">
                    <h2>Voters Must Generate EOS Accounts</h2>
                    <i>Hack Til Dawn uses it's own EOS node.</i>
                </figure>
                <hr class="short" />
                The EOS keys you have will not work with Hack Til Dawn. Once you have authenticated with Scatter you will have to generate an EOS account.
                You can do so by following the steps from within your <b>Dashboard</b>.
                <hr class="short" />


                <figure class="center spacer">
                    <h2>Casting and Retracting Votes</h2>
                    <i>Voting on projects is like voting for Block Producers.</i>
                </figure>
                <hr class="short" />
                The account that is generated for you is perceived to have 100 EOS tokens staked for voting. You will be able to vote for up to 30 projects.
                All of your votes carry the same weight since they hold the value of the entire 100 staked tokens.
                <br><br>
                Votes can be rescinded and given to other projects but you can only take back a vote 6 hours after giving it.
                <hr class="short" />
            </figure>

            <hr />

            <h1 id="all-about-teams" class="notop">all about <b>teams</b></h1>
            <hr />
            <figure class="text">
                <figure class="center">
                    <h2>Join or Create a Team.</h2>
                    <i>You don't have to go it alone.</i>
                </figure>
                <hr class="short" />
                <h3>Only Hackers, Doodlers, and Big Mouths can create/join teams.</h3><br>
                To create a Project which can be voted on you must first create a Team. Only Teams can become Projects.
                There is not limitation on the amount of users that a team can contain though, so if you <b>do</b> want to work alone
                you can just create a team for yourself.
                <br><br>
                <h3>To create a team:</h3>
                Go to the <b>Teams</b> page and click the <u>Create a <b>Team</b></u> button. The team will be linked to your
                Identity's public key. Only the team leader will be able to modify the team, accept/deny users who wish to join and turn it into a Project.
                <br><br>
                You can only own one team. But you can be a member of more than one.
                <br><br>
                <h3>To join a team:</h3>
                Find a team that you like. Once you're inside of their Team page there will be a button under the team's name labeled <b>Request To Join Team</b>.
                Once you have requested to join the team the leader of that team will be able to approve or deny your request.
                <hr class="short" />
            </figure>

            <hr />

            <h1 id="all-about-projects" class="notop">all about <b>projects</b></h1>
            <hr />
            <figure class="text">
                <figure class="center">
                    <h2>Turning a Team into a Project.</h2>
                </figure>
                <hr class="short" />
                For a Team leader to turn a Team into a Project you must have bound an EOS Account to your User. You can follow the process in the <b>Dashboard</b> to do so.
                <hr class="short" />

                <figure class="center spacer">
                    <h2>Working on Projects.</h2>
                    <i>We've tried to make it as easy as possible.</i>
                </figure>
                <hr class="short" />
                There's a few things you'll need to know.
                <hr class="short" />
                <h3>Users only have 10,000 EOS each.</h3>
                If your project moves funds around, try to make it in small amounts if possible. You don't want to deplete a voter's funds on one project.
                <hr class="short" />
                <h3>Unless you're making a Tool Project, your project should be visual.</h3>
                What this means is that voters should be able to interact with your Smart Contracts using a front-end. Part of their vote will be about user
                experience, make sure you meet that requirement.
                <hr class="short" />
                <h3>You will need to use docker to run your images on our servers.</h3>
                To load your project into our servers you will need to supply us with a Dockerfile that pulls from a public github. This docker container will be
                run on one of our servers and users will be able to access it from the Hack Til Dawn site.
                <hr class="short" />
            </figure>

            <hr />

            <h1 id="rules-for-the-prizes" class="notop">rules for the <b>prizes</b></h1>
            <hr />
            <figure class="text">
                <figure class="center">
                    <h2>Voter Prizes.</h2>
                </figure>
                <hr class="short" />
                Voters who have donated at least $10 and voted on at least 10 projects will take part in the community raffle.
                The prizes will be given to 3 randomly selected voters who meet those requirements regardless of donation size.
                <hr class="short" />

                <figure class="center spacer">
                    <h2>EOS Prizes.</h2>
                    <i>Some legalities.</i>
                </figure>
                <hr class="short" />
                <h3>We will send ETH instead of EOS to winners from the USA and China. </h3>
                If a winner is from either of those countries their winnings will be converted to ETH first, and then sent to their desired address.
                <hr class="short" />
                <h3>Your winnings are taxable.</h3>
                Do not forget to claim them with your local tax authorities.
                <hr class="short" />
            </figure>


            <div style="height:500px;"></div>
        </section>

    </section>
</template>
<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    export default {
        data(){ return {
        }},
        computed: {
            ...mapState([
                'user',
                'scatter'
            ])
        },
        methods: {
            ...mapActions([

            ])
        }
    }
</script>

<style lang="scss">
    .center {
        width:100%;
        display:block;
        text-align:center;
    }

    .spacer {
        margin-top:80px;
    }

    .box {
        a {
            margin-top:5px;
            text-decoration: underline;
        }
    }
</style>