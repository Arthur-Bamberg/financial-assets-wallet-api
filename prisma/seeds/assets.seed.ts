import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const typeIds = {
    Ação: await getTypeByName('Ação'),
    FII: await getTypeByName('FII'),
    ETF: await getTypeByName('ETF'),
  };

  const assetsData = [
    {
      short_name: 'RBRP11',
      full_name: 'RBR Properties FII',
      price: 60.43,
      type_id: typeIds['FII'],
    },
    {
      short_name: 'BLAU3F',
      full_name: 'Blau Farmacêutica S.A.',
      price: 10.2,
      type_id: typeIds['Ação'],
    },
    {
      short_name: 'AGRO3F',
      full_name: 'BrasilAgro',
      price: 25.66,
      type_id: typeIds['Ação'],
    },
    {
      short_name: 'PVBI11',
      full_name: 'VBI Prime Properties',
      price: 99.05,
      type_id: typeIds['FII'],
    },
    {
      short_name: 'IVVB11',
      full_name: 'S&P 500 ETF',
      price: 286.49,
      type_id: typeIds['ETF'],
    },
    {
      short_name: 'BTLG11',
      full_name: 'BTG Pactual Logística',
      price: 101.57,
      type_id: typeIds['FII'],
    },
    {
      short_name: 'BBAS3F',
      full_name: 'Banco do Brasil S.A.',
      price: 27.53,
      type_id: typeIds['Ação'],
    },
    {
      short_name: 'VGIP11',
      full_name: 'Valora RE III Gestão Prudencial',
      price: 91.55,
      type_id: typeIds['FII'],
    },
    {
      short_name: 'B5P211',
      full_name: 'BlackRock Future Tech ETF',
      price: 87.83,
      type_id: typeIds['ETF'],
    },
    {
      short_name: 'HGRU11',
      full_name: 'CSHG Renda Urbana',
      price: 133.19,
      type_id: typeIds['FII'],
    },
    {
      short_name: 'EGIE3F',
      full_name: 'Engie Brasil Energia S.A.',
      price: 41.27,
      type_id: typeIds['Ação'],
    },
    {
      short_name: 'MALL11',
      full_name: 'Malls Brasil Plural Fundo de Investimento Imobiliário',
      price: 114.02,
      type_id: typeIds['FII'],
    },
  ];

  for (const asset of assetsData) {
    await prisma.asset.create({
      data: asset,
    });
  }
}

async function getTypeByName(typeName: string): Promise<string> {
  const type = await prisma.type.findFirst({
    where: {
      name: typeName,
    },
  });

  if (!type) throw new Error(`Type ${typeName} not found.`);

  return type.id;
}

main()
  .then(async () => {
    await prisma.$disconnect();

    console.log('Assets seeded successfully.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
