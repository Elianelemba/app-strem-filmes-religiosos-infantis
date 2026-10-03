export type AgeRating = 'Livre' | '+3' | '+6' | '+10' | '+12';

export type MovieCategory = 
  | 'Histórias Bíblicas'
  | 'Aventuras'
  | 'Fé e Valores'
  | 'Animação'
  | 'Família'
  | 'Música'
  | 'Educação';

export interface Movie {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  synopsis: string;
  shortDescription: string;
  duration: string; // e.g. "82 min"
  durationMinutes: number;
  year: number;
  ageRating: AgeRating;
  category: MovieCategory;
  price: number; // in Kwanzas (Kz)
  originalPrice?: number;
  isPromo?: boolean;
  discountPercent?: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  posterUrl: string;
  backdropUrl: string;
  moralValues: string[];
  audioTracks: string[];
  subtitles: string[];
  featured?: boolean;
  popular?: boolean;
  isNew?: boolean;
  forToddlers?: boolean;
  completionPercent?: number;
  director?: string;
  biblicalReference?: string;
  youtubeVideoId: string;
  youtubeReferenceTitle?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  avatarUrl: string;
  parentalControlEnabled: boolean;
  parentalPin: string;
  maxAgeRating: AgeRating;
  dailyScreenTimeLimitMinutes: number;
  screenTimeUsedTodayMinutes: number;
  bedTimeActive: boolean;
  bedTimeStart: string;
  bedTimeEnd: string;
  savedPaymentMethods: {
    id: string;
    type: 'express' | 'card';
    label: string;
    lastDigits: string;
  }[];
}

export interface ViewingHistoryItem {
  id: string;
  movieId: string;
  movieTitle: string;
  watchedAt: string;
  durationMinutes: number;
  progressPercent: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  movies: Movie[];
  totalAmount: number;
  discountAmount: number;
  paymentMethod: 'express' | 'card' | 'transfer';
  status: 'Pago' | 'Pendente' | 'Cancelado';
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  transactionRef: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  read: boolean;
  type: 'promo' | 'new_release' | 'order' | 'parental' | 'system';
  targetScreen?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'conta' | 'pagamentos' | 'compras' | 'reproducao' | 'parental';
}
