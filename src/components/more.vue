<template>
    <div>
        <div class="more" :style="{height:baseHeight}">
            <div>
                <slot></slot>
            </div>
        </div>
        <div class="show-more" v-if="show">
            <span class="toggle" :class="{bottom:this.showMore}" @click="toggleShowMore"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "more",
        props:{
            height:{
                type:String,
                default:'5.4rem'
            },
            show:{
                type:Boolean,
                default: true
            }
        },
        data(){
            return{
                showMore:false,
                baseHeight:''
            }
        },
        mounted() {
            this.baseHeight = this.height
            this.showMore = this.show
        },
        methods:{
            toggleShowMore(){
                this.showMore = !this.showMore
                this.baseHeight = this.baseHeight === 'auto' ? this.height : 'auto'
            }
        }
    }
</script>

<style scoped lang="scss">
    .more{
        overflow: hidden;
    }
    .show-more{
        text-align: center;
        padding-bottom:.2rem;

        span.toggle {
            width: .1rem;
            height: .1rem;
            border-style: solid;
            border-color: #A1A5B2;
            border-width: 0 2px 2px 0;
            transform: rotate(225deg);
            margin: .1rem 0 0 .05rem;
            display: inline-block;
            &.bottom{
                transform: rotate(44deg);
            }
        }
    }
</style>