import fastify from "fastify";
import cors from '@fastify/cors';
import { prisma } from "./lib/prisma";
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: 'http://localhost:3000',
});

app.register(createTrip);
app.register(confirmTrip);

app.get('/cadastrar', async () => {
  await prisma.trip.create({
    data: {
      destination: 'Fortaleza',
      starts_at: new Date(),
      ends_at: new Date(),
    },
  });

  return 'Registro cadastrado com sucesso';
});

app.get('/listar', async () => {
  const trips = await prisma.trip.findMany();
  return trips;
});

app.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
