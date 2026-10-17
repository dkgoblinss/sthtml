import { defineMvuDataStore } from '@util/mvu';
import type { StatData } from '../../schema';

export const useDataStore = defineMvuDataStore<{ stat_data: StatData }>({
  stat_data: {} as StatData,
}, {
  type: 'message',
  message_id: getCurrentMessageId(),
});
