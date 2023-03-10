<template>
    <div>
        <!-- 挂载到 #app 节点下 -->
        <van-popup v-model="visible" @close="handleClose" :style="{ height: '40%' }" position="bottom" get-container="#app">
            <div class="Category">
                <div class="Category-title">
                    <span @click="handleClose">取消</span>
                    <h2>类别筛选</h2>
                    <span @click="handleConfirm">确认</span>
                </div>
                <div class="CategoryAll">
                    <van-checkbox v-model="checkedAll" @click="checkedAllChange">全选所有类别</van-checkbox>
                </div>
                <div class="CategoryCenter">
                    <div :class="{'CategorySelect':item.checked}" v-for="item in checkboxOptions[CategoryType].children" @click="clickCategoryType(item)">
                        {{item.label}}
                    </div>
                </div>
            </div>
            
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'CategoryFilterChange',
    props: {
        show: { type: Boolean, default: false },
        title: { type: String, default: '类别筛选' },
        CategoryType:{type: String, default: 'meet'}
    },
    data() {
        return {
            checkedAll:true,
            form: { meet: true, node: true, item: true },
            visible: false,
            formChild: { meetType: [], nodeType: [], itemType: [] },
            dialogSize: { width: '100%', height: '100%' },
            checkboxOptions: {
                meetings:{
                    prop: 'meet',
                    label: '会议',
                    child: 'meetType',
                    children: [
                        { label: '集团/区域会议', value: '1', checked: true, types: ['集团会议', '区域会议'] },
                        { label: '作战单元会议', value: '2', checked: true, heading: '(城市公司/项目群/片区)' },
                        { label: '项目会议', value: '3', checked: true, types: ['项目会议活动'] },
                    ],
                },
                nodes:{
                    prop: 'node',
                    label: '节点',
                    child: 'nodeType',
                    children: [
                        { label: '里程碑节点', checked: true, value: '1' },
                        { label: '一级节点', checked: true, value: '2' },
                        { label: '跟投返本', checked: true, value: '3', types: ['返本分红', '跟投返本'] },
                        { label: '首开', checked: true, value: '4', types: ['首开', '项目首开'] },
                        { label: '批复/工规证', checked: true, value: '5', types: ['取得《建设工程规划许可证》', ' 批复/工规证'] },
                        { label: '交付', checked: true, value: '6', types: ['项目交付', '交付'] },
                        { label: '生活馆/样板房开放', checked: true, value: '7', types: ['生活馆/样板房开放', '样板房对外开放', '生活馆对外开放'] },
                        { label: '主体结构封顶', checked: true, value: '8', types: ['主体结构封顶', '整体结顶', '首开结顶'] },
                    ],
                },
                importantIssues:{
                    prop: 'item',
                    label: '重难点事项',
                    child: 'itemType',
                    children: [
                        { label: '重难点', checked: true, value: '1' },
                        { label: '会议新增事项', checked: true, value: '2' },
                        { label: '资产处置', checked: true, value: '3' },
                        { label: '清盘', checked: true, value: '4' },
                        { label: '清算', checked: true, value: '5' },
                        { label: '注销', checked: true, value: '6' },
                    ],
                },
            },
        };
    },
    watch: {
        show: {
            handler(now, old) {
                if (now !== old) this.visible = now;
            },
            immediate: true,
        },
    },
    mounted() {
        //   this.formatCheckboxData();
    },
    methods: {
        // 全部
        checkedAllChange(el){
            this.checkboxOptions[this.CategoryType].children.map((item,index)=>{
                this.checkboxOptions[this.CategoryType].children[index].checked = this.checkedAll
            })
        },
        // 点击单个
        clickCategoryType(item){
            item.checked = !item.checked;
            this.checkedAll = this.checkboxOptions[this.CategoryType].children.every((cur)=>{
              return cur.checked == true;
            })
        },
        // 关闭弹窗
        handleClose() {
            this.$emit('update:show', false);
        },

        // 确定选择
        handleConfirm() {
            this.formatCheckboxData();
            this.$emit('update:show', false);
        },

        // 父级选择
        handleSelectAll(value, data, index) {
            if (!data.children) return;
            if (value) {
                const items = data.children.map(item => item.label);
                this.$set(this.formChild, data.child, items);
            } else {
                this.$set(this.formChild, data.child, []);
            }
            this.$set(this.checkboxOptions[index], 'indeterminate', false);
        },

        // 子级分类选择
        handleSelectSub(value, data, index) {
            const count = data.children.length;
            const isWhole = value.length === count;
            this.$set(this.form, data.prop, isWhole);
            this.$set(this.checkboxOptions[index], 'indeterminate', !isWhole);
            data.children.forEach(item => value.includes(item.label));
        },

        // 格式化返回值
        formatCheckboxData() {
            const { form, field, formChild, checkboxOptions,CategoryType } = this;
            const { fatherData = [], childrenData = [] } = {};
            console.log(checkboxOptions[CategoryType],form);
            // label
            checkboxOptions[CategoryType].children.forEach(item=>{
                    if (!item.checked) return;
                    item.types ? childrenData.push(...item.types) : childrenData.push(item.label);
                })
            let data = {
                clazz0:checkboxOptions[CategoryType].label,
                types: childrenData.join(',')
            }
            this.$emit('change', data);
        },
    },
};
</script>

<style lang="scss" scoped>
.Category{
    padding: rem(30);
    .Category-title{
        display: flex;
        justify-content: space-between;
        span{
            font-size: rem(28);
        }
        &:nth-child(1){
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            text-align: right;
            color: #000000;
        }
        h2{
            font-size: rem(32);
            line-height: rem(39);
        }
    }
    .CategoryAll{
        width: rem(690);
        height: rem(82);
        margin-top: rem(36);
        font-weight: 400;
        font-size: rem(28);
        background: rgba(190, 207, 253, 0.15);
        .van-checkbox{
            margin-left: rem(21);
        }
        :deep(.van-checkbox__label){
            line-height:rem(82);
        }
    }
    .CategoryCenter{
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        margin-top: rem(18);
        padding-top: rem(20);
        display: grid;
        /* grid-gap: 30px 50px */
        grid-column-gap:rem(16);
        grid-row-gap: rem(16);
        /* 一行放两列、两个auto */
        grid-template-columns: auto auto auto;
        padding: 10px;
        .CategorySelect{
            background: #425BB5;
            color: #FFFFFF;
        }
        div{
            overflow: hidden;
            width: rem(216);
            height: rem(68);
            line-height: rem(68);
            margin-bottom: rem(20);
            background: rgba(190, 207, 253, 0.15);
            border-radius: rem(15);
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: rem(28);
            text-align: center;
            color: rgba(51, 51, 51, 0.6);
        }
    }
}

</style>
