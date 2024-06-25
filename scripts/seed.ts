const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany(
            {data : [
                { name : "Computer Science" },
                { name : "Photography" },
                { name : "Fitness" },
                { name : "Engineering" },
                { name : "Accounting" },
                { name : "Business" },
                { name : "Marketing" },
                { name : "Filming" },
                { name : "Music" },
            ]}

        )
        console.log("Success")
    } catch (error) {
        console.log("Error seeding the categories", error)
    } finally {
        await database.$disconnect();
    }
}

main()