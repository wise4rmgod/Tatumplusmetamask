const nftData = {
    "name": "Test Token",
    "chain": "ETH",
    "symbol": "TTC",
    "signatureId": "b7ad58f7-d826-4db5-8a52-4f492935a7b4"
  }
  document.querySelector('.enableEthereumButton').addEventListener('click', async () => {
  
    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
  
    try {
      const response = await fetch('https://api-eu1.tatum.io/v3/nft/deploy/', {
        method: 'POST',
        body: nftData
      }, {
        headers: {
          'x-api-key': '8340ae80-4d1c-4b2a-bb84-bdbaf69d3940'
        }
      });
  
      const {
        signatureId
      } = response.data;
  
      const {
        data
      } = await fetch('https://api-eu1.tatum.io/v3/kms/' + signatureId, {
        headers: {
          'x-api-key': '8340ae80-4d1c-4b2a-bb84-bdbaf69d3940'
        }
      });
  
      const txConfig = JSON.parse(data.serializedTransaction);
      txConfig.from = accounts[0];
      txConfig.gasPrice = txConfig.gasPrice ? parseInt(txConfig.gasPrice).toString(16) : undefined;
      console.log(txConfig);
      console.log(await ethereum.request({
        method: 'eth_sendTransaction',
        params: [txConfig],
      }));
    } catch (e) {
      console.error(e)
    }
  });