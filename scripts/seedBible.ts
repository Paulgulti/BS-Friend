import { importBible } from "@/utils/importTheWholebible";

importBible()
    .then(() => {
        console.log('seeding finished');
        process.exit(0);
    })
    .catch((err) => {
        console.error('error during seeding');
        process.exit(1)
    })