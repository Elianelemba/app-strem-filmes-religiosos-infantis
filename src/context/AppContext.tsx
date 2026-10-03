import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, UserProfile, OrderItem, NotificationItem, AgeRating } from '../types';
import { 
  INITIAL_MOVIES, 
  INITIAL_USER, 
  INITIAL_ORDERS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export type ScreenName = 
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'home'
  | 'catalog'
  | 'movie-details'
  | 'cart'
  | 'checkout'
  | 'order-confirmed'
  | 'library'
  | 'player'
  | 'favorites'
  | 'profile'
  | 'parental-control'
  | 'orders-history'
  | 'notifications'
  | 'search'
  | 'promotions'
  | 'about'
  | 'support';

interface CartItem {
  movie: Movie;
  addedAt: string;
}

interface AppContextType {
  currentScreen: ScreenName;
  navigateTo: (screen: ScreenName, movie?: Movie) => void;
  selectedMovie: Movie;
  setSelectedMovie: (movie: Movie) => void;
  movies: Movie[];
  cart: CartItem[];
  addToCart: (movie: Movie) => void;
  removeFromCart: (movieId: string) => void;
  clearCart: () => void;
  couponCode: string;
  couponDiscount: number;
  applyCoupon: (code: string) => boolean;
  couponError: string;
  cartTotal: number;
  cartSubtotal: number;
  favorites: string[]; // movie IDs
  toggleFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  purchasedMovieIds: string[];
  isMoviePurchased: (movieId: string) => boolean;
  user: UserProfile;
  updateUser: (partial: Partial<UserProfile>) => void;
  isLoggedIn: boolean;
  loginUser: () => void;
  logoutUser: () => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
  orders: OrderItem[];
  latestOrder: OrderItem | null;
  completeCheckout: (orderData: Partial<OrderItem>) => OrderItem;
  trailerMovie: Movie | null;
  openTrailer: (movie: Movie) => void;
  closeTrailer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedAgeRating: string;
  setSelectedAgeRating: (age: string) => void;
  parentalPinVerified: boolean;
  setParentalPinVerified: (verified: boolean) => void;
  // Demo presentation helpers
  showPresentationToolbar: boolean;
  setShowPresentationToolbar: (show: boolean) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
  const [movies] = useState<Movie[]>(INITIAL_MOVIES);
  const [selectedMovie, setSelectedMovie] = useState<Movie>(INITIAL_MOVIES[0]);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  
  const [cart, setCart] = useState<CartItem[]>([
    { movie: INITIAL_MOVIES[3], addedAt: new Date().toISOString() } // Davi e o Gigante in cart initially
  ]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string>('');

  const [favorites, setFavorites] = useState<string[]>(['movie-1', 'movie-2', 'movie-6']);
  const [purchasedMovieIds, setPurchasedMovieIds] = useState<string[]>(['movie-1', 'movie-2']);
  
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [latestOrder, setLatestOrder] = useState<OrderItem | null>(INITIAL_ORDERS[0]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedAgeRating, setSelectedAgeRating] = useState<string>('Todos');
  
  const [parentalPinVerified, setParentalPinVerified] = useState<boolean>(false);
  const [showPresentationToolbar, setShowPresentationToolbar] = useState<boolean>(true);

  // Navigate function with smooth scroll to top
  const navigateTo = (screen: ScreenName, movie?: Movie) => {
    if (movie) {
      setSelectedMovie(movie);
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (movie: Movie) => {
    if (!cart.some(item => item.movie.id === movie.id)) {
      setCart(prev => [...prev, { movie, addedAt: new Date().toISOString() }]);
    }
  };

  const removeFromCart = (movieId: string) => {
    setCart(prev => prev.filter(item => item.movie.id !== movieId));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
    setCouponDiscount(0);
  };

  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'LUZ10' || trimmed === 'ANGOLA10' || trimmed === 'FAMILIA') {
      setCouponCode(trimmed);
      setCouponDiscount(0.1); // 10% discount
      setCouponError('');
      return true;
    } else {
      setCouponError('Código promocional inválido ou expirado.');
      return false;
    }
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.movie.price, 0);
  const cartTotal = Math.round(cartSubtotal * (1 - couponDiscount));

  const toggleFavorite = (movieId: string) => {
    setFavorites(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  const isFavorite = (movieId: string) => favorites.includes(movieId);
  const isMoviePurchased = (movieId: string) => purchasedMovieIds.includes(movieId);

  const updateUser = (partial: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...partial }));
  };

  const loginUser = () => {
    setIsLoggedIn(true);
    navigateTo('home');
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    navigateTo('login');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const openTrailer = (movie: Movie) => {
    setTrailerMovie(movie);
  };

  const closeTrailer = () => {
    setTrailerMovie(null);
  };

  const completeCheckout = (orderData: Partial<OrderItem>): OrderItem => {
    const newOrderNumber = `LK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsToBuy = cart.map(i => i.movie);
    
    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      date: new Intl.DateTimeFormat('pt-AO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date()),
      movies: itemsToBuy.length > 0 ? itemsToBuy : [selectedMovie],
      totalAmount: cartTotal > 0 ? cartTotal : selectedMovie.price,
      discountAmount: cartSubtotal - cartTotal,
      paymentMethod: (orderData.paymentMethod as any) || 'express',
      status: 'Pago',
      buyerName: orderData.buyerName || user.name,
      buyerEmail: orderData.buyerEmail || user.email,
      buyerPhone: orderData.buyerPhone || user.phone,
      transactionRef: orderData.transactionRef || `MCX-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    // Add purchased IDs to library
    const newPurchasedIds = itemsToBuy.map(m => m.id);
    setPurchasedMovieIds(prev => Array.from(new Set([...prev, ...newPurchasedIds])));
    
    // Add to orders
    setOrders(prev => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    
    // Clear cart
    clearCart();

    // Add notification
    const orderNotification: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Compra confirmada com sucesso!',
      description: `O seu pedido ${newOrder.orderNumber} no valor de ${newOrder.totalAmount.toLocaleString('pt-AO')} Kz foi aprovado com sucesso.`,
      timeAgo: 'Agora mesmo',
      read: false,
      type: 'order',
      targetScreen: 'library'
    };
    setNotifications(prev => [orderNotification, ...prev]);

    return newOrder;
  };

  const resetDemoData = () => {
    setCart([{ movie: INITIAL_MOVIES[3], addedAt: new Date().toISOString() }]);
    setPurchasedMovieIds(['movie-1', 'movie-2']);
    setFavorites(['movie-1', 'movie-2', 'movie-6']);
    setUser(INITIAL_USER);
    setIsLoggedIn(true);
    setCouponCode('');
    setCouponDiscount(0);
    setParentalPinVerified(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        selectedMovie,
        setSelectedMovie,
        movies,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        couponCode,
        couponDiscount,
        applyCoupon,
        couponError,
        cartTotal,
        cartSubtotal,
        favorites,
        toggleFavorite,
        isFavorite,
        purchasedMovieIds,
        isMoviePurchased,
        user,
        updateUser,
        isLoggedIn,
        loginUser,
        logoutUser,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        orders,
        latestOrder,
        completeCheckout,
        trailerMovie,
        openTrailer,
        closeTrailer,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedAgeRating,
        setSelectedAgeRating,
        parentalPinVerified,
        setParentalPinVerified,
        showPresentationToolbar,
        setShowPresentationToolbar,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
