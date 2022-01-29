import { Model } from 'objection';
import { AbstractTableField } from './abstract-table-field.enum';
import { getFormattedISODate } from '~/helpers/helpers';

class AbstractModel extends Model {
  [AbstractTableField.ID]: string;

  [AbstractTableField.CREATED_AT]: string;

  $beforeInsert(): void {
    const date = getFormattedISODate(new Date());
    this.createdAt = date;
  }
}

export { AbstractModel };
