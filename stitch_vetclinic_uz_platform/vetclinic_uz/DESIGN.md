---
name: VetClinic UZ
colors:
  surface: '#f5faf8'
  surface-dim: '#d6dbd9'
  surface-bright: '#f5faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5f2'
  surface-container: '#eaefed'
  surface-container-high: '#e4e9e7'
  surface-container-highest: '#dee4e1'
  on-surface: '#171d1c'
  on-surface-variant: '#3d4947'
  inverse-surface: '#2c3130'
  inverse-on-surface: '#edf2f0'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#a93530'
  on-secondary: '#ffffff'
  secondary-container: '#fd7369'
  on-secondary-container: '#6f080c'
  tertiary: '#924628'
  on-tertiary: '#ffffff'
  tertiary-container: '#b05e3d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#881d1c'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#773215'
  background: '#f5faf8'
  on-background: '#171d1c'
  surface-variant: '#dee4e1'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  section-gap: 80px
---

## Brand & Style

This design system establishes a bridge between clinical precision and local community warmth. The brand personality is rooted in the "Modern Healthcare meets Local Marketplace" archetype, prioritizing trust and tranquility for pet owners in Uzbekistan. 

The visual style follows a **Corporate / Modern** aesthetic refined by soft, approachable edges. It avoids the sterile coldness of traditional medical apps by utilizing warm background undertones and pet-friendly rounded shapes. The UI evokes a sense of "Raxmat" (care) and "Ishonch" (trust), ensuring that users feel their companions are in safe hands from the moment they land on the platform. High-quality imagery of pets and local veterinary professionals should be framed with generous white space to maintain a calming atmosphere.

## Colors

The palette is anchored by **Deep Teal**, chosen for its psychological associations with medical expertise and serenity. This is balanced by **Warm Coral**, used sparingly for high-priority calls to action and emotional highlights like ratings or urgent status updates. 

Neutral surfaces are not pure white but an **Off-white with warm undertones** (#FAFAF9), which reduces eye strain and feels more inviting. In Dark Mode, we transition to a **Deep Slate** environment that maintains high legibility without losing the professional medical character. Secondary text uses a mid-range slate to maintain a clear visual hierarchy. Semantic colors are standard but tuned to sit harmoniously alongside the teal primary.

## Typography

Typography in this design system utilizes a dual-font strategy. **Plus Jakarta Sans** is used for all headings to provide a modern, friendly, and slightly geometric appearance. Headings feature tight tracking to look impactful and professional.

**Inter** is the workhorse for all body copy and UI labels, ensuring maximum legibility across all device types, especially for Uzbek Latin text which often contains specific character combinations. 

**Language Implementation (Uzbek Latin):**
- All UI strings must be in Uzbek Latin (e.g., "Klinikani toping" instead of "Find a clinic").
- Special care should be taken with the apostrophe/modifier characters common in Uzbek to ensure they don't break line heights.

## Layout & Spacing

This design system employs a **Fixed Grid** approach for desktop and a **Fluid Grid** for mobile devices. The layout is based on a 12-column grid system with generous gutters to promote a feeling of "space and air," which is essential for a calming medical experience.

A strict 4px/8px rhythm is applied to all internal padding and margins. Section-to-section gaps are intentionally large (80px+) to prevent information density from overwhelming the user. Content should be centered with a max-width of 1280px to ensure readability on wide monitors.

## Elevation & Depth

Depth is communicated through **Ambient Shadows** and **Tonal Layers**. Elements do not "float" aggressively; instead, they sit softly on the surface.

- **Level 0 (Background):** #FAFAF9 - The foundation.
- **Level 1 (Cards/Surfaces):** #FFFFFF with a 2px border (#E2E8F0) or a very soft, diffused shadow (0px 4px 20px rgba(13, 148, 136, 0.05)). Note the slight teal tint in the shadow to maintain brand cohesion.
- **Level 2 (Dropdowns/Modals):** High diffusion shadow (0px 12px 32px rgba(15, 23, 42, 0.1)).

This design system avoids heavy glassmorphism in favor of clarity, using subtle transparency only in hero section overlays where teal-to-coral gradients meet background photography.

## Shapes

The shape language is consistently **Rounded**, reinforcing the friendly and approachable brand personality. 

- **Cards & Containers:** 12px radius. This provides a modern, soft frame for clinic information and pet profiles.
- **Interactive Elements (Buttons/Inputs):** 8px radius. This keeps them distinct from containers while maintaining a cohesive look.
- **Badges & Tags:** 999px (Full pill). Used for status indicators like "Ochiq" (Open) or "Yopiq" (Closed) and category tags.

Iconography should be sourced from the **Lucide** library, utilizing a 1.5px stroke width to match the weight of the Inter typography.

## Components

### Buttons
- **Primary:** Deep Teal background with white text. 8px radius.
- **Secondary:** Transparent background with Deep Teal border and text.
- **CTA:** Warm Coral background for high-conversion actions like "Band qilish" (Book Now).

### Input Fields
Inputs use a white surface with a 1px Slate-200 border. On focus, the border transitions to Deep Teal with a 2px soft outer glow. Labels always sit above the field in Slate-900 (Bold).

### Cards
Veterinary clinic cards are the primary navigational element. They feature a 12px radius, a subtle border, and 24px internal padding. Images should have a top-only 12px radius to sit flush with the card container.

### Status Badges
Used for ratings (Warm Coral) and availability (Emerald/Rose). These must always be pill-shaped (999px) with a low-opacity background of the base color to ensure the text remains the focal point.

### Search Bar
The primary search bar is a large-format component with a 12px radius and a soft shadow, often placed over a subtle teal-to-coral gradient hero section. It should include a Lucide "Search" icon on the left.

### Featured Components
- **Pet Profile Snippet:** A small card used for pet owners to switch between their registered animals.
- **Rating Stars:** 16px Lucide stars in Warm Coral.