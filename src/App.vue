<template>
    <div>
        <keep-alive  >
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </div>
</template>
<script>
import './assets/css/resrt.css'
export default{
    name:'App',
    data(){
        return{
        }
    },
}
</script>
<style lang="scss">
.appbox{
    width: 100%;
    height: 100%;
    background: #FFFFFF;
}
</style>

