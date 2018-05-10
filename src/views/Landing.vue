<template>
    <section>
        <hero></hero>
        <floating-menu></floating-menu>
        <section class="container landing">



            <section class="box large-pad">
                <h2 style="margin-top:0;">Time Til Hackathon Opens</h2>
                <figure class="os clock">
                    <span v-if="days > 0">{{days | twoDigit}} :</span>
                    <span>{{hours | twoDigit}} :</span>
                    <span>{{minutes | twoDigit}} :</span>
                    <span>{{seconds | twoDigit}}</span>
                </figure>
            </section>

            <join></join>

            <!--<section class="box blue-border">-->
                <!--<h2>The Hackathon has started!</h2>-->
                <!--<p><u>Please read the rules before submitting your project.</u></p>-->

                <!--<figure class="button"><b>Submit</b> Your Project</figure>-->
            <!--</section>-->

            <!--<section class="box blue-border">-->
                <!--<h2>The Voting Period has started!</h2>-->

                <!--<figure class="button"><b>View</b> The Projects</figure>-->
            <!--</section>-->



            <hr/>
            <h1 ref="about">blockchains <b>need</b> dapps</h1>
            <figure class="text">
                The EOS blockchain is an infant with no rattle. Its very life has been left in our hands by Gepetto.
                We can’t let block.one down; it’s time to take up arms and fight for the blockchain that we all believe in.
                <br><br>
                Thus, The Hack Til Dawn Hackathon was born. The community members, block producers and dapps that are helping sponsor this event
                all still support the hackathon put together by block.one, but we want to offer
                a similar experience to those that can't physically attend and participate. Hack Til Dawn will be held online
                and allow anyone from anywhere to take part and have a shot at the prizes.
            </figure>

            <hr/>
            <h1>the <b>prizes</b> are awesome</h1>
            <figure class="text">
                Not only will there be a monetary prize from the sponsors, but also from community donations.
                It's impossible to know just how much you will take home. You'll notice there's a <b>Tool Only Dapp</b> category.
                This is specifically for "Tool" style applications or libraries to promote the creation of EOS tooling.

                <!--<div style="font-size:13px; margin-top:20px;">-->
                    <!--<i>Notes about the block.one global hackathon prize.</i>-->
                    <!--<ul>-->
                        <!--<li>block.one is in no way endorsing any of the sponsors by allowing the winner of this hackathon to compete in the final stage of the eosio global hackathon.</li>-->
                        <!--<li>block.one will be reimbursing travel expenses, but not pre-paying them up front.</li>-->
                    <!--</ul>-->
                <!--</div>-->

                <!--<div style="font-size:13px; margin-top:20px;">-->
                    <!--<i>Notes about the tulip conference tickets.</i>-->
                    <!--<ul>-->
                        <!--<li>The Tulip Conference is being held in San Francisco, California.</li>-->
                        <!--<li>The tickets do not include travel expenses.</li>-->
                    <!--</ul>-->
                <!--</div>-->
            </figure>

            <!--<section class="prize-box blue-back shiny" style="margin-top:30px;">-->
                <!--<section class="left">-->
                    <!--Highest Voted Grand Winner-->
                    <!--<p style="font-size:13px; line-height:13px; margin-top:5px;">-->
                        <!--This winner is selected from the 4 Grand Winners based on the most votes.-->
                        <!--They also get all of the rewards from being one of the grand winners.-->
                    <!--</p>-->
                <!--</section>-->
                <!--<section class="right">-->
                    <!--<figure class="prize" style="font-size:22px;">This team will be able to compete as a finalist in the block.one EOSIO Global Hackathon!</figure>-->
                    <!--<figure class="prize">4 Tickets to the Tulip Conference in San Francisco</figure>-->
                <!--</section>-->
            <!--</section>-->

            <section class="prize-box blue-back" style="margin-top:30px;">
                <section class="left">
                    4 Grand Winners
                    <p style="font-size:13px; line-height:13px; margin-top:5px;">
                        We are splitting up the winnings over a few winners to help teams be able to build
                        what they are passionate about, and not just what they think the voters will like.
                    </p>
                </section>
                <section class="right">
                    <figure class="prize">1/5th of the Pot</figure>
                    <figure class="prize">Promoted Dapp on <u>eosindex.io</u></figure>
                </section>
            </section>

            <section class="prize-box">
                <section class="left">
                    Tool
                    <p style="font-size:13px; line-height:13px; margin-top:5px;">
                        This prize is reserved for tool only dapps/libraries. This includes things like
                        testing frameworks, language wrappers, etc.
                    </p>
                </section>
                <section class="right">
                    <figure class="prize">1/5th of the Pot</figure>
                    <figure class="prize">2 VIP Tickets to the Tulip Conference</figure>
                    <figure class="prize">Ledger Nano</figure>
                </section>
            </section>

            <section class="prize-box">
                <section class="left">
                    Donation Raffles
                    <p style="font-size:13px; line-height:13px; margin-top:5px;">
                        Anyone who donates to this hackathon + votes on at least 1 project or shares their personal referral link has a chance to win.
                    </p>
                </section>
                <section class="right">
                    <figure class="prize">Ledger Nanos</figure>
                    <figure class="prize">EOS Keychains</figure>
                    <figure class="prize">T-Shirts</figure>
                </section>
            </section>
            <donate></donate>


            <hr/>
            <h1 ref="events">we all like your <b>pajamas</b></h1>
            <figure class="text">
                To make sure that really great dapps get created the hackathon itself will be an online event,
                instead of an in person event held at a specific location. This means you can participate from home... in your pajamas.
                <br><br>
                We will however be holding a few announcement events across the globe which you are free to show up at (in your pajamas if you please).
            </figure>

            <figure class="box-head" style="margin-top:30px;">Online Hackathon Dates</figure>
            <section class="box blue-border no-border-top" style="padding-top:50px; padding-bottom:50px;">
                <h3>Hackathon Open To Submissions</h3>
                <h4><b>May 12th</b> to <b>May 24th</b></h4>

                <hr/>

                <h3>Community Voting Period</h3>
                <h4><b>May 20th</b> to <b>May 24th</b></h4>

                <hr/>

                <h3>Sponsor Voting Period</h3>
                <h4><b>May 25th</b> to <b>May 27th</b></h4>

                <hr/>

                <h3>Winner Announcement Ceremonies</h3>
                <h4><b>May 28th</b></h4>
            </section>

            <figure class="box-head" style="margin-top:20px;">Live Events</figure>
            <section class="box blue-border no-border-top" style="padding-top:50px; padding-bottom:50px;">
                <h3>Keep your eyes peeled.</h3>
                <h4>To Be <b>Announced</b></h4>
            </section>
            <!--<section class="box blue-border no-border-top" style="padding-bottom:0;">-->
                <!--<section class="event-boxes">-->
                    <!--<section class="event-box" v-for="ev in liveEvents">-->
                        <!--<figure class="img" style="background-image:url(https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200);"></figure>-->
                        <!--<figure class="button small">{{ev.location}}</figure>-->
                    <!--</section>-->
                <!--</section>-->

                <!--&lt;!&ndash;<figure class="button" style="margin-top:20px;">Want to <b>Host</b> and Event?</figure>&ndash;&gt;-->
            <!--</section>-->


            <hr/>
            <h1 ref="sponsors"><b>sponsored</b> by teamwork</h1>
            <figure class="text">
                The blockchain is about decentralization, and that means that the events should be decentralized as well.
                This hackathon is a community effort between some of the existing EOS dapps, users in the community and well
                respected Block Producer candidates. Block.one is hosting their own hackathon which is not
                associated with <b>Hack Til Dawn</b> in any way, shape, or form.
            </figure>

            <section v-for="sponsor in sponsors">
                <sponsors :title="sponsor[0]" :sponsors="sponsor[1]"></sponsors>
            </section>

            <hr/>
            <h1 ref="participate">sharing is <b>caring</b></h1>

            <figure class="text">
                Applications are the single most important thing to a smart-contract blockchain like EOS. Whether you're in EOS for the
                monetary gains or for the tech itself, dapps will make it happen and keep EOS alive and thriving.
                Help get the word out about this hackathon so that more developers jump on board.
            </figure>

            <share></share>


            <div style="height:80px"></div>
        </section>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex'
    import * as Actions from '../store/constants';
    import {RouteNames} from '../vue/Routing'

    import liveEvents from '../liveEvents';
    import blockProducers from '../blockProducers';
    import dappsAndCommunity from '../dappsAndCommunity';
    let timer = null;


    const shuffle = a => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    export default {
        data(){ return {
            routeNames:RouteNames,
            sponsors:shuffle([['Block Producer Candidates', shuffle(blockProducers)], ['Applications & Community', shuffle(dappsAndCommunity)]]),
            liveEvents,

            now: Math.trunc((new Date()).getTime() / 1000),
            date: null,
            diff: 0
        }},
        // num users
        // pricing
        computed: {
            seconds() { return Math.trunc(this.diff) % 60 },
            minutes() { return Math.trunc(this.diff / 60) % 60 },
            hours() { return Math.trunc(this.diff / 60 / 60) % 24 },
            days() { return Math.trunc(this.diff / 60 / 60 / 24) },
            ...mapState([
                'scatter'
            ])
        },
        mounted(){
            const d = new Date('5/12/2018');
            this.date = Math.trunc(+d/1000);
            this.now = Math.trunc((new Date()).getTime() / 1000);
            this.diff = this.date - this.now;
            timer = setInterval(() => {
                this.now = Math.trunc((new Date()).getTime() / 1000);
            }, 1000);
        },

        methods: {
            ...mapActions([

            ])
        },
        watch: {
            now(value) {
                this.diff = this.date - this.now;
                if(this.diff <= 0 || this.stop){
                    this.diff = 0;
                    clearInterval(timer);
                }
            }
        },
        destroyed() {
            clearInterval(timer);
        }
    }
