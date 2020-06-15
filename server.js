const path = require('path'); // Dẫn đến thư mục font-end
const express = require('express');
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public'))); // Dẫn đến thư mục font-end

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});