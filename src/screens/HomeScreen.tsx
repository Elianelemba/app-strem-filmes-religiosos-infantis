import React from 'react';
import { 
  Play, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  HeartHandshake, 
  Lock, 
  Film, 
  Info,
  Clock,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../types';

export const HomeScreen: React.FC = () => {
  const { 
    movies, 
    navigateTo, 
    openTrailer, 
    addToCart, 
    cart, 
    isMoviePurchased,
    setSelectedCategory 
  } = useApp();

  // Featured Hero movie (Daniel e a Coragem)
  const heroMovie = movies[0];
  const isHeroPurchased = isMoviePurchased(heroMovie.id);
  const isHeroInCart = cart.some(i => i.movie.id === heroMovie.id);

  // Filtered collections
  const popularMovies = movies.filter(m => m.popular);
  const newReleases = movies.filter(m => m.isNew || m.year === 2026);
  const biblicalMovies = movies.filter(m => m.category === 'Histórias Bíblicas');
  const faithStories = movies.filter(m => m.category === 'Fé e Valores' || m.category === 'Aventuras');
  const toddlersMovies = movies.filter(m => m.forToddlers || m.ageRating === 'Livre');
  const promoMovies = movies.filter(m => m.isPromo);

  const categoriesList = [
    'Histórias Bíblicas',
    'Aventuras',
    'Fé e Valores',
    'Animação',
    'Família',
    'Música',
    'Educação'
  ];

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    navigateTo('catalog');
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner Section */}
      <section className="relative -mt-6 sm:-mt-8 w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
        <div className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-end">
          
          {/* Backdrop Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroMovie.backdropUrl} 
              alt={heroMovie.title}
              className="w-full h-full object-cover object-top sm:object-center filter brightness-90"
              referrerPolicy="no-referrer"
            />
            {/* Cinematic Gradient Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent max-w-3xl" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
            <div className="max-w-2xl space-y-4">
              
              {/* Highlight badge */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
                  <span>DESTAQUE DA SEMANA</span>
                </div>
                <span className="text-xs text-slate-300 font-medium">
                  {heroMovie.category}
                </span>
                <span aria-hidden="true" className="text-slate-500">·</span>
                <span className="text-xs text-slate-300 tabular-nums">
                  {heroMovie.duration}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
                {heroMovie.title}
              </h1>

              {/* Subtitle & Synopsis */}
              <p className="text-base sm:text-lg text-amber-200/90 font-medium line-clamp-1">
                {heroMovie.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed max-w-xl">
                {heroMovie.synopsis}
              </p>

              {/* Moral Values preview tag */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-slate-400">Valores ensinados:</span>
                {heroMovie.moralValues.slice(0, 3).map((val, idx) => (
                  <span key={idx} className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                    {val}
                  </span>
                ))}
              </div>

              {/* Price & Rating */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-400 tabular-nums">
                    {heroMovie.price.toLocaleString('pt-AO')} Kz
                  </span>
                  {heroMovie.originalPrice && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {heroMovie.originalPrice.toLocaleString('pt-AO')} Kz
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold tabular-nums">{heroMovie.rating.toFixed(1)}</span>
                  <span className="text-slate-500">({heroMovie.reviewCount} avaliações)</span>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => openTrailer(heroMovie)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 backdrop-blur-md transition-all hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Assistir Trailer</span>
                </button>

                {isHeroPurchased ? (
                  <button
                    onClick={() => navigateTo('player', heroMovie)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-600/25 transition-all hover:scale-105"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Assistir Agora (Adquirido)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (isHeroInCart) {
                        navigateTo('cart');
                      } else {
                        addToCart(heroMovie);
                        navigateTo('cart');
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isHeroInCart ? 'Ir para o Carrinho' : 'Comprar Agora'}</span>
                  </button>
                )}

                <button
                  onClick={() => navigateTo('movie-details', heroMovie)}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  <Info className="w-4 h-4" />
                  <span>Mais Detalhes</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills / Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Categorias em Destaque
            </h2>
          </div>
          <button 
            onClick={() => navigateTo('catalog')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Ver Todas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {categoriesList.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-amber-500/30 transition-all hover:scale-105"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Section 1: Mais Populares */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Mais Populares
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Os filmes infantis cristãos mais assistidos e amados pelas famílias
            </p>
          </div>
          <button
            onClick={() => navigateTo('catalog')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Ver catálogo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularMovies.slice(0, 4).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Parental Assurance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-600/20 via-slate-900 to-sky-950/40 border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl overflow-hidden">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantia de Confiança LuzKids</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-display text-white">
              Paz de espírito total para os pais
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Defina tempo máximo diário de exibição, configure PIN parental e escolha a classificação etária dos seus filhos. Sem surpresas ou vídeos inadequados.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('parental-control')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Configurar Controlo Parental</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Novos Lançamentos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Novos Lançamentos
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Estreias recentes com produções de animação moderna em alta definição
            </p>
          </div>
          <button
            onClick={() => navigateTo('catalog')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Ver todos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newReleases.slice(0, 4).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Section 3: Filmes Bíblicos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Histórias Bíblicas
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Da arca de Noé à bravura de Davi e Ester: as grandes narrativas das Escrituras
            </p>
          </div>
          <button
            onClick={() => handleCategoryClick('Histórias Bíblicas')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Ver bíblicos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {biblicalMovies.slice(0, 4).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Section 4: Para os Mais Pequenos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Para os Mais Pequenos
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Conteúdos suaves, musicais e fáceis de compreender para bebês e primeira infância
            </p>
          </div>
          <button
            onClick={() => handleCategoryClick('Animação')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Ver para pequeninos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {toddlersMovies.slice(0, 4).map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Section 5: Ofertas Especiais */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Filmes em Promoção
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Descontos de até 28% para enriquecer a videoteca da sua família em Kwanzas
            </p>
          </div>
          <button
            onClick={() => navigateTo('promotions')}
            className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>Ver todas as ofertas</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promoMovies.slice(0, 3).map(movie => (
            <MovieCard key={movie.id} movie={movie} variant="horizontal" />
          ))}
        </div>
      </section>

    </div>
  );
};
