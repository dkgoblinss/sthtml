// MVU 变量结构定义
// 注意：不要在此文件顶部添加任何 import 语句
// z (Zod) 和 _ (lodash) 已由 forge 运行时注入

const 生理日程Schema = z.object({
  当前状态: z.enum(['安全日', '排卵日']).describe('当前生理状态'),
  周期天数: z.number().int().min(1).max(8).describe('当前周期第几天')
});

const 角色数据Schema = z.object({
  好感度: z.number().int().min(0).max(100).describe('对<user>的好感度'),
  淫乱出轨值: z.number().int().min(0).max(100).describe('淫乱程度与出轨意愿'),
  生理日程: 生理日程Schema,
  受孕欲望: z.number().int().min(0).max(100).describe('受孕欲望百分比（计算字段）')
});

export const Schema = z.object({
  系统: z.object({
    当前日期: z.string().describe('当前游戏内日期，格式：C.E.XX年XX月XX日'),
    当前时间: z.string().describe('当前游戏内时间，格式：HH:MM'),
    当前地点: z.string().describe('当前场景位置'),
    剧情阶段: z.string().describe('当前处于原作剧情的哪个阶段')
  }),
  拉克丝: 角色数据Schema,
  露娜玛利亚: 角色数据Schema,
  卡嘉丽: 角色数据Schema,
  原作关系状态: z.object({
    基拉与拉克丝: z.enum(['稳定', '裂痕', '破裂']).describe('基拉与拉克丝的关系状态'),
    阿斯兰与卡嘉丽: z.enum(['稳定', '裂痕', '破裂']).describe('阿斯兰与卡嘉丽的关系状态'),
    真飞鸟与露娜玛利亚: z.enum(['稳定', '裂痕', '破裂']).describe('真飞鸟与露娜玛利亚的关系状态')
  })
}).prefault({
  系统: {
    当前日期: 'C.E.75年4月1日',
    当前时间: '09:00',
    当前地点: '孔帕斯基地',
    剧情阶段: 'FREEDOM开始'
  },
  拉克丝: {
    好感度: 0,
    淫乱出轨值: 0,
    生理日程: {
      当前状态: '安全日',
      周期天数: 1
    },
    受孕欲望: 0
  },
  露娜玛利亚: {
    好感度: 0,
    淫乱出轨值: 0,
    生理日程: {
      当前状态: '安全日',
      周期天数: 1
    },
    受孕欲望: 0
  },
  卡嘉丽: {
    好感度: 0,
    淫乱出轨值: 0,
    生理日程: {
      当前状态: '安全日',
      周期天数: 1
    },
    受孕欲望: 0
  },
  原作关系状态: {
    基拉与拉克丝: '稳定',
    阿斯兰与卡嘉丽: '稳定',
    真飞鸟与露娜玛利亚: '稳定'
  }
});

export type SchemaType = z.infer<typeof Schema>;
