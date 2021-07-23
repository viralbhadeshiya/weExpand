// store interfaces for data stored in db.

export interface IStore {
  id: string;
  name: string;
  lan: string;
  log: string;
  businessType: 'mfg' | 'sales' | 'dealership';
}
