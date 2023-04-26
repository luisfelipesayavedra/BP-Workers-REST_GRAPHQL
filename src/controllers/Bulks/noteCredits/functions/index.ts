export interface noteCreditExcel {
  id?: string;
  numberNote: string;
  createdAt: string;
  statusDian: string; // estado legal
  status: string; //
  typeNote: string;
  warehouse: string;
  // factura asociada en data
  invoice: string;
  customer: string;
  customerDni: string;
  razon: string; // description
  itemName: string;
  itemRef: string;
  itemQuantity: string;
  totalNoteCredit: string;
  totalApply: string;
}