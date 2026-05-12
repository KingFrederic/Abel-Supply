import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'IDOWU MATÉRIAUX — Matériaux de construction à Abidjan';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { locale: string } }) {
  const isEn = params.locale === 'en';
  const tagline = isEn
    ? 'Your quote. My price. Save up to 30%.'
    : 'Votre devis. Mon prix. Jusqu\'à 30% d\'économies.';
  const subtitle = isEn
    ? 'Direct construction-materials supplier · Abidjan'
    : 'Fournisseur direct · Abidjan, Côte d\'Ivoire';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0F12',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui',
        }}
      >
        {/* Amber accent bar */}
        <div
          style={{
            width: 80,
            height: 4,
            background: '#F59E0B',
            marginBottom: 40,
            borderRadius: 2,
          }}
        />
        {/* Brand name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-1px',
            }}
          >
            IDOWU
          </span>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#F59E0B',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontSize: 52,
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '4px',
            }}
          >
            MATÉRIAUX
          </span>
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: '#F59E0B',
            marginBottom: 20,
            maxWidth: 900,
          }}
        >
          {tagline}
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#A1A1AA',
            fontWeight: 400,
          }}
        >
          {subtitle}
        </div>
        {/* Decorative element */}
        <div
          style={{
            position: 'absolute',
            right: 80,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: '2px solid rgba(245,158,11,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: '50%',
              border: '2px solid rgba(245,158,11,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 80,
              }}
            >
              🏗️
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
