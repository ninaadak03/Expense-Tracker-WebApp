import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [name,setName] = useState('');
  const [datetime,setDatetime] = useState('');
  const [description,setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL+'/api/transactions';
    const response = await fetch(url);
    return await response.json();
  }
  
  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL+'/api/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method:'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({
        name:name.substring(price.length+1),
        description,
        price,
        datetime,
      })
    }).then(response => {
      response.json().then(json => {
        setTransactions([...transactions, json]);
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result',json);
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  return (
    <main>
      <h1>Rs. {balance}</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" 
          value={name}
          onChange={ev => setName(ev.target.value)}
          placeholder={'Enter "+/- amount name"'}/>
          <input value={datetime}
          onChange={ev => setDatetime(ev.target.value)}
          type="date"/>
        </div>
        <div className="description">
          <input type="text" value={description}
          onChange={ev => setDescription(ev.target.value)}
          placeholder={'Enter Description'}/>
        </div>
        <div className="button-wrapper">
    <button type="submit">Add New Transaction</button>
  </div>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            {console.log(transaction.price)}
            <div className={"price " +(transaction.price<0?'red':'gre')}>
              {transaction.price}
            </div>
            <div className="datetime">
              {new Date(transaction.datetime).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
        ))}
        
      </div>
    </main>
  );
}

export default App;
