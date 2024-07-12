// const { PrismaClient } = require("@prisma/client")

// const database = new PrismaClient();

// async function main() {
//     try {
//         await database.category.createMany(
//             {data : [
//                 { name : "Computer Science" },
//                 { name : "Photography" },
//                 { name : "Fitness" },
//                 { name : "Engineering" },
//                 { name : "Accounting" },
//                 { name : "Business" },
//                 { name : "Marketing" },
//                 { name : "Filming" },
//                 { name : "Music" },
//             ]}

//         )
//         console.log("Success")
//     } catch (error) {
//         console.log("Error seeding the categories", error)
//     } finally {
//         await database.$disconnect();
//     }
// }

// main()

const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient();

async function main() {
    try {
        await database.institutionType.createMany(
            {data : [
                { name : "University" },
                { name : "College" },
                { name : "Technical Institute" },
                { name : "Vocational School" },
                { name : "High School" },
                { name : "Online Learning Platform" },
                { name : "Corporate Training Center" },
                { name : "Community College" },
                { name : "Trade School" },
                { name : "Language School" },
                { name : "Art School" },
                { name : "Culinary School" },
                { name : "Music Conservatory" },
                { name : "Business School" },
                { name : "Law School" },
                { name : "Medical School" },
                { name : "Nursing School" },
                { name : "Military Academy" },
                { name : "Special Education Center" },
                { name : "Adult Education Center" },
            ]}
        )
        console.log("Success: Institution types seeded")
    } catch (error) {
        console.log("Error seeding the institution types", error)
    } finally {
        await database.$disconnect();
    }
}

main()