// MVU 变量结构定义
// 注意：不要在此文件顶部添加任何 import 语句
// z (Zod) 和 _ (lodash) 已由 forge 运行时注入

export const Schema = z.object({
  世界: z.object({
    日期: z.coerce.number().transform(v => _.clamp(Math.round(v), 1, 36500)),
    时间段: z.enum(['早晨', '上午', '下午', '傍晚', '夜晚']),
    位置: z.enum(['鸣人家', '邻居家', '街道与商业区', '火影楼', '温泉澡堂', '忍者学校', '其他']),
    鸣人状态: z.enum(['在家', '不在家'])
  }),
  雏田: z.object({
    好感度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    顺从度: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    受精欲: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    关系阶段: z.enum(['普通', '动摇并越界', '沉沦', '受精怀孕']),
    生理日程: z.enum(['安全日', '排卵日'])
  })
}).prefault({
  世界: {
    日期: 1,
    时间段: '上午',
    位置: '邻居家',
    鸣人状态: '不在家'
  },
  雏田: {
    好感度: 40,
    顺从度: 20,
    受精欲: 30,
    关系阶段: '普通',
    生理日程: '安全日'
  }
});

export type SchemaType = z.infer<typeof Schema>;
