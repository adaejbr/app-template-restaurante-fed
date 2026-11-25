function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-display-xl text-primary-500">App Restaurante ADA EJ</h1>
          <p className="text-body-lg text-text-secondary">
            Design System - Identidade Visual Implementada
          </p>
        </header>

        <section className="space-y-6">
          <h2 className="text-heading-lg border-b border-background-tertiary pb-2">Paleta de Cores</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="text-heading-sm text-text-secondary">Primária</h3>
              <div className="grid grid-cols-5 gap-2">
                {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                  <div key={shade} className="space-y-1">
                    <div className={`h-12 rounded-md bg-primary-${shade} border border-background-tertiary`} />
                    <span className="text-caption text-text-muted">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-heading-sm text-text-secondary">Secundária</h3>
              <div className="grid grid-cols-5 gap-2">
                {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                  <div key={shade} className="space-y-1">
                    <div className={`h-12 rounded-md bg-secondary-${shade} border border-background-tertiary`} />
                    <span className="text-caption text-text-muted">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-heading-sm text-text-secondary">Background</h3>
              <div className="grid grid-cols-2 gap-2">
                {['DEFAULT', 'secondary', 'tertiary', 'hover'].map((shade) => (
                  <div key={shade} className="space-y-1">
                    <div className={`h-12 rounded-md bg-background-${shade === 'DEFAULT' ? '' : shade} border border-background-tertiary`} />
                    <span className="text-caption text-text-muted">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-heading-sm text-text-secondary">Status Mesa</h3>
              <div className="grid grid-cols-2 gap-2">
                {['livre', 'ocupada', 'conta', 'reservada'].map((status) => (
                  <div key={status} className="space-y-1">
                    <div className={`h-12 rounded-md bg-status-${status} border border-background-tertiary`} />
                    <span className="text-caption text-text-muted capitalize">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-heading-lg border-b border-background-tertiary pb-2">Tipografia</h2>
          <div className="space-y-4">
            <h1 className="text-display-xl">Display XL - clamp(2.5rem, 5vw + 1rem, 4rem)</h1>
            <h2 className="text-display-lg">Display LG - clamp(2rem, 4vw + 0.5rem, 3rem)</h2>
            <h3 className="text-display-md">Display MD - clamp(1.5rem, 3vw + 0.5rem, 2.25rem)</h3>
            <h4 className="text-heading-xl">Heading XL - clamp(1.25rem, 2.5vw + 0.5rem, 1.875rem)</h4>
            <h5 className="text-heading-lg">Heading LG - clamp(1.125rem, 2vw + 0.5rem, 1.5rem)</h5>
            <h6 className="text-heading-md">Heading MD - clamp(1rem, 1.5vw + 0.5rem, 1.25rem)</h6>
            <p className="text-body-lg">Body LG - 1.125rem / 1.6</p>
            <p className="text-body-md">Body MD - 1rem / 1.6</p>
            <p className="text-body-sm">Body SM - 0.875rem / 1.5</p>
            <small className="text-caption">Caption - 0.75rem / 1.5</small>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-heading-lg border-b border-background-tertiary pb-2">Componentes de Exemplo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background-secondary rounded-lg p-6 space-y-4 border border-background-tertiary">
              <h3 className="text-heading-md">Botões</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-primary-500 text-text-inverse rounded-md font-medium hover:bg-primary-600 transition-colors focus-ring">
                  Primário
                </button>
                <button className="px-4 py-2 bg-secondary-500 text-background rounded-md font-medium hover:bg-secondary-600 transition-colors focus-ring-secondary">
                  Secundário
                </button>
                <button className="px-4 py-2 bg-transparent border-2 border-primary-500 text-primary-500 rounded-md font-medium hover:bg-primary-500 hover:text-text-inverse transition-colors focus-ring">
                  Outline
                </button>
                <button className="px-4 py-2 bg-transparent text-text-secondary rounded-md font-medium hover:text-text-primary transition-colors focus-ring">
                  Ghost
                </button>
                <button className="px-4 py-2 bg-error text-text-inverse rounded-md font-medium hover:opacity-90 transition-opacity focus-ring" disabled>
                  Desabilitado
                </button>
              </div>
            </div>

            <div className="bg-background-secondary rounded-lg p-6 space-y-4 border border-background-tertiary">
              <h3 className="text-heading-md">Cards de Status</h3>
              <div className="grid grid-cols-2 gap-3">
                {['livre', 'ocupada', 'conta', 'reservada'].map((status) => (
                  <div key={status} className={`p-4 rounded-lg text-center bg-background-tertiary border border-status-${status}`}>
                    <div className={`w-3 h-3 rounded-full bg-status-${status} mx-auto mb-2`} />
                    <span className="text-body-sm font-medium capitalize text-text-primary">{status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background-secondary rounded-lg p-6 space-y-4 border border-background-tertiary">
              <h3 className="text-heading-md">Inputs</h3>
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Input padrão" 
                  className="w-full px-3 py-2 bg-background-tertiary border border-background-hover rounded-md text-text-primary placeholder-text-muted focus-ring outline-none transition-colors"
                />
                <input 
                  type="text" 
                  placeholder="Input com erro" 
                  className="w-full px-3 py-2 bg-background-tertiary border-2 border-error rounded-md text-text-primary placeholder-text-muted focus:ring-2 focus:ring-error/40 outline-none transition-colors"
                  aria-invalid="true"
                />
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-background-tertiary bg-background-tertiary text-primary-500 focus:ring-primary-500" />
                  <span className="text-body-md text-text-primary">Checkbox</span>
                </label>
              </div>
            </div>

            <div className="bg-background-secondary rounded-lg p-6 space-y-4 border border-background-tertiary">
              <h3 className="text-heading-md">Badges de Estoque</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-stock-available/20 text-stock-available rounded-full text-body-sm font-medium">
                  Disponível
                </span>
                <span className="px-3 py-1 bg-stock-low/20 text-stock-low rounded-full text-body-sm font-medium">
                  Estoque Baixo
                </span>
                <span className="px-3 py-1 bg-stock-empty/20 text-stock-empty rounded-full text-body-sm font-medium">
                  Esgotado
                </span>
                <span className="px-3 py-1 bg-stock-disabled/20 text-stock-disabled rounded-full text-body-sm font-medium">
                  Desabilitado
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-heading-lg border-b border-background-tertiary pb-2">Sombras (Elevation)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['xs', 'sm', 'DEFAULT', 'md', 'lg', 'xl'].map((shadow) => (
              <div key={shadow} className="bg-background-secondary rounded-lg p-6 border border-background-tertiary">
                <div className={`h-20 rounded-md shadow-${shadow} bg-background-tertiary transition-shadow hover:shadow-xl`} />
                <p className="mt-3 text-body-sm text-text-secondary text-center capitalize">shadow-{shadow}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 pt-8 border-t border-background-tertiary">
          <h2 className="text-heading-lg">Breakpoints</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['xs (360px)', 'sm (640px)', 'md (768px)', 'lg (1024px)', 'xl (1280px)', '2xl (1536px)', '3xl (1920px)'].map((bp) => (
              <div key={bp} className="bg-background-secondary rounded-lg p-4 border border-background-tertiary">
                <code className="text-body-sm text-primary-500 font-mono">{bp}</code>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
