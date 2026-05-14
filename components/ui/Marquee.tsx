const ITEMS = [
  'IDOWU MATÉRIAUX',
  'FOURNISSEUR DIRECT',
  'ABIDJAN · CÔTE D\'IVOIRE',
  '30% D\'ÉCONOMIES',
  'LIVRAISON SUR CHANTIER',
  '100+ CHANTIERS LIVRÉS',
  'RÉPONSE EN 24 HEURES',
  'BÂTISSE · PLOMBERIE · ÉLECTRICITÉ',
];

export default function Marquee() {
  return (
    <div
      className="relative overflow-hidden py-4 border-y"
      style={{ background: '#0C0D10', borderColor: 'rgba(255,255,255,0.05)' }}
      aria-hidden
    >
      <div className="flex" style={{ width: 'max-content' }}>
        {[0, 1].map(n => (
          <div key={n} className="flex items-center flex-shrink-0 marquee-track">
            {ITEMS.map((item, i) => (
              <span key={i} className="flex items-center gap-8 px-8">
                <span
                  className="text-[10px] font-display font-semibold tracking-[0.28em] whitespace-nowrap uppercase"
                  style={{ color: 'rgba(201,169,110,0.5)' }}
                >
                  {item}
                </span>
                <span
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(201,169,110,0.2)' }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
