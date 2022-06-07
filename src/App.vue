<template>
  <div id="app" >
    <header class="el-header" style="height: 60px;">混沌速运费用计算器</header>

    <div class="main">
      <Row class="row">
        <Cell width="10">
          <div style="float: right">出发地(Ship from)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <Select @change="getPrice" style="width: 500px" v-model="start" :datas="place"></Select>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">到达地(Ship to)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <Select @change="getPrice" style="width: 500px" v-model="end" :datas="place"></Select>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">物品体积(Volume)：</div>
        </Cell>
        <Cell width="14">
          <div class="h-input-group" style="width: 500px">
            <NumberInput @input="getPrice" style="width: 500px" v-model="volume" :max="max" :min="1"></NumberInput>
            <span class="h-input-addon" style="background: #fff">{{vL}}/10</span>
          </div>
        </Cell>
      </Row>
      <span style="display: block;text-align: center;margin-bottom: 10px;color: red">（保证金是保护您快递的唯一方式，请认真填写，禁止虚高或虚低）</span>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">保证金(Collateral)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <div class="h-input-group" style="width: 500px">
              <NumberInput @input="getPrice" style="width: 500px" v-model="bond" :max="99999999999999999" :min="1"></NumberInput>
              <span class="h-input-addon" style="background: #fff">{{ bL }}/18</span>
            </div>

          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">合同类型(Type)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <Select style="width: 500px" @change="getPrice" v-model="type" :datas="typeList"></Select>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">支付运费(Reward)：</div>
        </Cell>
        <Cell width="14">
          <span class="result">{{ toThousands(price) }} {{ price !== '--' ? 'ISK' : ''}}</span>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">收费标准(Charges)：</div>
        </Cell>
        <Cell width="14">
          <span class="result">{{ charges }}</span>
        </Cell>
      </Row>
    </div>
    <header class="el-header" style="height: 60px;">合同样本</header>
    <div class="main">
      <span style="display: block;text-align: center;margin-bottom: 10px">（温馨提示：复制下面样本可无输入完成快递合同的创建）</span>

      <Row class="row">
        <Cell width="10">
          <div style="float: right">合同类型(Contract Type)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <div class="h-input-group" style="width: 500px">
              <input disabled type="text" style="width: 500px" value="快递合同"/>
            </div>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">接单人名称(雨轩快递)：</div>
        </Cell>
        <Cell width="14">
          <div>
              <input disabled type="text" style="width: 500px" value="Yuxuan Express"/>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">接单人名称(月光快递)：</div>
        </Cell>
        <Cell width="14">
          <div>
              <input disabled type="text" style="width: 500px" value="Moonlight Chaos"/><span style="margin-left: 10px">(不支持寂静谷内运输、不接受超过10亿保证金的合同)</span>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">接单人名称(联盟快递)：</div>
        </Cell>
        <Cell width="14">
          <div>
              <input disabled type="text" style="width: 500px" value="S.F Express"/>
              <span style="margin-left: 10px">(不支持9OO为起点或终点、不支持寂静谷内运输)</span>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">到达地(Ship to)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <div class="h-input-group" style="width: 500px">
              <input disabled type="text" style="width: 500px" v-model="endText"/>
            </div>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">奖励(Reward)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <div class="h-input-group" style="width: 500px">
              <input disabled type="text" style="width: 500px" v-model="price"/>
            </div>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">保证金(Collateral)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <div class="h-input-group" style="width: 500px">
              <input disabled type="text" style="width: 500px" v-model="bond"/>
            </div>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">期满(Expiration)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <div class="h-input-group" style="width: 500px">
              <input disabled type="text" style="width: 500px" v-model="expiration"/>
            </div>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">完成时限(Days of complete)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <div class="h-input-group" style="width: 500px">
              <input disabled type="text" style="width: 500px" v-model="complete"/>
            </div>
          </div>
        </Cell>
      </Row>
      <Row class="row">
        <Cell width="10">
          <div style="float: right">描述(Description)：</div>
        </Cell>
        <Cell width="14">
          <div>
            <div class="h-input-group" style="width: 500px">
              <input disabled type="text" style="width: 500px" v-model="description"/>
            </div>
          </div>
        </Cell>
      </Row>
    </div>
  </div>
</template>

