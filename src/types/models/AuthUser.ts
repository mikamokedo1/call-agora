import { AuthType } from '../../shared/constants/AppEnums';

export interface AuthUser {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  token?: string;
  authType?: AuthType;
  role: string[];
  reseller: string;
  phone: string;
  bankAccount: string;
  bankAccountNumber: string;
  bankName: string;
}
