import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const types = [
    {
      name: 'Ação',
      description:
        'Representa participações de propriedade em uma empresa e constitui a base da criação de riqueza no mercado de capitais.',
    },
    {
      name: 'FII',
      description:
        'Investimento realizado predominantemente em imóveis ou em direitos reais sobre imóveis.',
    },
    {
      name: 'ETF',
      description:
        'Fundo de investimento negociado na bolsa de valores como se fosse uma ação, que replica um índice de referência.',
    },
    {
      name: 'CDI',
      description:
        'Taxa de referência usada em empréstimos entre bancos que também é usada como benchmark para investimentos de renda fixa no Brasil.',
    },
    {
      name: 'CDB',
      description:
        'Título de renda fixa que os bancos emitem para se capitalizar, sendo o investimento mais popular do Brasil.',
    },
    {
      name: 'LCI',
      description:
        'Investimento de renda fixa que financia o setor imobiliário, isento de imposto de renda para pessoas físicas.',
    },
    {
      name: 'LCA',
      description:
        'Investimento de renda fixa que financia o setor do agronegócio, também isento de imposto de renda para pessoas físicas.',
    },
  ];

  for (const type of types) {
    await prisma.type.create({
      data: type,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();

    console.log('Types seeded successfully.');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
