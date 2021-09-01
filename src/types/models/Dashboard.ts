export interface Statistic {
  orderDate: string;
  totalOrder: number;
  totalAmount: number;
}

export interface Order {
  orderId: string;
  buyerName: string;
  buyerEmail: string;
  period: string;
  package: string;
  orderDate: string;
  status: string;
}
