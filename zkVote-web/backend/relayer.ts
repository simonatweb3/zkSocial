import { ethers } from "ethers";
import voteJson from "../constants/abi/Vote.json"
import { default as express } from 'express'

const VOTE_CONTRACT_ADDR = "0xbFF54DEA53D243E35389e3f2C7F9c148b0113104"
const RPC_URL="https://opt-goerli.g.alchemy.com/v2/FR5hJ_14k0N8hhJqnVNM803ymNsq5pOA"
const PROVIDER = new ethers.providers.JsonRpcProvider(RPC_URL)
const PRIV_KEY = `577041c7c4797fb059e2f0a5228a5cafdeca7241c0d675e2d41dfc3249d3e6b1` // 0x70997970c51812dc3a010c7d01b50e0d17dc79c8
const signer = new ethers.Wallet(PRIV_KEY, PROVIDER)
console.log("signer.address : ", signer.address)
const voteContract = new ethers.Contract(VOTE_CONTRACT_ADDR, voteJson.abi, signer)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.send('Manta-voting backend!!!')
})

app.post('/vote', async function (req, res) {
  const params = req.body

  const externalNullifier = ethers.BigNumber.from(params.externalNullifier.hex)
  let tx = await (await voteContract.votePollInGroup(
    params.rc, params.group_id, params.solidityGroupProof,
    params.poll_id, params.msg,
    params.nullifierHash,
    externalNullifier.toBigInt(),
    params.soliditySignalProof,
    {gasLimit : 10000000})).wait()

  var response = {
    txhash : tx.transactionHash
  }
  res.end(JSON.stringify(response));
})



app.listen(3030)
