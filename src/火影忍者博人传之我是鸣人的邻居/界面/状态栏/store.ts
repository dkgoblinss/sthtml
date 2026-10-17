import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

/**
 * MVU 数据存储
 * 连接到当前消息楼层的 stat_data 变量
 */
export const useDataStore = defineMvuDataStore(Schema, {
  type: 'message',
  message_id: getCurrentMessageId()
});
