const app = require('./app');
require('dotenv').config();


const PORT = process.env.PORT || 3334;


//iniciando a aplicação no backend (servidor)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));