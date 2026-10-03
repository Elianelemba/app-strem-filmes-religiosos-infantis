import React from 'react';
import { 
  Play, 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  Calendar, 
  Volume2, 
  Languages, 
  UserCheck, 
  ArrowLeft,
  Check,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';

export const MovieDetailsScreen: React.FC = () => {
  const { 
    selectedMovie, 
    movies, 
    navigateTo, 
    openTrailer, 
    addToCart, 
    cart, 
    isFavorite, 
    toggleFavorite, 
    isMoviePurchased 
  } = useApp();

  const isPurchased = isMoviePurchased(selectedMovie.id);
  const isInCart = cart.some(i => i.movie.id === selectedMovie.id);
  const fav = isFavorite(selectedMovie.id);

  // Similar movies in same category
  const similarMovies = movies
    .filter(m => m.id !== selectedMovie.id && (m.category === selectedMovie.category || m.ageRating === selectedMovie.ageRating))
    .slice(0, 4);

  return (
    <div className="pb-16 space-y-12">
      
      {/* Top Navigation Back Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigateTo('catalog')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Catálogo de Filmes</span>
        </button>
      </div>

      {/* Main Movie Hero Showcase */}
      <section className="relative w-full bg-slate-950 border-b border-slate-800/80">
        <div className="relative min-h-[480px] lg:min-h-[540px] flex items-center">
          
          {/* Backdrop Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={selectedMovie.backdropUrl || selectedMovie.posterUrl} 
              alt={selectedMovie.title}
              className="w-full h-full object-cover object-center filter brightness-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent max-w-4xl" />
          </div>

          {/* Hero Content Grid */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Poster Container */}
              <div className="lg:col-span-4 max-w-xs mx-auto lg:mx-0 w-full">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 group">
                  <img 
                    src={selectedMovie.posterUrl} 
                    alt={selectedMovie.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  {selectedMovie.isPromo && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded shadow-lg">
                      PROMOÇÃO -{selectedMovie.discountPercent}%
                    </div>
                  )}

                  {/* Quick Trailer Play in Poster */}
                  <button
                    onClick={() => openTrailer(selectedMovie)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                    title="Assistir Trailer"
                  >
                    <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Right Movie Details */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Category & Ratings Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                    {selectedMovie.category}
                  </span>
                  
                  <span className="text-xs font-bold text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2 py-0.5 rounded-md">
                    Faixa: {selectedMovie.ageRating}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-amber-400 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold tabular-nums">{selectedMovie.rating.toFixed(1)}</span>
                    <span className="text-slate-400">({selectedMovie.reviewCount} avaliações)</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white">
                  {selectedMovie.title}
                </h1>

                {selectedMovie.subtitle && (
                  <p className="text-base sm:text-lg text-amber-200/90 font-medium">
                    {selectedMovie.subtitle}
                  </p>
                )}

                {/* Quick Info bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 py-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums">{selectedMovie.duration}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums">{selectedMovie.year}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Áudio em Português</span>
                  </div>
                </div>

                {/* Synopsis */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sinopse</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {selectedMovie.synopsis}
                  </p>
                </div>

                {/* Biblical reference if applicable */}
                {selectedMovie.biblicalReference && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-xl max-w-xl">
                    <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Base bíblica: <strong className="text-white">{selectedMovie.biblicalReference}</strong></span>
                  </div>
                )}

                {/* Price Display */}
                <div className="pt-2">
                  {isPurchased ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 text-xs font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Filme Adquirido — Disponível na Minha Biblioteca</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-amber-400 tabular-nums">
                        {selectedMovie.price.toLocaleString('pt-AO')} Kz
                      </span>
                      {selectedMovie.originalPrice && (
                        <span className="text-base text-slate-400 line-through tabular-nums">
                          {selectedMovie.originalPrice.toLocaleString('pt-AO')} Kz
                        </span>
                      )}
                      <span className="text-xs text-slate-400">
                        (Acesso vitalício para toda a família)
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  {isPurchased ? (
                    <button
                      onClick={() => navigateTo('player', selectedMovie)}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/25 transition-all hover:scale-105"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Assistir Agora</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (isInCart) {
                          navigateTo('cart');
                        } else {
                          addToCart(selectedMovie);
                          navigateTo('cart');
                        }
                      }}
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isInCart ? 'No Carrinho (Finalizar)' : 'Comprar Filme'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => openTrailer(selectedMovie)}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 font-semibold text-sm border border-red-500/40 transition-colors"
                  >
                    <Play className="w-4 h-4 fill-red-400 text-red-400" />
                    <span>Ver no YouTube</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(selectedMovie.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      fav
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                    title={fav ? "Remover dos favoritos" : "Salvar nos favoritos"}
                  >
                    <Heart className={`w-4 h-4 ${fav ? 'fill-rose-400' : ''}`} />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded YouTube Video / Trailer Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Prévia / Trailer Oficial Disponível no YouTube
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedMovie.youtubeReferenceTitle || `${selectedMovie.title} - Desenho Bíblico`}
                </p>
              </div>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${selectedMovie.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
            >
              <span>Abrir no YouTube</span>
              <Share2 className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded YouTube video frame */}
          <div className="relative aspect-video w-full bg-slate-950">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${selectedMovie.youtubeVideoId}?rel=0&modestbranding=1`}
              title={selectedMovie.title}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Moral Values Taught & Technical Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Moral Values Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Valores Educativos e Espirituais Ensinados</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Este filme foi especialmente selecionado por educadores cristãos para reforçar virtudes saudáveis no coração dos seus filhos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {selectedMovie.moralValues.map((val, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Ficha Técnica e Acessibilidade</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Direção / Produção:</span>
                <span className="font-semibold text-white">{selectedMovie.director || 'Equipa LuzKids Studio'}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Idiomas de Áudio:</span>
                <span className="font-semibold text-white">{selectedMovie.audioTracks.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Legendas Disponíveis:</span>
                <span className="font-semibold text-white">{selectedMovie.subtitles.join(', ')}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Resolução:</span>
                <span className="font-semibold text-amber-400">Full HD 1080p (Adaptativa)</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">Classificação Indicativa:</span>
                <span className="font-semibold text-white">{selectedMovie.ageRating} (Adequado para a Família)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Similar Movies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-black font-display text-white">
          Filmes Semelhantes
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {similarMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

    </div>
  );
};
