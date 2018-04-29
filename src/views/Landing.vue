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
            </figure>

            <section class="prize-box blue-back" style="margin-top:30px;">
                <section class="left">4 Grand Winners</section>
                <section class="right">
                    <figure class="prize">1/5th of the Pot</figure>
                    <figure class="prize">EOS Keychain</figure>
                    <figure class="prize">Promoted Dapp on <u>eosindex.io</u></figure>
                </section>
            </section>

            <section class="prize-box">
                <section class="left">Tool Only Dapp</section>
                <section class="right">
                    <figure class="prize">1/5th of the Pot</figure>
                    <figure class="prize">Ledger Nano S</figure>
                    <figure class="prize">EOS Keychain</figure>
                </section>
            </section>

            <section class="prize-box">
                <section class="left">3 Voter Winners</section>
                <section class="right">
                    <figure class="prize">Ledger Nano</figure>
                    <figure class="prize">EOS Keychain</figure>
                    <figure class="prize">Scatter Hackathon T-Shirt</figure>
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

            <section class="sponsor-head">Block Producer Candidates</section>
            <section class="sponsors">
                <section class="sponsor" v-for="sponsor in blockProducers">
                    <a :href="sponsor.url" target="_blank">
                        <figure class="img" :style="{ backgroundImage: `url(${sponsor.img})` }"></figure>
                    </a>
                    <section class="info">
                        <figure class="name"><b>{{sponsor.name}}</b>{{sponsor.name2}}</figure>
                        <figure v-if="sponsor.url" class="url"><a :href="sponsor.url" target="_blank">{{sponsor.url}}</a></figure>
                    </section>
                    <figure class="bio">{{sponsor.bio}}</figure>
                </section>
            </section>

            <section class="sponsor-head">Applications & Community</section>
            <section class="sponsors">
                <section class="sponsor" v-for="sponsor in dappsAndCommunity">
                    <a :href="sponsor.url" target="_blank">
                        <figure class="img" :style="{ backgroundImage: `url(${sponsor.img})` }"></figure>
                    </a>
                    <section class="info">
                        <figure class="name"><b>{{sponsor.name}}</b>{{sponsor.name2}}</figure>
                        <figure v-if="sponsor.url" class="url"><a :href="sponsor.url" target="_blank">{{sponsor.url}}</a></figure>
                    </section>
                    <figure class="bio">{{sponsor.bio}}</figure>
                </section>
            </section>


            <hr/>
            <h1 ref="participate">sharing is <b>caring</b></h1>

            <figure class="text">
                Applications are the single most important thing to a smart-contract blockchain like EOS. Whether you're in EOS for the
                monetary gains or for the tech itself, dapps will make it happen and keep EOS alive and thriving.
                Help get the word out about this hackathon so that more developers jump on board.
            </figure>

            <section class="box" style="margin-top:50px;">
                <h2>Share This Page!</h2>
                <p>
                    In this day and age it takes a mob to get the word out about anything.
                    If you know any developers be sure to let them in on this opportunity.
                </p>

                <figure @click="twitterShare()" class="button">Share on <b>Twitter</b></figure>
                <figure @click="facebookShare()" class="button short-top">Share on <b>Facebook</b></figure>
                <a href="https://t.me/HackTilDawn"><figure class="button short-top">Join our <b>Telegram</b></figure></a>

                <hr/>

                <p>
                    <b>Don’t stop there.</b>
                    <br><br>

                    Write about this on
                    <span class="links">
                        <a href="https://steemit.com/">Steemit</a>, <a href="https://busy.org/">Busy</a>,
                    <a href="https://medium.com/">Medium</a> or any other blog platform you participate in.
                    Tell your friends on
                    <a href="https://telegram.org/">Telegram</a>. Post about it on
                    <a href="https://www.reddit.com/">Reddit</a>. Help get the word out any way you can.
                    </span>
                </p>
            </section>

            <!--<section class="box">-->
                <!--<h2>Get Ready To Vote!</h2>-->
                <!--<p>-->
                    <!--There will be a voting period after the Hackathon closes and before the winner-->
                    <!--announcements. This wont be the final vote but it will have an impact on our decisions.-->
                <!--</p>-->

                <!--<figure class="button disabled"><b>View</b> the Projects</figure>-->
            <!--</section>-->





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

    const url = "https://hack-til-dawn.com/";

    export default {
        data(){ return {
            routeNames:RouteNames,
            blockProducers:shuffle(blockProducers),
            dappsAndCommunity:shuffle(dappsAndCommunity),
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
            twitterShare(){
                const text = `Check out this completely online #EOS hackathon!`;
                window.open(`http://twitter.com/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
            },
            facebookShare(){
                const text = `Check out this completely online EOS hackathon!`;
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${text}&hashtag=#EOS`, '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
            },
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