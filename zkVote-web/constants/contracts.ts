import Vote from './abi/Vote.json'

export const contracts = {
    optimismGoerli: {
        voteContract: {
            address: '0xbFF54DEA53D243E35389e3f2C7F9c148b0113104',
            abi: Vote.abi,
        }
    },
    consensysZKM: {
        voteContract: {
            address: '0xA610bE3F3220C932D7215dA9C16f1105F1b278C2',
            abi: Vote.abi,
        }
    },
}