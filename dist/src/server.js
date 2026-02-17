import app from "./app.js";
import { prisma } from "./lib/prisma.js";
const PORT = process.env.PORT || 3000;
function main() {
    try {
        // Main application logic here
        prisma.$connect();
        console.log("Database connected successfully.");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("An error occurred:", error);
        prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map