export interface SendResponse {
  status: boolean;
  message: string;
  email?: string;
  data?: {
    success?: boolean;
    message?: string;
  };
  error?: string;
}

export interface UserProviderInfo {
  providerId: string;
  federatedId: string;
  email: string;
  rawId: string;
}

export interface UserDetails {
  localId?: string;
  email?: string;
  emailVerified?: boolean;
  providerUserInfo?: UserProviderInfo[];
  validSince?: string;
  lastLoginAt?: string;
  createdAt?: string;
  emailLinkSignin?: boolean;
  lastRefreshAt?: string;
}

export interface PremiumResult {
  status?: string;
  accountLinkStatus?: string;
  source?: string;
  autoRenewing?: boolean;
  cancelReason?: string | null;
  expiryTimeMillis?: number;
  startTimeMillis?: number;
  valid?: boolean;
  testPurchase?: boolean;
}

export interface VerifResponse {
  status: boolean;
  message: string;
  email?: string;
  codeorder?: string;
  user?: UserDetails;
  premium?: {
    result?: PremiumResult;
  };
  error?: string;
}

export interface ActivationHistoryItem {
  id: string;
  timestamp: number;
  email: string;
  type: 'send' | 'verif';
  status: boolean;
  message: string;
  codeorder?: string;
  expiryDate?: string;
}
