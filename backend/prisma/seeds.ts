import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  
  await prisma.usuario.createMany({
    data: [
      { 
        id: "597fafd5-f7ba-4376-97a4-a798b050d0e8",
        nome: "Antonio",
        email: "antonio@gmail.com",
        senha: "$2a$10$XL8K2nzSxCj6mCNwke0JFuwGTFeHwizD/.6Ygu/5HqSYZ0wJs/Scq"
      },
      { 
        id: "b58fa366-8266-471c-99c8-8e5060c73879",
        nome: "Adriano",
        email: "adrianosan23@gmail.com",
        senha: "$2a$10$c/HMuJ7x5AiefNoLtStGyuKtLoeWZ/bI8qK2.jOuUoN9dWA/lu86G",
      },
      { 
        id: "bb573fe6-9fd3-467d-acad-291bb7b8bc05",
        nome: "Caio",
        email: "caio@gmail.com",
        senha: "$2a$10$doQ0cZJ69ij3hUXl5SpqievsGl3mR4vVuD9t0HLmVQcDWfHFCkee2",
      },
    ],
    skipDuplicates: true,
  });
  
  await prisma.categoriaDispositivo.createMany({
    data: [
      { id: 1, categoria: "Iluminação" },
      { id: 2, categoria: "Climatização" },
      { id: 3, categoria: "Escritório" },
      { id: 4, categoria: "Jardinagem" },
      { id: 5, categoria: "Entretenimento" },
      { id: 6, categoria: "Engenharia Elétrica" },
    ],
    skipDuplicates: true,
  });

  await prisma.dispositivo.createMany({
    data: [
      { id: 1, dispositivo: "Lâmpada", categoriaDispositivoId: 1 },
      { id: 2, dispositivo: "Lâmpada Led", categoriaDispositivoId: 1 },
      { id: 3, dispositivo: "Painel", categoriaDispositivoId: 1 },
      { id: 4, dispositivo: "Ar-Condicionado", categoriaDispositivoId: 2 },
      { id: 5, dispositivo: "Ventilador", categoriaDispositivoId: 2 },
      { id: 6, dispositivo: "Ventilador de Teto", categoriaDispositivoId: 2 },
      { id: 7, dispositivo: "Impressora", categoriaDispositivoId: 3 },
      { id: 8, dispositivo: "Impressora 3D", categoriaDispositivoId: 3 },
      { id: 9, dispositivo: "Irrigador", categoriaDispositivoId: 4 },
      { id: 10, dispositivo: "Válvula de Água", categoriaDispositivoId: 4 },      
      { id: 11, dispositivo: "Televisão", categoriaDispositivoId: 5 },
      { id: 12, dispositivo: "Caixa de Som", categoriaDispositivoId: 5 },
      { id: 13, dispositivo: "Disjuntor", categoriaDispositivoId: 6 },
      { id: 14, dispositivo: "Tomada", categoriaDispositivoId: 6 },
    ],
    skipDuplicates: true,
  });

  await prisma.tipoComodo.createMany({
    data: [
      { id: 1, tipo: "Sala" },
      { id: 2, tipo: "Cozinha" },
      { id: 3, tipo: "Quarto" },
      { id: 4, tipo: "Banheiro" },
      { id: 5, tipo: "Escritório" },
      { id: 6, tipo: "Garagem" },      
      { id: 7, tipo: "Quintal" },
      { id: 8, tipo: "Lavanderia" },
      { id: 9, tipo: "Área Externa" },
    ],
    skipDuplicates: true,
  });
  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  
