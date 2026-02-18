# Design System - Instituto Tarcisio Bisinotto (ITB)

**Versao:** 1.0
**Data:** 2026-02-18
**Site:** bisinotto.com.br

---

## 1. Paleta de Cores

### Cores Principais

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--color-primary` | `#004aad` | Logo, titulos, CTAs primarios, rodape |
| `--color-secondary` | `#7ed957` | Destaques, icones, elementos de apoio |
| `--color-tertiary` | `#ff914d` | CTAs de conversao, botoes urgentes |

### Cores de Apoio

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--color-white` | `#ffffff` | Backgrounds |
| `--color-bg-light` | `#f1f5f9` | Secoes alternadas |
| `--color-bg-blue` | `#eff6ff` | Backgrounds azuis claros |
| `--color-text` | `#1a1a1a` | Texto principal |
| `--color-text-light` | `#6b7280` | Texto secundario |
| `--color-border` | `#e2e8f0` | Bordas e separadores |

---

## 2. Tipografia

**Fonte:** Poppins (Google Fonts)
**Importacao:** Via CDN `fonts.googleapis.com` (NUNCA self-hosted)

| Elemento | Peso | Tamanho Desktop | Tamanho Mobile |
|----------|------|-----------------|----------------|
| H1 (Hero) | 800 (ExtraBold) | 3rem (48px) | 2rem (32px) |
| H2 (Section) | 700 (Bold) | 2.25rem (36px) | 1.75rem (28px) |
| H3 (Card) | 600 (SemiBold) | 1.5rem (24px) | 1.25rem (20px) |
| H4 (Footer) | 600 (SemiBold) | 1.125rem (18px) | 1rem (16px) |
| Body | 400 (Regular) | 1rem (16px) | 1rem (16px) |
| Small | 400 (Regular) | 0.875rem (14px) | 0.875rem (14px) |

**Line-height:** 1.6 (corpo de texto)

---

## 3. Espacamento (Tokens)

| Token CSS | Valor | Uso |
|-----------|-------|-----|
| `--spacing-xs` | 0.5rem (8px) | Gaps minimos |
| `--spacing-sm` | 1rem (16px) | Padding interno |
| `--spacing-md` | 1.5rem (24px) | Gap entre elementos |
| `--spacing-lg` | 2rem (32px) | Gap entre cards |
| `--spacing-xl` | 3rem (48px) | Padding de secao |
| `--spacing-2xl` | 5rem (80px) | Entre secoes |

---

## 4. Layout e Grid

| Propriedade | Valor |
|-------------|-------|
| Container max-width | 1200px |
| Grid colunas | CSS Grid / Flexbox (4 colunas desktop) |
| Breakpoint mobile | 768px |
| Breakpoint tablet | 1024px |
| Border-radius padrao | `--border-radius` = 0.5rem |
| Border-radius grande | `--border-radius-lg` = 0.75rem |

---

## 5. Sombras

| Token CSS | Valor | Uso |
|-----------|-------|-----|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.1)` | Elementos sutis |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards |
| `--shadow-lg` | `0 10px 25px rgba(0,0,0,0.1)` | Cards elevados |
| `--shadow-xl` | `0 20px 40px rgba(0,0,0,0.15)` | Hover states |

---

## 6. Componentes

### 6.1 Botoes

| Classe | Background | Texto | Uso |
|--------|-----------|-------|-----|
| `.btn--primary` | `--color-primary` | Branco | CTAs padrao |
| `.btn--secondary` | Branco | `--color-primary` | CTAs secundarios |
| `.btn--tertiary` | `--color-tertiary` | Branco | CTAs de conversao (Agendar Visita) |
| `.btn--outline` | Transparente | `--color-primary` | Opcoes secundarias |
| `.btn--large` | - | - | Modificador de tamanho |

**Padding:** 0.75rem 1.5rem (padrao) / 1rem 2rem (large)
**Border-radius:** var(--border-radius)
**Transicao:** 0.3s ease

### 6.2 Cards

```css
.card {
  background: var(--color-white);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
}
.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### 6.3 Card Icons (SVG)

Todos os icones sao SVG inline via sprite sheet (`assets/icons/icons.svg`).

```html
<!-- Dentro de card__icon -->
<div class="card__icon">
  <svg aria-hidden="true"><use href="#icon-NAME"></use></svg>
</div>

<!-- Inline no texto -->
<svg class="icon-inline" aria-hidden="true"><use href="#icon-NAME"></use></svg>
```

**Tamanho card__icon:** 48x48px, cor `var(--color-primary)`
**Tamanho icon-inline:** 1.2em, cor `currentColor`

### 6.4 Video Facade (YouTube)

Lazy loading de videos do YouTube: mostra thumbnail + botao play, carrega iframe no click.

