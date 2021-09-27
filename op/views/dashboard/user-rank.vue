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
import {isSingleMatch} from '@/script/utils'
import { GameType } from '@/constant'
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
          width: 90,
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
          title: '员工',
          render: (h, params) => {
            const avatar = h('Avatar', {
              props: {
                src: params.row.avatar,
                size: 'small'
              }
            })
            const userName = h('p', {style: {marginLeft: '10px'}}, params.row.name)
            return h('div', {
              attrs: {class: 'd-flex'},
              style: {lineHeight: '24px'}
            }, [avatar, userName])
          }
        },
        {title: '机构', key: 'department', width: 170},
        {
          title: '比赛场次',
          width: 90,
          render: (h, params) => {
            const typeCount = params.row.typeCount
            const singleCategory = typeCount[GameType.Single_Category] || 0
            const singleDaily = typeCount[GameType.Single_Daily] || 0
            const multiple2 = (typeCount[GameType.Match2Random] || 0) + (typeCount[GameType.Match2Random_Old_Rule] || 0) + (typeCount[GameType.Match2Invite_Old_Rule] || 0)
            const multiple4 = (typeCount[GameType.Match4Random] || 0) + (typeCount[GameType.Match4Random_Old_Rule] || 0) + (typeCount[GameType.Match4Invite_Old_Rule] || 0)
            const total = (singleCategory + singleDaily + multiple2 + multiple4)
            const contentArr = [
              {title: '每日', count: singleDaily},
              {title: '专项', count: singleCategory},
              {title: '二人', count: multiple2},
              {title: '四人', count: multiple4}
            ]
            return h('Tooltip', {
              props: {
                content: contentArr.filter(i => i.count > 0).map(i => i.title + ':' + i.count).join(' ')
              },
              style: {
                cursor: 'pointer'
              }
            }, total)
          }
        },
        {title: '积分', key: 'score', width: 100}
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
          now.setDate(now.getDate() - ((now.getDay() === 0 ? 7 : now.getDay()) - 1))
          return now.format('yyyy-MM-dd') + ' 00:00:00'
        case CycleEnum.month:
          return now.format('yyyy-MM') + '-01 00:00:00'
        case CycleEnum.year:
          return now.format('yyyy') + '-01-01 00:00:00'
      }
    },
    parseList (list) {
      function getUser (id, name, department, avatar, type) {
        let result = userList.find(u => u.id === id)
        if (!result) {
          result = {id, name, department, avatar, score: 0, typeCount: {}}
          userList.push(result)
        }
        if (typeof result.typeCount[type] !== 'number') {
          result.typeCount[type] = 0
        }
        return result
      }
      const userList = []
      list.forEach(matchRecord => {
        const curType = matchRecord.type
        let user = null
        if (isSingleMatch(curType)) {
          user = getUser(matchRecord.user1, matchRecord.username1, matchRecord.department1, matchRecord.avatar1, curType)
          const curScore = parseInt(matchRecord.scoreList)
          // 累加
          user.score += curScore
          user.typeCount[curType]++
        } else {
          const scoreList = matchRecord.scoreList.split(',').map(s => parseInt(s))
          for (let i = 0; i < 4; i++) {
            const curUserId = matchRecord['user' + (i + 1)]
            if (curUserId) {
              const curScore = scoreList[i]
              const curUserName = matchRecord['username' + (i + 1)]
              const curDepartment = matchRecord['department' + (i + 1)]
              const curAvatar = matchRecord['avatar' + (i + 1)]
              user = getUser(curUserId, curUserName, curDepartment, curAvatar, curType)
              user.score += curScore
              user.typeCount[curType]++
            }
          }
        }
      })
      this.list = userList.sort((u1, u2) => u1.score - u2.score > 0 ? -1 : 1)
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
