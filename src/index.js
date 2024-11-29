const express = require('express');
const { sequelize, Profile, Contract, Job, Deposit } = require('./models');

const app = express();
app.use(express.json());

app.get('/profiles/:id/contracts', async (req, res) => {
  const { id } = req.params;

  try {
    const contracts = await Contract.findAll({ where: { clientId: id } });

    if (!contracts || contracts.length === 0) {
      return res.status(404).send({ error: 'Nenhum contrato encontrado para este perfil' });
    }

    res.status(200).json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao recuperar os contratos', detalhes: error.message });
  }
});

app.post('/profiles/:id/deposit', async (req, res) => {
  const { id } = req.params;
  const { depositValue } = req.body;

  if (!depositValue || depositValue <= 0) {
    return res.status(400).send({ error: 'O valor do depósito deve ser um número positivo' });
  }

  try {
    const profile = await Profile.findByPk(id);
    if (!profile) {
      return res.status(404).send({ error: 'Perfil não encontrado' });
    }

    profile.balance += depositValue;
    await profile.save();

    const deposit = await Deposit.create({
      clientId: id,
      depositValue,
      operationDate: new Date(),
    });

    res.status(201).json({
      message: 'Depósito realizado com sucesso',
      deposit,
      updatedProfile: profile,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar o depósito', detalhes: error.message });
  }
});

app.get('/contracts/:id/jobs/unpaid', async (req, res) => {
  const { id } = req.params;

  try {
    const unpaidJobs = await Job.findAll({
      where: { contractId: id, paid: false },
    });

    if (!unpaidJobs || unpaidJobs.length === 0) {
      return res.status(404).send({ error: 'Nenhum trabalho não pago encontrado para este contrato' });
    }

    res.status(200).json(unpaidJobs);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao recuperar os trabalhos não pagos', detalhes: error.message });
  }
});

app.listen(3000, async () => {
  try {
    await sequelize.sync();
    console.log('Servidor rodando na porta 3000');
  } catch (error) {
    console.error('Erro de conexão com o banco de dados:', error.message);
  }
});
