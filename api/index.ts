import express from 'express'
import cors from 'cors'

import 'dotenv/config'

import routesStreamers from './routes/streamer'
import routesPatrocinadores from './routes/patrocinador'
import routesLogin from './routes/login'
import routesPropostas from './routes/proposta'
import routesDashboard from './routes/dashboard'
import routesAdmins from './routes/admin'
import routesAdminLogin from './routes/adminLogin'
import routesPlataformas from './routes/plataforma'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/streamer", routesStreamers)
app.use("/plataformas", routesPlataformas)
app.use("/proposta", routesPropostas)
app.use("/patrocinador", routesPatrocinadores)
app.use("/patrocinador/login", routesLogin)
app.use("/dashboard", routesDashboard)
app.use("/admins/login", routesAdminLogin)
app.use("/admins", routesAdmins)

app.get('/', (req, res) => {
  res.send('API: Streamer & Propostas')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})