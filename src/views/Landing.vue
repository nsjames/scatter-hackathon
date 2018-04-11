<template>
    <section>
        <hero></hero>
        <section class="landing">

            <div ref="fmenu" class="floating-menu-placeholder" :class="{'active':floatMenu}"></div>
            <section class="floating-menu" :class="{'float':floatMenu}">
                <figure class="link" :class="{'active':activeMenu === 'about'}" @click="scrollToRef('about')">About</figure>
                <figure class="link" :class="{'active':activeMenu === 'events'}" @click="scrollToRef('events')">Dates & Events</figure>
                <figure class="link" :class="{'active':activeMenu === 'sponsors'}" @click="scrollToRef('sponsors')">Sponsors</figure>
                <figure class="link" :class="{'active':activeMenu === 'participate'}" @click="scrollToRef('participate')">Participate</figure>
            </section>

            <!--<section class="box large-pad">-->
                <!--<h2 style="margin-top:0;">Mainnet Launches</h2>-->
                <!--<figure class="os clock">-->
                    <!--<span v-if="days > 0">{{days | twoDigit}} :</span>-->
                    <!--<span>{{hours | twoDigit}} :</span>-->
                    <!--<span>{{minutes | twoDigit}} :</span>-->
                    <!--<span>{{seconds | twoDigit}}</span>-->
                <!--</figure>-->
            <!--</section>-->

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
                Thus, The Hack Til Dawn Hackathon was born. We all know that in order for the EOS blockchain to go global,
                it will need next-level, blow your mind dapps, and fast. To make sure that happens, an alliance has been formed between
                Block Producer candidates, dapps, and community members temporarily to pool our resources to bring you incredible prizes and live events.
            </figure>

            <hr/>
            <h1>the <b>prizes</b> are awesome</h1>
            <figure class="text">
                There will be 10 total winners, 1st place, 2nd place and 8 runner ups.
            </figure>
            <section class="box blue-border" style="margin-top:50px; padding-top:50px; padding-bottom:50px;">
                <h3>The prizes will include</h3>
                <h4>Lots of <b>EOS</b></h4><br>
                <h4>Ledger <b>Nanos</b></h4><br>
                <h4>Dapp <b>Promotion</b></h4><br>
                <h4>EOS <b>Keychains</b></h4><br>
                <h4>Hackathon <b>T-Shirts</b></h4><br>
                <h4>And <b>More</b></h4><br>
            </section>
            <!--<section class="prize-box blue-back" style="margin-top:30px;">-->
                <!--<section class="left">1st Place</section>-->
                <!--<section class="right">-->
                    <!--<figure class="prize">Big bag 'o EOS</figure>-->
                    <!--<figure class="prize">Ledger Nano S</figure>-->
                    <!--<figure class="prize">EOS Keychain</figure>-->
                    <!--<figure class="prize">Promoted Dapp on <u>eosindex.io</u></figure>-->
                <!--</section>-->
            <!--</section>-->

            <!--<section class="prize-box">-->
                <!--<section class="left">2nd Place</section>-->
                <!--<section class="right">-->
                    <!--<figure class="prize">Less big bag 'o EOS</figure>-->
                    <!--<figure class="prize">Ledger Nano S</figure>-->
                    <!--<figure class="prize">EOS Keychain</figure>-->
                <!--</section>-->
            <!--</section>-->

            <!--<section class="prize-box">-->
                <!--<section class="left">8 Runners Up</section>-->
                <!--<section class="right">-->
                    <!--<figure class="prize">EOS Keychain</figure>-->
                    <!--<figure class="prize">Scatter Hackathon T-Shirt</figure>-->
                <!--</section>-->
            <!--</section>-->


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
                <h3>Get ready for it.</h3>
                <h4>Late <b>May</b></h4>
            </section>
            <!--<section class="box blue-border no-border-top" style="padding-top:50px; padding-bottom:50px;">-->
                <!--<h3>Hackathon Open To Submissions</h3>-->
                <!--<h4><b>May 8th</b> to <b>May 15th</b></h4>-->

                <!--<hr/>-->

                <!--<h3>Voting Period</h3>-->
                <!--<h4><b>May 16th</b> to <b>May 18th</b></h4>-->

                <!--<hr/>-->

                <!--<h3>Winner Announcement Ceremonies</h3>-->
                <!--<h4><b>May 19th</b></h4>-->
            <!--</section>-->

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
            <h1 ref="participate">want to <b>participate</b> too?</h1>
            <figure class="participate-head">Developers<figure class="line"></figure></figure>
            <figure class="text">
                Once the Hackathon is open you will be able to upload contracts to a Hackathon EOS Node, and push applications to a Hackathon Server using Docker images.
                <br><br>
                To be able to push projects to the servers you will need to add your project to this website. Once you do you will get an
                EOS account to use to push contracts and login details to push docker images.
                <br><br>
                Every project will get a subdomain matching their project name. For instance
                <u>hello-world.hack-til-dawn.com</u> will be the address for a Hello World project.
            </figure>

            <figure class="participate-head" style="margin-top:50px;">Everyone Else<figure class="line"></figure></figure>
            <figure class="text">
                Applications are the single most important thing to a smart-contract blockchain like EOS. Whether you're in EOS for the
                monetary gains or for the tech itself, dapps will make it happen and keep EOS alive and thriving.
                There are a few ways you can help and do your part.
            </figure>

            <section class="box blue-border" style="margin-top:50px;">
                <h2>Help Raise The Pot!</h2>
                <p>
                    There's little in life that motivates more than money. We, the sponsors, are all putting in as
                    much as we can but the higher the pot gets the more developers this hackathon will attract, leading to more dapps getting made.
                </p>

                <section class="box blue-border" style="margin-top:20px;">
                    <h3><b>Send whatever you want to the hackathon Ethereum address</b></h3>
                    <h4 class="eth os"><b>0xf1606542e795e18d92a749d27509ce54723499e3</b></h4>
                    <figure style="margin-top:20px;">
                        <img src="assets/img/qr.png"/>
                    </figure>
                </section>

                <hr/>

                <p>
                    <b>A note about non EOS tokens and ETH</b>
                    <br><br>

                    All non EOS tokens and ETH will be converted to EOS as time goes by. You will see it leaving the address to exchanges,
                    and then the equivalent amount of EOS will come back. We’re doing this because EOS will be needed to run applications on the
                    mainnet and we prefer to give the winners EOS and nothing else.
                </p>
            </section>

            <section class="box">
                <h2>Share This Page!</h2>
                <p>
                    In this day and age it takes a mob to get the word out about anything.
                    If you know any developers be sure to let them in on this opportunity.
                </p>

                <figure @click="twitterShare()" class="button">Share on <b>Twitter</b></figure>
                <figure @click="facebookShare()" class="button short-top">Share on <b>Facebook</b></figure>

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

    const url = "https://hack-til-dawn.com/";

    export default {
        data(){ return {
            floatMenu:false,
            activeMenu:'',
            blockProducers,
            dappsAndCommunity,
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
        created () { window.addEventListener('scroll', this.handleScroll); },
        destroyed () { window.removeEventListener('scroll', this.handleScroll); },
        mounted(){
            const d = new Date('6/3/2018');
            this.date = Math.trunc(+d/1000);
            this.now = Math.trunc((new Date()).getTime() / 1000);
            this.diff = this.date - this.now;
            timer = setInterval(() => {
                this.now = Math.trunc((new Date()).getTime() / 1000);
            }, 1000);
        },

        methods: {
            handleScroll(){
                const scroll = window.scrollY;
                this.floatMenu = !this.floatMenu
                    ?this.$refs.fmenu.offsetTop-20 < scroll
                    :this.$refs.fmenu.offsetTop+20 < scroll;

                const fromTop = window.innerHeight/2;
                if(scroll > this.$refs.about.offsetTop-fromTop && scroll < this.$refs.events.offsetTop-fromTop) this.activeMenu = 'about';
                else if(scroll > this.$refs.events.offsetTop-fromTop && scroll < this.$refs.sponsors.offsetTop-fromTop) this.activeMenu = 'events';
                else if(scroll > this.$refs.sponsors.offsetTop-fromTop && scroll < this.$refs.participate.offsetTop-fromTop) this.activeMenu = 'sponsors';
                else if(scroll > this.$refs.participate.offsetTop-fromTop) this.activeMenu = 'participate';
                else this.activeMenu = '';
            },
            scrollToRef(ref){
                this.$refs[ref].scrollIntoView({ behavior: 'smooth' });
            },
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
                    clearInterval(interval);
                }
            }
        },
        destroyed() {
            clearInterval(interval);
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
        max-width:840px;
        width:100%;
        margin:0 auto;
        padding:0 20px;

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
                }

                .info {
                    float:left;
                    margin-left:30px;
                    width:calc(100% - 230px);

                    @media (max-width:800px) {
                        height:150px;
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

        .floating-menu-placeholder {
            height:0;

            &.active {
                height:140px;
            }
        }

        .floating-menu {
            height:40px;
            line-height:40px;
            padding:0 25px;
            border-radius:4px;
            border:1px solid #e5e5e5;
            box-shadow:0 1px 2px rgba(0,0,0,0.05);
            display:table;
            margin:50px auto;
            background:#fff;
            transition: box-shadow 0.4s ease;
            z-index:9999;

            &.float {
                position:fixed;
                top:20px;
                right:0;
                left: 50%;
                transform: translateX(-50%);
                margin:0 auto;
                box-shadow: 0 8px 10px rgba(0,0,0,0.04);
            }

            .link {
                cursor: pointer;
                font-size:11px;
                font-weight:500;
                font-family: 'Open Sans', sans-serif;
                color:#cfcfcf;
                display:inline-block;
                margin-right:20px;
                transition:all 0.2s ease;

                &:last-child {
                    margin:0;
                }

                &:hover, &.active {
                    color:#478af7;
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

        h1 {
            text-align: center;
            width:100%;
            font-size:70px;
            font-weight: 200;
            color:#c4c4c4;
            margin-top:-40px;

            b {
                color:#505050;
                font-weight: 800;
            }
        }

        .text {
            color:#505050;
            font-size:20px;
            margin-top:30px;
            text-align: justify;
        }
    }
</style>