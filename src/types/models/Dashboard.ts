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

export interface Summary {
  totalOrder: number;
  totalAmount: number;
  commission: number;
  paidCommission: number;
}

export interface Seller {
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  reseller: string;
  saleName: string;
  bankAccountNumber: string;
  bankName: string;
  bankAccount: string;
  commissionPercent: number;
}
