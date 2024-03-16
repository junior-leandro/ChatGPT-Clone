import { useState } from 'react';
import './styles/reset.css';
import './styles/App.css';

import { makeRequest } from './api/api';
import { SideMenu } from './components/SiteMenu/SideMenu';
import { ChatMessage } from './components/ChatMessage/ChatMessage'
import Typical from 'react-typical';

function App() {

  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "Como posso te ajudar hoje?"
  }])


  async function handleSubmit(e) {
    e.preventDefault();

    let response = await makeRequest({ prompt: input })

    response = response.data.split('\n').map(line => /*<p>{line}</p>*/ <Typical steps={[line, 900]} wrapper="p" className={"return"} />)


    // Isso não faz parte

    let Letra = await makeRequest({ prompt: input })

    Letra = Letra.data.split(' ');
    Letra.forEach((letra, i) => {
      setTimeout(function () {
        Letra += letra;
      }, 75 * i)
    });
    console.log(Letra);

    // fim do que não faz nada


    setChatLog([...chatLog, {
      user: 'me',
      message: `${input}`
    },
    {
      user: 'gpt',
      message: response

    }])

    setInput("")

  }

  return (
    <div className="App">
      <SideMenu />

      <section className='chatbox'>

        <div className='chat-log'>
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className='chat-input-holder'>
          <form onSubmit={handleSubmit}>
            <input
              rows='1'
              className='chat-input-textarea'
              value={input}
              onChange={e => setInput(e.target.value)}
            >
            </input>


          </form>

        </div>
      </section>
    </div>
  );
}

export default App;
