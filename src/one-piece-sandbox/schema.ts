/**
 * 变量结构定义
 * 此文件定义所有 MVU 变量的数据结构
 */

export interface StatData {
  系统: SystemData;
  娜美: CharacterData;
  薇薇: CharacterData;
  罗宾: CharacterData;
}

/** 系统级变量 */
export interface SystemData {
  /** 当前日期（格式：X年X月X日） */
  当前日期: string;
  /** 当前时间段（早晨/上午/中午/下午/傍晚/夜晚/深夜） */
  当前时间段: string;
  /** 当前地点（具体位置） */
  当前地点: string;
}

/** 角色数据结构 */
export interface CharacterData {
  /** 好感度（0~100） */
  好感度: number;
  /** 性欲值（0~100） */
  性欲值: number;
  /** 理性值（0~100） */
  理性值: number;
  /** 受孕欲望（0~100，计算值） */
  受孕欲望: number;
  /** 关系阶段（陌生/暧昧/好感/沉沦/受精） */
  关系阶段: string;
  /** 生理周期 */
  生理周期: MenstrualCycle;
  /** 怀孕状态（未怀孕/已怀孕） */
  怀孕状态: string;
  /** NTR 状态（隐藏） */
  NTR状态?: NTRStatus;
}

/** 生理周期数据 */
export interface MenstrualCycle {
  /** 当前状态（排卵日/安全日） */
  当前状态: string;
  /** 周期天数（5~7天随机） */
  周期天数: number;
  /** 当前进度（第几天） */
  当前进度: number;
  /** 下次切换日期 */
  下次切换日期: string;
}

/** NTR 状态（隐藏变量，不在主面板显示） */
export interface NTRStatus {
  /** 被 NTR 次数 */
  被NTR次数: number;
  /** 近期 NTR 记录（最多保留3条） */
  近期NTR记录: NTRRecord[];
}

/** NTR 记录条目 */
export interface NTRRecord {
  /** 日期 */
  日期: string;
  /** 对象名（巴雷特/费兰克/德拉克） */
  对象: string;
  /** 地点 */
  地点: string;
  /** 手段（粗暴/诱导/要挟） */
  手段: string;
}