</script>

<style lang="scss">
    .links {
        a {
            text-decoration: underline;
        }
    }

    .landing {

        .participate-head {
            font-size:30px;
            font-weight:800;
            margin-top:30px;

            .line {
                width:100px;
                height:1px;
                background:#dbdbdb;
                margin:20px 0;
            }
        }

        .sponsor-head {
            font-size:18px;
            font-weight:600;
            margin-top:80px;
            border-bottom:1px solid #dbdbdb;
            padding-bottom:5px;
            margin-bottom:20px;
        }

        .sponsors {

            .sponsor {
                max-height:150px;
                position: relative;
                margin-bottom:20px;
                overflow:hidden;

                @media (max-width:800px) {
                    max-height:none;
                    overflow:hidden;
                }

                .img {
                    width:200px;
                    height:150px;
                    border-radius:4px;
                    border:1px solid #c4c4c4;

                    background-size:cover;
                    background-position:center;
                    float:left;

                    @media (max-width:800px) {
                        width:100%;
                        height:200px;
                    }
                }

                .info {
                    float:left;
                    margin-left:30px;
                    width:calc(100% - 230px);

                    @media (max-width:800px) {
                        width:100%;
                        overflow:visible;
                        margin:10px 0 0;
                    }

                    .name {
                        font-size:36px;
                        color:#959595;

                        b {
                            font-weight:800;
                            color:#505050;
                        }
                    }

                    .url {
                        font-size:13px;
                        font-weight:800;
                        text-decoration: underline;
                    }
                }

                .bio {
                    font-size:16px;
                    margin-top:12px;
                    text-align: justify;
                    height:80px;
                    overflow:hidden;

                    float:left;
                    margin-left:30px;
                    width:calc(100% - 230px);

                    @media (max-width:800px) {
                        width:100%;
                        overflow:visible;
                        margin:10px 0 0;
                    }
                }
            }

        }

        .event-boxes {
            overflow:hidden;

            .event-box {
                width:calc(33.3% - 14px);
                border-radius:4px;
                height:220px;
                float:left;
                margin-right:20px;
                margin-bottom:10px;

                @media (max-width:800px) {
                    width:100%;
                }

                &:nth-child(3n+0){
                    margin-right:0;
                }

                .img {
                    height:150px;
                    background-size:cover;
                    background-position: center;
                    overflow: hidden;
                    border-radius:4px;
                }

                .button {
                    margin-top:2px;
                }
            }
        }



        .clock {
            font-size: 72px;
            color:#b0b0b0;
            font-weight: 300;

            @media (max-width:800px) {
                font-size: 50px;
            }
        }


    }
</style>