<template>
  <div id="dash-user-rank">
    <div class="d-flex space-between">
      <p>用户排名</p>
      <Select size="small" v-model="cycle" style="width: 70px;" @on-change="initData">
        <Option :value="CycleEnum.all">所有</Option>
        <Option :value="CycleEnum.today">今日</Option>
        <Option :value="CycleEnum.week">本周</Option>
        <Option :value="CycleEnum.month">本月</Option>
        <Option :value="CycleEnum.year">年度</Option>
      </Select>
    </div>
    <Table :columns="column" :data="list" size="small" stripe :loading="loading"
      :height="tableHeight" style="margin-top: 10px;"></Table>
  </div>
</template>
<script>
import {CycleEnum} from 'op/constant'
import rank1Svg from '@/assets/image/rank-1.svg'
import rank2Svg from '@/assets/image/rank-2.svg'
import rank3Svg from '@/assets/image/rank-3.svg'
import {dashUserRank} from 'op/api/op.js'
export default {
  data () {
    return {
      CycleEnum,
      rank1Svg,
      rank2Svg,
      rank3Svg,
      cycle: CycleEnum.today,
      list: [],
      loading: false,
      tableHeight: 0,
      column: [
        {
          title: '名次',
          width: 100,
          render: (h, params) => {
            const idx = params.index
            if (idx === 0) {
              return h('img', {
                attrs: {
                  src: rank1Svg
                }
              })
            } else if (idx === 1) {
              return h('img', {
                attrs: {
                  src: rank2Svg
                }
              })
            } else if (idx === 2) {
              return h('img', {
                attrs: {
                  src: rank3Svg
                }
              })
            } else {
              return h('p', {style: {paddingLeft: '7px'}}, idx + 1)
            }
          }
        },
        {
          title: '部门',
          key: 'name'
        },
        {
          title: '参与员工数量',
          key: 'userCount',
          render: (h, params) => {
            const userList = params.row.userList
            const maxDisCount = 10
            return h('Tooltip', {
              props: {
                content: userList.slice(0, maxDisCount).map(i => i.userName).join(',') + (userList.leng > maxDisCount ? ' 等' : '')
              },
              style: {
                cursor: 'pointer'
              }
            }, userList.length)
          }
        },
        {
          title: '比赛场次',
          key: 'matchCount'
        },
        {title: '积分', key: 'score'}
      ]
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    const wrapHeight = document.getElementById('index-page').clientHeight
    this.tableHeight = wrapHeight - 10 - 150 - 20 - 24 - 20 - 20 * 2
  },
  methods: {
    initData () {
      this.loading = true
      dashUserRank(this.getDatetime()).then(list => {
        this.parseList(list)
        this.loading = false
      })
    },
    getDatetime () {
      const now = new Date()
      switch (this.cycle) {
        case CycleEnum.all:
          return '2000-01-01 00:00:00'
        case CycleEnum.today:
          return now.format('yyyy-MM-dd') + ' 00:00:00'
        case CycleEnum.week:
          now.setDate(now.getDate() - (now.getDay() - 1))
          return now.format('yyyy-MM-dd') + ' 00:00:00'
        case CycleEnum.month:
          return now.format('yyyy-MM') + '-01 00:00:00'
        case CycleEnum.year:
          return now.format('yyyy') + '-01-01 00:00:00'
      }
    },
    parseList (list) {
      const departmentList = []
      function getDep (name) {
        let result = departmentList.find(i => i.name === name)
        if (!result) {
          result = {name, userList: [], score: 0, matchCount: 0}
          departmentList.push(result)
        }
        return result
      }
      function addUserScoreInDep (dep, userId, userName, userAvatar, userScore, type) {
        let result = dep.userList.find(i => i.userId === userId)
        if (!result) {
          result = {userId, userName, userAvatar, userScore: 0, typeCount: {}}
          dep.userList.push(result)
        }
        dep.score += userScore
        dep.matchCount++
        if (typeof result.typeCount[type] !== 'number') {
          result.typeCount[type] = 0
        }
        result.typeCount[type]++
        result.userScore += userScore
      }
      list.forEach(record => {
        const curType = record.type
        const scoreList = record.scoreList.split(',').map(s => parseInt(s))
        for (let i = 1; i <= 4; i++) {
          const curDep = record['department' + i]
          if (curDep) {
            const dep = getDep(curDep)
            const [userId, userName, userAvatar, userScore] = [
              record['user' + i],
              record['username' + i],
              record['avatar' + i],
              scoreList[i - 1]
            ]
            addUserScoreInDep(dep, userId, userName, userAvatar, userScore, curType)
          }
        }
      })
      console.log(departmentList)
      this.list = departmentList.sort((d1, d2) => d1.score - d2.score > 0 ? -1 : 0)
    }
  }
}
</script>
<style lang="scss" scoped>
#dash-user-rank {
  $avatar-size: 30px;
  .table-wrap {
    height: calc(100% - 20px -24px);
    overflow: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    thead {
      text-align: left;
      line-height: 30px;
      font-size: 14px;
      background-color: var(--color-bg);
      & > th:first-child {
        padding-left: 5px;
      }
    }
    tbody {
      & > tr {
        & > td {
          padding: 6px 0;
          &:first-child {
            padding-left: 5px;
          }
          &.user-info-col {
            & > div {
              display: flex;
              align-content: center;
            }
            img.avatar {
              width: $avatar-size;
              border-radius: 50%;
            }
            p {
              line-height: $avatar-size;
              margin-left: 5px;
            }
          }
        }
        &:hover {
          background-color: var(--color-bg);
        }
      }
    }
  }
}
</style>