<script>
function toThousands(num) {
  let result = '', counter = 0;
  num = (num || 0).toString();
  for (var i = num.length - 1; i >= 0; i--) {
    counter++;
    result = num.charAt(i) + result;
    if (!(counter % 3) && i != 0) { result = ',' + result; }
  }
  return result;
}
export default {
  name: 'App',
  computed:{
    bL(){
      if(this.bond){
        return this.bond.toString().length
      }else{
        return 0
      }
    },
    vL(){
      if(this.volume){
        return this.volume.toString().length
      }else{
        return 0
      }
    }
  },
  methods:{
    toThousands(a){return toThousands(a)},

    getPrice(){
      if(this.end !== null){
        let tag = false
        this.place.forEach(item=>{
          if(item.key === this.end){
            tag = true
            this.endText = item.title
          }
        })
        if(tag === false){
          this.endText = null
        }
      }
      if(this.start === 4 && this.end === 4){
        this.max = 1000000
      }else{
        this.max = 340000
      }
      if(this.bond != null && this.volume != null && this.type != null){
       // 寻找航线
        let tag = false;
        this.route.forEach(item=>{
          if(item.start === this.start && item.end === this.end){
            tag = true
            if(this.type === 0){
              this.expiration = '2 周/2 Weeks'
              this.complete = '7 天/7 Day'
              this.description = '选填'
              // 标准快递
              this.charges = '标准快递，运费标准：' + item.price + " ISK/m³" + (item.bond ?(' + 保证金' + item.bond * 100 + '%') :'')
              this.price = item.price * this.volume
              if(item.bond){
                this.price += item.bond * this.bond
              }
              if(this.price < 5000000){
                this.price = 5000000
                this.charges += '; 运费不足500W，按500W计算'
              }
              if(this.price <this.bond * 0.01 && !item.bond){
                this.price = this.bond * 0.01
                this.charges += '; 运费不足保证金1%，按保证金1%计算'
              }
            }
            if(this.type === 2){
              this.expiration = '2 天/2 Day'
              this.complete = '1 天/1 Day'
              this.description = '超加急'
              let dw = 0;
              if(this.volume < 150000){
                dw = 150000
              }else if(this.volume >= 150000 && this.volume < 250000){
                dw = 250000
              }else if(this.volume >= 250000 && this.volume < 340000){
                dw = 340000
              }else{
                dw = 1000000
              }
              this.charges = '超加急快递('+toThousands(dw)+'挡位)，运费标准：' + (item.price*2) + " ISK/m³" + (item.bond ?(' + 保证金' + item.bond * 100 + '%') :'')
              this.price = item.price * 2 * dw
              if(item.bond){
                this.price += item.bond * this.bond
              }

              if(this.price <this.bond * 0.05 && !item.bond){
                this.price = this.bond * 0.05
                this.charges += '; 运费不足保证金5%，按保证金5%计算'
              }
            }

            if(this.type === 1){
              this.expiration = '2 周/2 Weeks'
              this.complete = '1 天/1 Day'
              this.description = '加急'
              let dw = 0;
              if(this.volume < 150000){
                dw = 150000
              }else if(this.volume >= 150000 && this.volume < 250000){
                dw = 250000
              }else if(this.volume >= 250000 && this.volume < 340000){
                dw = 340000
              }else{
                dw = 1000000
              }
              this.charges = '加急快递('+toThousands(dw)+'挡位)，运费标准：' + item.price + " ISK/m³" + (item.bond ?(' + 保证金' + item.bond * 100 + '%') :'')
              this.price = item.price * dw
              if(item.bond){
                this.price += item.bond * this.bond
              }

              if(this.price <this.bond * 0.01 && !item.bond){
                this.price = this.bond * 0.01
                this.charges += '; 运费不足保证金1%，按保证金1%计算'
              }
            }

          }
        })

        if(tag === false){
          this.$Message({
            type:'error',
            text: `没有这条运输路线`
          });
          this.price = '--'
          this.charges = '--'
        }

      }else{
        this.price ='--'
        this.charges = '--'
      }

    }
  },
  data() {
    return {
      description: '',
      expiration: '',
      complete: '',
      charges: '--',
      price: '--',
      dw: null,
      volume: null,
      start: null,
      end: null,
      endText: null,
      bond: null,
      type: null,
      max: 340000,
      route:[
          {start: 0,end: 1,price: 700},
          {start: 0,end: 2,price: 700},
          {start: 0,end: 3,price: 700},
          {start: 1,end: 0,price: 500,bond:0.02},
          {start: 2,end: 0,price: 500,bond:0.02},
          {start: 1,end: 2,price: 300},
          {start: 1,end: 3,price: 300},
          {start: 2,end: 3,price: 500},
          {start: 3,end: 2,price: 500},
          {start: 4,end: 4,price: 300},
          {start: 3,end: 0,price: 500,bond:0.02},
      ],
      place: [
        {title: 'Jita IV - Moon 4 - Caldari Navy Assembly Plant', key: 0},
        {title: '9OO-LH - Chaos arbiter', key: 1},
        {title: '4-HWWF - Fraternity Central Station', key: 2},
        {title: 'Otsasai - Fuxi Prime - Home for Ever', key: 3},
        {title: '寂静谷境内运输', key: 4},
      ],
      typeList: [
        {title: '标准快递合同（不保证时间）', key: 0},
        {title: '加急快递合同（接单24小时内完成）', key: 1},
        {title: '超加急快递合同（雨轩提供、挂单24小时完成）', key: 2},
      ],
    };
  },
}
</script>

<style>
.result {
  color: red;
}

.row {
  line-height: 30px;
  height: 41px;
}

.main {
  background-color: #e9eef3;
  color: #333;
  padding: 20px;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  letter-spacing: 10px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  line-height: 60px;
}

</style>
