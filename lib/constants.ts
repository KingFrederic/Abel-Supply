export const WHATSAPP_NUMBER = '2250707264235';
export const CALL_NUMBER = '+2250575555366';
export const EMAIL = 'abelidowu100@gmail.com';
export const ADDRESS = 'Yopougon Banco 2, Abidjan, Côte d\'Ivoire';

export const SOCIAL = {
  facebook: 'https://facebook.com/',
  instagram: 'https://instagram.com/idowu_abel_destinee',
  telegram: 'https://t.me/',
};

export const WA_MESSAGE_FR =
  'Bonjour Abel, j\'ai un devis de construction à vous envoyer pour évaluation.';
export const WA_MESSAGE_EN =
  'Hello Abel, I have a construction quote I\'d like you to review.';

export function getWhatsAppLink(locale: string): string {
  const msg = locale === 'en' ? WA_MESSAGE_EN : WA_MESSAGE_FR;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
