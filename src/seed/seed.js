const { sequelize, Profile, Contract, Job } = require('../models');

(async () => {
  try {
    await sequelize.sync({ force: true });

    const client1 = await Profile.create({
      firstname: 'Ribamar',
      lastname: 'Omelhor',
      profession: 'Developer',
      balance: 1000,
      type: 'client',
    });

    const client2 = await Profile.create({
      firstname: 'Neymar',
      lastname: 'Santos',
      profession: 'Designer',
      balance: 500,
      type: 'client',
    });

    const contractor = await Profile.create({
      firstname: 'Edson',
      lastname: 'Arandes Nascimento',
      profession: 'Freelancer',
      balance: 300,
      type: 'contractor',
    });

    const contract1 = await Contract.create({
      terms: 'Contrato 1',
      clientId: client1.id,
      contractorId: contractor.id,
      operationDate: new Date(),
      status: 'active',
    });

    const contract2 = await Contract.create({
      terms: 'Contrato 2',
      clientId: client2.id,
      contractorId: contractor.id,
      operationDate: new Date(),
      status: 'terminated',
    });

    await Job.create({
      contractId: contract1.id,
      description: 'Job 1',
      operationDate: new Date(),
      price: 200,
      paid: false,
    });

    await Job.create({
      contractId: contract2.id,
      description: 'Job 2',
      operationDate: new Date(),
      price: 300,
      paid: true,
    });

    console.log('Os dados foram criados com sucesso!');
  } catch (error) {
    console.error('Erro na criação de dados:', error);
  } finally {
    process.exit();
  }
})();