```html
<div class="video-facade" data-video-id="VIDEO_ID" role="button" tabindex="0">
  <img src="https://i.ytimg.com/vi/VIDEO_ID/hqdefault.jpg" alt="..." loading="lazy">
  <div class="video-facade__play" aria-hidden="true">
    <svg><!-- YouTube play button SVG --></svg>
  </div>
</div>
```

Usa `youtube-nocookie.com` para privacidade.

### 6.5 Video Grid

```css
.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}
/* Tablet: 2 colunas, Mobile: 1 coluna */
```

---

## 7. Icones SVG Disponiveis

Sprite localizado em `assets/icons/icons.svg`. Usar com `<use href="#icon-NAME">`.

| ID | Descricao | Uso |
|----|-----------|-----|
| `icon-trophy` | Trofeu | Pioneirismo, premios |
| `icon-globe` | Globo | Bilingue, internacional |
| `icon-people` | Pessoas | Turmas, comunidade |
| `icon-location` | Pin | Localizacao |
| `icon-school` | Escola | Estrutura |
| `icon-phone` | Telefone | Contato |
| `icon-graduation` | Formatura | Educacao |
| `icon-palette` | Paleta | Arte |
| `icon-music` | Nota musical | Musica |
| `icon-book` | Livro | Leitura |
| `icon-brain` | Cerebro | Aprendizado |
| `icon-puzzle` | Quebra-cabeca | Ludico |
| `icon-heart` | Coracao | Acolhimento |
| `icon-baby` | Bebe | Bercario |
| `icon-bottle` | Mamadeira | Bercario |
| `icon-nutrition` | Maca | Nutricao |
| `icon-leaf` | Folha | Sustentabilidade |
| `icon-water` | Gota | Agua, sustentabilidade |
| `icon-device` | Smartphone | Tecnologia |
| `icon-calendar` | Calendario | Agenda |
| `icon-clock` | Relogio | Horarios |
| `icon-chat` | Balao | Comunicacao |
| `icon-family` | Familia | Pais, familia |
| `icon-teacher` | Professor | Equipe |
| `icon-check` | Check | Confirmacao |
| `icon-target` | Alvo | Objetivo |
| `icon-kite` | Pipa | Marca ITB |
| `icon-hand` | Mao | Interacao |
| `icon-theater` | Teatro | Drama, arte |
| `icon-celebration` | Festa | Eventos |
| `icon-sleep` | Lua | Sono, descanso |
| `icon-thermometer` | Termometro | Saude |
| `icon-numbers` | Numeros | Matematica |
| `icon-pencil` | Lapis | Escrita |
| `icon-movement` | Movimento | Educacao fisica |
| `icon-handshake` | Aperto de mao | Parceria |
| `icon-briefcase` | Maleta | Trabalho |
| `icon-camera` | Camera | Fotos |
| `icon-email` | Envelope | E-mail |
| `icon-star` | Estrela | Avaliacao |
| `icon-sun` | Sol | Natureza |
| `icon-fire` | Fogo | Destaque |
| `icon-door` | Porta | Entrada, adaptacao |
| `icon-welcome` | Boas-vindas | Acolhimento |
| `icon-recycle` | Reciclagem | Sustentabilidade |
| `icon-lightbulb` | Lampada | Ideias |
| `icon-warning` | Alerta | Avisos |
| `icon-microscope` | Microscopio | Ciencia |
| `icon-safety` | Escudo | Seguranca |
| `icon-energy` | Raio | Energia |

---

## 8. Breakpoints Responsivos

```css
/* Mobile First (base) */
/* Tablet */
@media (min-width: 768px) { }
/* Desktop */
@media (min-width: 1024px) { }
```

---

## 9. Animacoes

| Classe | Descricao | Duracao |
|--------|-----------|---------|
| `fade-in-up` | Fade in + translate Y | 0.6s |
| Hover cards | translateY(-2px) + shadow | 0.3s |
| Hover botoes | Opacity + shadow | 0.3s |

**Transicao padrao:** `var(--transition-base)` = `all 0.3s ease`
**Trigger:** IntersectionObserver com threshold 0.1

---

## 10. Convencoes

### Nomenclatura CSS (BEM)
- Bloco: `.card`, `.hero`, `.footer`
- Elemento: `.card__icon`, `.card__title`, `.footer__link`
- Modificador: `.btn--primary`, `.nav__link--active`, `.section--primary`

### Imagens
- Formato: WebP
- Largura maxima: 800px (hero: 1200px)
- Qualidade: 82
- Nomenclatura: `itb-[contexto]-[descricao].webp`
- Alt text: Descritivo para SEO/acessibilidade
- Lazy loading em todas (exceto hero)

### Tracking
- GTM: `GTM-TRW35B7` em TODAS as paginas
- Data attributes: `data-gtm-event`, `data-gtm-label`
- Cache bust: `?v=20260218-1` em CSS e JS

---

*Documento gerado em 2026-02-18 - Vantt Marketing*
