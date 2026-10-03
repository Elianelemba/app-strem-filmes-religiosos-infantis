import React from 'react';
import { AppProvider, useApp, ScreenName } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TrailerModal } from './components/TrailerModal';
import { PresentationToolbar } from './components/PresentationToolbar';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { MovieDetailsScreen } from './screens/MovieDetailsScreen';
import { CartScreen } from './screens/CartScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrderConfirmedScreen } from './screens/OrderConfirmedScreen';
import { LibraryScreen } from './screens/LibraryScreen';
import { PlayerScreen } from './screens/PlayerScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ParentalControlScreen } from './screens/ParentalControlScreen';
import { OrdersHistoryScreen } from './screens/OrdersHistoryScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SearchScreen } from './screens/SearchScreen';
import { PromotionsScreen } from './screens/PromotionsScreen';
import { AboutScreen } from './screens/AboutScreen';
import { SupportScreen } from './screens/SupportScreen';

const MainLayout: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'home':
        return <HomeScreen />;
      case 'catalog':
        return <CatalogScreen />;
      case 'movie-details':
        return <MovieDetailsScreen />;
      case 'cart':
        return <CartScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'order-confirmed':
        return <OrderConfirmedScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'player':
        return <PlayerScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'parental-control':
        return <ParentalControlScreen />;
      case 'orders-history':
        return <OrdersHistoryScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'search':
        return <SearchScreen />;
      case 'promotions':
        return <PromotionsScreen />;
      case 'about':
        return <AboutScreen />;
      case 'support':
        return <SupportScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const isMinimalLayout = currentScreen === 'splash' || currentScreen === 'onboarding';

  return (
    <div className="min-h-screen flex flex-col bg-[#070c18] text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Header */}
      {!isMinimalLayout && <Header />}

      {/* Main Screen Content */}
      <main className="flex-1 w-full pb-14">
        {renderScreen()}
      </main>

      {/* Footer */}
      {!isMinimalLayout && <Footer />}

      {/* Global Interactive Modal */}
      <TrailerModal />

      {/* Presentation Mode Dock Toolbar */}
      <PresentationToolbar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
