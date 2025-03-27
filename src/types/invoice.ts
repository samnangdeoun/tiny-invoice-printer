
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  items: InvoiceItem[];
  taxRate: number;
  taxAmount: number;
  subtotal: number;
  total: number;
}
