<template>
    <van-popover v-model="showPopover" placement="top" theme="dark" trigger="click" get-container="#app">
        <div class="prpoverCenter" @click="showPopover=false">
            <div class="item">
                <div v-if="Array.isArray(getComputedPropver.value)">
                    <p v-for="textItem in getComputedPropver.value">
                        {{ textItem }}<br />
                    </p>
                </div>
                <span v-else>{{ getComputedPropver.value }}</span>
            </div>
        </div>
        <template #reference>
            <div class="radiu" slot="reference"> ! </div>
        </template>
    </van-popover>
</template>

<script>
export default {
    data() {
        return {
            showPopover: false,
            getDataValue: {
                region: {
                    RegionOverviewQuota: {
                        '归母净利润': '年度合并口径',
                        "长库存去化": ['①普通住宅（高层、小高层、多层）库龄18个月以上；', '②低密住宅（独栋别墅、联排、合院、叠墅）库龄24个月以上。']
                    },
                    RegionOverviewOperate: {
                        "归母净利润": '所辖未注销项目的动态全景管理口径归母净利润合计',
                        "项目个数": '所辖未注销项目'
                    },
                },
                project: {
                    RegionOverviewQuota:
                    {
                        "归母净利润": '年度合并口径',
                        '长库存去化': ['①普通住宅（高层、小高层、多层）库龄18个月以上；', '②低密住宅（独栋别墅、联排、合院、叠墅）库龄24个月以上。']
                    },
                    RegionOverviewOperate: {
                        "归母净利润": '所辖未注销项目的动态全景管理口径归母净利润合计',
                        "项目个数": '所辖未注销项目'
                    },
                },
            }
        };
    },
    props: {
        data: {},
        container:{}
    },
    computed: {
        getComputedPropver() {
            const type = this.$route.fullPath.indexOf('/region') != -1 ? 'region' : 'project';
            return { value: this.getDataValue[type][this.$route.name][this.data] }
        }
    },
};
</script>

<style lang="scss" scoped>
.radiu {
    width: rem(24);
    height: rem(24);
    border-radius: 50%;
    background: #1E4182;
    text-align: center;
    line-height: rem(24);
    color: #ffffff;
    font-size: rem(20);

}


.prpoverCenter {
    width: rem(280);
    display: flex;
    flex-direction: column;
    margin-left: rem(10);

    .item {
        display: flex;
        justify-content: center;
        padding: rem(20);
        span {
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: rem(28);
            color: #ffffff;
        }
        p{
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: rem(28);
            color: #ffffff; 
        }
    }

}
</style>
