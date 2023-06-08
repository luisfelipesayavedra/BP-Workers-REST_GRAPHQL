export interface SellerSell {
  CODIGO: string;
  SELLER: string;
}
export const parseSellName = (sellerName: string) => {
  const normalize = sellerName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s/g, '');
  if (normalize === 'leidybalbin') {
    return 'leidyjohannabalbinjimenez';
  }
  if (normalize === 'marianamartinemurillo') {
    return 'marianamartinezmurillo';
  }
  if (normalize === 'karolinchiquinquiraortegaarcaya') {
    return 'karolynchiquinquiraortegaarcaya';
  }
  if (normalize === 'carlainessantoscarvajal') {
    return 'carlasantoscarvajal';
  }
  if (normalize === 'daniela') {
    return 'danielasinapellido';
  }
  if (normalize === 'diana') {
    return 'dianapaolaecheverriafuentes';
  }
  return normalize;
};
export function firstDatesByUniqueCode(data: SellerSell[]): SellerSell[] {
  const uniqueCodes: SellerSell[] = [];
  data.forEach((entry) => {
    const { SELLER, CODIGO } = entry;
    if (!uniqueCodes.find((date) => date.CODIGO === CODIGO)) {
      uniqueCodes.push({ SELLER: parseSellName(SELLER), CODIGO });
    }
  });
  return uniqueCodes;
}
