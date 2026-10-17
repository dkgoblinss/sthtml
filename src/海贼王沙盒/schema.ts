// 海贼王沙盒 MVU Schema
// 注意：schema.ts 顶部禁止任何 import 语句（z/_ 已为全局注入）

const CharacterState = z.object({
  姓名: z.string(),
  好感度: z.number().min(0).max(100),
  性欲值: z.number().min(0).max(100),
  理性值: z.number().min(0).max(100),
  受孕欲望: z.number().min(0).max(100),
  关系阶段: z.enum(["陌生", "暧昧", "好感", "沉沦", "受精"]),
  生理周期天数: z.number().min(1),
  当前周期第几天: z.number().min(1),
  是否排卵日: z.boolean(),
  排卵日周期天数: z.number().min(5).max(7),
  安全日周期天数: z.number().min(5).max(7),
  是否已受精: z.boolean(),
  怀孕天数: z.number().min(0).default(0),
  ntr_status: z.object({
    发生次数: z.number().min(0).default(0),
    最近发生日期: z.string().optional()
  })
});

const GlobalVariables = z.object({
  current_day: z.number().min(1),
  current_date: z.string(),
  current_location: z.string()
});

export const Schema = z.object({
  全局变量: GlobalVariables,
  娜美: CharacterState,
  罗宾: CharacterState,
  薇薇: CharacterState
});

export type StatData = z.infer<typeof Schema>;
